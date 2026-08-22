<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Fixture;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

/**
 * The public content API, and the revalidation webhook that keeps the
 * statically-generated frontend in step with the panel.
 */
class ContentApiTest extends TestCase
{
    use RefreshDatabase;

    private function team(string $slug = 'senior'): Team
    {
        return Team::create([
            'slug' => $slug,
            'name' => 'Senior Team',
            'short_name' => 'Senior',
            'age_group' => 'Senior',
        ]);
    }

    public function test_health_endpoint_reports_ok(): void
    {
        $this->getJson('/api/v1/health')
            ->assertOk()
            ->assertJsonPath('status', 'ok');
    }

    /** The JSON must match the TypeScript Player type the site already uses. */
    public function test_player_endpoint_returns_the_shape_the_frontend_expects(): void
    {
        $team = $this->team('under-17');

        Player::create([
            'slug' => 'kenneth-gidudu',
            'name' => 'Kenneth Gidudu',
            'position' => 'Midfielder',
            'role' => 'Captain / Under-17',
            'team_id' => $team->id,
            'nationality' => 'Ugandan',
            'age_group' => 'Under-17',
            'status' => 'active',
            'bio' => ['One.', 'Two.'],
            'achievements' => ['Captain'],
        ]);

        $this->getJson('/api/v1/players/kenneth-gidudu')
            ->assertOk()
            ->assertJson([
                'slug' => 'kenneth-gidudu',
                'name' => 'Kenneth Gidudu',
                'position' => 'Midfielder',
                'team' => 'under-17',      // slug, not a numeric id
                'ageGroup' => 'Under-17',  // camelCase, as the frontend expects
            ])
            ->assertJsonCount(2, 'bio');
    }

    public function test_unpublished_records_are_never_returned(): void
    {
        $team = $this->team();

        Player::create([
            'slug' => 'draft-player',
            'name' => 'Draft Player',
            'position' => 'Forward',
            'team_id' => $team->id,
            'nationality' => 'Ugandan',
            'status' => 'active',
            'is_published' => false,
        ]);

        $this->getJson('/api/v1/players')->assertOk()->assertJsonCount(0);
        $this->getJson('/api/v1/players/draft-player')->assertNotFound();
    }

    public function test_played_fixtures_expose_a_score_and_events(): void
    {
        $team = $this->team();

        $fixture = Fixture::create([
            'slug' => 'vs-kabalagala-fc-2026-08-08',
            'team_id' => $team->id,
            'opponent' => 'Kabalagala FC',
            'home' => true,
            'kickoff' => '2026-08-08 16:00:00',
            'venue' => 'Namuwongo Community Ground',
            'competition' => 'Kampala Community League',
            'status' => 'played',
            'score_takeover' => 3,
            'score_opponent' => 1,
        ]);

        $fixture->events()->create([
            'minute' => 18,
            'type' => 'goal',
            'player' => 'Patrick Ochieng',
            'team' => 'takeover',
        ]);

        $this->getJson('/api/v1/fixtures/vs-kabalagala-fc-2026-08-08')
            ->assertOk()
            ->assertJsonPath('score.takeover', 3)
            ->assertJsonPath('score.opponent', 1)
            ->assertJsonPath('events.0.player', 'Patrick Ochieng')
            ->assertJsonCount(1, 'events');
    }

    public function test_scheduled_fixtures_have_a_null_score(): void
    {
        $team = $this->team();

        Fixture::create([
            'slug' => 'vs-nsambya-united-2026-09-05',
            'team_id' => $team->id,
            'opponent' => 'Nsambya United',
            'home' => true,
            'kickoff' => '2026-09-05 16:00:00',
            'venue' => 'Namuwongo Community Ground',
            'competition' => 'Kampala Community League',
            'status' => 'scheduled',
        ]);

        $this->getJson('/api/v1/fixtures/vs-nsambya-united-2026-09-05')
            ->assertOk()
            ->assertJsonPath('score', null);
    }

    /**
     * Saving a result must ping the frontend, or a statically-generated site
     * would keep serving the old scoreline (§51).
     */
    public function test_saving_content_triggers_frontend_revalidation(): void
    {
        config([
            'services.frontend.revalidate_url' => 'https://takeoverfc.com/api/revalidate',
            'services.frontend.revalidate_secret' => 'test-secret',
        ]);

        Http::fake(['*' => Http::response(['revalidated' => true])]);

        Article::create([
            'slug' => 'a-new-story',
            'title' => 'A new story',
            'category' => 'Club News',
            'published_at' => '2026-08-22',
            'excerpt' => 'Something happened.',
            'body' => ['A paragraph.'],
        ]);

        Http::assertSent(function ($request) {
            return $request->url() === 'https://takeoverfc.com/api/revalidate'
                && $request['tag'] === 'articles'
                && $request->hasHeader('x-revalidate-secret', 'test-secret');
        });
    }

    /** A save must never fail because the website happened to be unreachable. */
    public function test_a_failing_revalidation_does_not_break_saving(): void
    {
        config([
            'services.frontend.revalidate_url' => 'https://takeoverfc.com/api/revalidate',
            'services.frontend.revalidate_secret' => 'test-secret',
        ]);

        Http::fake(['*' => fn () => throw new \RuntimeException('network down')]);

        $team = $this->team();

        $this->assertNotNull($team->fresh(), 'The record should still save.');
    }
}
