<?php

namespace App\Http\Resources;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => $this->category,
            'description' => $this->description,
            'youtubeId' => $this->youtube_id,
            'thumbnail' => Media::url($this->thumbnail),
            'duration' => $this->duration,
        ];
    }
}
