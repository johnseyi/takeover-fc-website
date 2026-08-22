<?php

namespace App\Http\Resources;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffMemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'position' => $this->position,
            'department' => $this->department,
            'photo' => Media::url($this->photo),
            'bio' => $this->bio,
            'responsibilities' => $this->responsibilities ?? [],
        ];
    }
}
