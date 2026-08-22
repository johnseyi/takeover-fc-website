<?php

namespace App\Observers;

use App\Support\FrontendRevalidator;
use Illuminate\Database\Eloquent\Model;

/**
 * Fires a frontend revalidation whenever published content changes.
 *
 * Attached in AppServiceProvider to every model the website reads.
 */
class RevalidateObserver
{
    /** Model class => the Next.js cache tag its pages are built with. */
    private const TAGS = [
        \App\Models\Player::class => 'players',
        \App\Models\Team::class => 'teams',
        \App\Models\Fixture::class => 'fixtures',
        \App\Models\FixtureEvent::class => 'fixtures',
        \App\Models\Article::class => 'articles',
        \App\Models\StaffMember::class => 'staff',
        \App\Models\Partner::class => 'partners',
        \App\Models\GalleryAlbum::class => 'albums',
        \App\Models\GalleryPhoto::class => 'albums',
        \App\Models\Video::class => 'videos',
        \App\Models\Setting::class => 'settings',
    ];

    public function saved(Model $model): void
    {
        $this->revalidate($model);
    }

    public function deleted(Model $model): void
    {
        $this->revalidate($model);
    }

    private function revalidate(Model $model): void
    {
        $tag = self::TAGS[$model::class] ?? null;

        if ($tag !== null) {
            FrontendRevalidator::tag($tag);
        }
    }

    /** @return array<int, class-string<Model>> */
    public static function observedModels(): array
    {
        return array_keys(self::TAGS);
    }
}
