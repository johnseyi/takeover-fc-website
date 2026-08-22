<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\FixtureResource;
use App\Http\Resources\GalleryAlbumResource;
use App\Http\Resources\PartnerResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\StaffMemberResource;
use App\Http\Resources\TeamResource;
use App\Http\Resources\VideoResource;
use App\Models\Article;
use App\Models\Fixture;
use App\Models\GalleryAlbum;
use App\Models\Partner;
use App\Models\Player;
use App\Models\Setting;
use App\Models\StaffMember;
use App\Models\Team;
use App\Models\Video;
use Illuminate\Http\JsonResponse;

/**
 * The public read-only content API consumed by the Next.js frontend.
 *
 * Everything here is unauthenticated and cacheable: the site fetches it at
 * build time and on revalidation, never per visitor. Only published records are
 * ever returned, so a draft is genuinely invisible.
 */
class ContentController extends Controller
{
    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'service' => 'takeover-fc-api',
            'time' => now()->toIso8601String(),
        ]);
    }

    public function teams(): JsonResponse
    {
        return response()->json(
            TeamResource::collection(Team::orderBy('sort_order')->get()),
        );
    }

    public function players(): JsonResponse
    {
        $players = Player::published()
            ->with('team')
            ->orderBy('sort_order')
            ->orderBy('number')
            ->orderBy('name')
            ->get();

        return response()->json(PlayerResource::collection($players));
    }

    public function player(string $slug): JsonResponse
    {
        $player = Player::published()->with('team')->where('slug', $slug)->firstOrFail();

        return response()->json(new PlayerResource($player));
    }

    public function staff(): JsonResponse
    {
        $staff = StaffMember::published()->orderBy('sort_order')->orderBy('name')->get();

        return response()->json(StaffMemberResource::collection($staff));
    }

    public function fixtures(): JsonResponse
    {
        $fixtures = Fixture::published()
            ->with(['team', 'events'])
            ->orderBy('kickoff')
            ->get();

        return response()->json(FixtureResource::collection($fixtures));
    }

    public function fixture(string $slug): JsonResponse
    {
        $fixture = Fixture::published()
            ->with(['team', 'events'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(new FixtureResource($fixture));
    }

    public function articles(): JsonResponse
    {
        $articles = Article::published()->orderByDesc('published_at')->get();

        return response()->json(ArticleResource::collection($articles));
    }

    public function article(string $slug): JsonResponse
    {
        $article = Article::published()->where('slug', $slug)->firstOrFail();

        return response()->json(new ArticleResource($article));
    }

    public function partners(): JsonResponse
    {
        $partners = Partner::published()->orderBy('sort_order')->get();

        return response()->json(PartnerResource::collection($partners));
    }

    public function albums(): JsonResponse
    {
        $albums = GalleryAlbum::published()
            ->with('photos')
            ->orderBy('sort_order')
            ->get();

        return response()->json(GalleryAlbumResource::collection($albums));
    }

    public function videos(): JsonResponse
    {
        $videos = Video::published()->orderBy('sort_order')->get();

        return response()->json(VideoResource::collection($videos));
    }

    public function settings(): JsonResponse
    {
        return response()->json(Setting::values());
    }
}
