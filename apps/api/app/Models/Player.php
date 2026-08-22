<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['slug', 'name', 'alias', 'photo', 'photo_alt', 'position', 'role',
    'team_id', 'number', 'height', 'preferred_foot', 'school', 'nationality',
    'age_group', 'status', 'bio', 'journey', 'achievements', 'stats', 'quote',
    'gallery', 'is_published', 'sort_order'])]
class Player extends Model
{
    protected function casts(): array
    {
        return [
            'bio' => 'array',
            'journey' => 'array',
            'achievements' => 'array',
            'stats' => 'array',
            'quote' => 'array',
            'gallery' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
