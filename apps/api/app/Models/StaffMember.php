<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['slug', 'name', 'position', 'department', 'photo', 'bio',
    'responsibilities', 'is_published', 'sort_order'])]
class StaffMember extends Model
{
    protected function casts(): array
    {
        return [
            'responsibilities' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
