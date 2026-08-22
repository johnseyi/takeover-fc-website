<?php

namespace App\Filament\Resources\StaffMembers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StaffMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('position')
                    ->required(),
                TextInput::make('department')
                    ->required(),
                TextInput::make('photo'),
                Textarea::make('bio')
                    ->columnSpanFull(),
                Textarea::make('responsibilities')
                    ->columnSpanFull(),
                Toggle::make('is_published')
                    ->required(),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
