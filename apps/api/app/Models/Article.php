<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['slug', 'title', 'category', 'author', 'published_at', 'excerpt',
    'featured_image', 'featured_image_alt', 'body', 'tags', 'featured',
    'is_published'])]
class Article extends Model
{
    protected function casts(): array
    {
        return [
            'published_at' => 'date',
            'body' => 'array',
            'tags' => 'array',
            'featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereDate('published_at', '<=', now());
    }

    /** Reading time in minutes, shown on article pages (§32). */
    public function readingTime(): int
    {
        $words = str_word_count(implode(' ', $this->body ?? []));

        return max(1, (int) round($words / 200));
    }
}
