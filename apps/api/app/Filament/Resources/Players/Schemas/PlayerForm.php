<?php

namespace App\Filament\Resources\Players\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PlayerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('alias'),
                TextInput::make('photo'),
                TextInput::make('photo_alt'),
                TextInput::make('position')
                    ->required(),
                TextInput::make('role'),
                Select::make('team_id')
                    ->relationship('team', 'name'),
                TextInput::make('number')
                    ->numeric(),
                TextInput::make('height'),
                TextInput::make('preferred_foot'),
                TextInput::make('school'),
                TextInput::make('nationality')
                    ->required()
                    ->default('Ugandan'),
                TextInput::make('age_group'),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                Textarea::make('bio')
                    ->columnSpanFull(),
                Textarea::make('journey')
                    ->columnSpanFull(),
                Textarea::make('achievements')
                    ->columnSpanFull(),
                Textarea::make('stats')
                    ->columnSpanFull(),
                Textarea::make('quote')
                    ->columnSpanFull(),
                Textarea::make('gallery')
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
