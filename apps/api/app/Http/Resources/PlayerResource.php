<?php

namespace App\Http\Resources;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Serialises a player into the exact shape the Next.js frontend already
 * consumes (see apps/web/src/lib/types.ts). Keeping the JSON identical to the
 * existing TypeScript types means the site's components need no changes.
 */
class PlayerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'alias' => $this->alias,
            'photo' => Media::url($this->photo),
            'photoAlt' => $this->photo_alt,
            'position' => $this->position,
            'role' => $this->role,
            'team' => $this->whenLoaded('team', fn () => $this->team?->slug, $this->team?->slug),
            'number' => $this->number,
            'height' => $this->height,
            'preferredFoot' => $this->preferred_foot,
            'school' => $this->school,
            'nationality' => $this->nationality,
            'ageGroup' => $this->age_group,
            'status' => $this->status,
            'bio' => $this->bio ?? [],
            'journey' => $this->journey ?? [],
            'achievements' => $this->achievements ?? [],
            'stats' => $this->stats ?? null,
            'quote' => $this->quote ?? null,
            'gallery' => Media::urls($this->gallery),
        ];
    }
}
