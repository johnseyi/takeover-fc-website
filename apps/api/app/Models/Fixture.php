<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * A fixture or result.
 *
 * Named Fixture rather than Match because `match` is a reserved keyword in
 * PHP 8 and cannot be used as a class name.
 */
#[Fillable(['slug', 'team_id', 'opponent', 'home', 'kickoff', 'venue',
    'competition', 'status', 'score_takeover', 'score_opponent',
    'player_of_the_match', 'lineup', 'substitutes', 'statistics', 'report',
    'photos', 'is_published'])]
class Fixture extends Model
{
    protected function casts(): array
    {
        return [
            'kickoff' => 'datetime',
            'home' => 'boolean',
            'lineup' => 'array',
            'substitutes' => 'array',
            'statistics' => 'array',
            'report' => 'array',
            'photos' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(FixtureEvent::class)->orderBy('minute');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('status', 'scheduled')
            ->where('kickoff', '>=', now())
            ->orderBy('kickoff');
    }

    public function scopePlayed(Builder $query): Builder
    {
        return $query->where('status', 'played')->orderByDesc('kickoff');
    }

    /** Result from Takeover FC's perspective: W, D, L, or null if unplayed. */
    public function resultLetter(): ?string
    {
        if ($this->status !== 'played' || $this->score_takeover === null) {
            return null;
        }

        return match (true) {
            $this->score_takeover > $this->score_opponent => 'W',
            $this->score_takeover < $this->score_opponent => 'L',
            default => 'D',
        };
    }
}
