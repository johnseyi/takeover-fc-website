<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['fixture_id', 'minute', 'type', 'player', 'detail', 'team'])]
class FixtureEvent extends Model
{
    public function fixture(): BelongsTo
    {
        return $this->belongsTo(Fixture::class);
    }
}
