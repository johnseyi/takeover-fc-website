<?php

namespace App\Support;

/**
 * Resolves a stored media reference to a URL the website can load.
 *
 * Two kinds of reference exist side by side:
 *
 *   "/images/squad-lineup-community.jpg"  — photography that ships with the
 *      frontend repo and is served by Vercel. Returned untouched.
 *   "players/kenneth.jpg"                 — uploaded through the admin panel
 *      into Laravel's public disk. Resolved to the backend's storage URL.
 *
 * Keeping both means the site's existing photography keeps working while the
 * club starts uploading its own.
 */
class Media
{
    public static function url(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        // Already absolute, or a frontend-served path.
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/')) {
            return $path;
        }

        return asset("storage/{$path}");
    }

    /** @param array<int, string>|null $paths */
    public static function urls(?array $paths): array
    {
        return collect($paths ?? [])
            ->map(fn (string $path) => self::url($path))
            ->filter()
            ->values()
            ->all();
    }
}
