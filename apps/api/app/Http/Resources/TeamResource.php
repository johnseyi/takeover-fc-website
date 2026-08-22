<?php

namespace App\Http\Resources;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->slug,
            'name' => $this->name,
            'shortName' => $this->short_name,
            'ageGroup' => $this->age_group,
            'status' => $this->status,
            'summary' => $this->summary,
            'description' => $this->description ?? [],
            'image' => Media::url($this->image),
            'imageAlt' => $this->image_alt,
        ];
    }
}
