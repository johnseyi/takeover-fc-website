<?php

namespace App\Http\Resources;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartnerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'logo' => Media::url($this->logo),
            'description' => $this->description,
            'website' => $this->website,
            'partnershipType' => $this->partnership_type,
        ];
    }
}
