<?php

namespace App\Http\Resources;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** Matches the Article interface in apps/web/src/lib/types.ts. */
class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => $this->category,
            'author' => $this->author,
            'date' => $this->published_at?->toDateString(),
            'excerpt' => $this->excerpt,
            'featuredImage' => Media::url($this->featured_image),
            'featuredImageAlt' => $this->featured_image_alt,
            'body' => $this->body ?? [],
            'tags' => $this->tags ?? [],
            'featured' => (bool) $this->featured,
            'readingTime' => $this->readingTime(),
        ];
    }
}
