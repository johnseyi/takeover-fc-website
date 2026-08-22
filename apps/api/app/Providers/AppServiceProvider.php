<?php

namespace App\Providers;

use App\Observers\RevalidateObserver;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Every content change pings the Next.js site to rebuild affected pages.
        foreach (RevalidateObserver::observedModels() as $model) {
            $model::observe(RevalidateObserver::class);
        }

        //
    }
}
