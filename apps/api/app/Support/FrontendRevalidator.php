<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Tells the Next.js site to rebuild the pages affected by a content change.
 *
 * The site is statically generated on Vercel, so a match result saved in the
 * panel is not visible until the affected pages are regenerated. Rather than
 * rebuilding everything, each model maps to a cache tag and only pages using
 * that tag are refreshed.
 *
 * Failures are logged and swallowed: the club saving a result must never see an
 * error because the frontend happened to be unreachable. The page will pick the
 * change up on its next scheduled revalidation regardless.
 */
class FrontendRevalidator
{
    public static function tag(string $tag): void
    {
        $url = config('services.frontend.revalidate_url');
        $secret = config('services.frontend.revalidate_secret');

        if (blank($url) || blank($secret)) {
            // Not configured yet — normal in local development.
            return;
        }

        try {
            $response = Http::timeout(5)
                ->withHeaders(['x-revalidate-secret' => $secret])
                ->post($url, ['tag' => $tag]);

            if ($response->failed()) {
                Log::warning('Frontend revalidation rejected', [
                    'tag' => $tag,
                    'status' => $response->status(),
                ]);
            }
        } catch (\Throwable $e) {
            Log::warning('Frontend revalidation failed', [
                'tag' => $tag,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
