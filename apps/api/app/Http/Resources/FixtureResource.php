<?php

namespace App\Http\Resources;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** Matches the Match interface in apps/web/src/lib/types.ts. */
class FixtureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $played = $this->status === 'played' && $this->score_takeover !== null;

        return [
            'slug' => $this->slug,
            'team' => $this->team?->slug,
            'opponent' => $this->opponent,
            'home' => (bool) $this->home,
            // ISO 8601 in East Africa Time, which is how the site formats it.
            'kickoff' => $this->kickoff?->setTimezone('Africa/Kampala')->toIso8601String(),
            'venue' => $this->venue,
            'competition' => $this->competition,
            'status' => $this->status,
            'score' => $played ? [
                'takeover' => (int) $this->score_takeover,
                'opponent' => (int) $this->score_opponent,
            ] : null,
            'events' => $this->whenLoaded('events', fn () => $this->events->map(fn ($event) => [
                'minute' => (int) $event->minute,
                'type' => $event->type,
                'player' => $event->player,
                'detail' => $event->detail,
                'team' => $event->team,
            ])->all(), []),
            'lineup' => $this->lineup ?? [],
            'substitutes' => $this->substitutes ?? [],
            'playerOfTheMatch' => $this->player_of_the_match,
            'statistics' => $this->statistics ?? [],
            'report' => $this->report ?? [],
            'photos' => Media::urls($this->photos),
        ];
    }
}
