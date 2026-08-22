<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['slug', 'name', 'short_name', 'age_group', 'status', 'summary',
    'description', 'image', 'image_alt', 'sort_order'])]
class Team extends Model
{
    protected function casts(): array
    {
        return ['description' => 'array'];
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class)->orderBy('sort_order')->orderBy('number');
    }

    public function fixtures(): HasMany
    {
        return $this->hasMany(Fixture::class);
    }
}
