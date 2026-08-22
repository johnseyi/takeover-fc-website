<?php

use App\Http\Controllers\Api\ContentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public content API
|--------------------------------------------------------------------------
|
| Read-only endpoints consumed by the Next.js frontend on Vercel. The site
| fetches these at build time and on revalidation rather than per visitor, so
| they are unauthenticated and safe to cache. Only published records are
| returned — see ContentController.
|
| Writes happen exclusively through the Filament admin panel at /admin.
|
*/

Route::prefix('v1')->group(function () {
    Route::get('health', [ContentController::class, 'health']);

    Route::get('teams', [ContentController::class, 'teams']);

    Route::get('players', [ContentController::class, 'players']);
    Route::get('players/{slug}', [ContentController::class, 'player']);

    Route::get('staff', [ContentController::class, 'staff']);

    Route::get('fixtures', [ContentController::class, 'fixtures']);
    Route::get('fixtures/{slug}', [ContentController::class, 'fixture']);

    Route::get('articles', [ContentController::class, 'articles']);
    Route::get('articles/{slug}', [ContentController::class, 'article']);

    Route::get('partners', [ContentController::class, 'partners']);
    Route::get('albums', [ContentController::class, 'albums']);
    Route::get('videos', [ContentController::class, 'videos']);
    Route::get('settings', [ContentController::class, 'settings']);
});
