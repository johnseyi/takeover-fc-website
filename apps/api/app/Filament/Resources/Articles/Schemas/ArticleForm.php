<?php

namespace App\Filament\Resources\Articles\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('title')
                    ->required(),
                TextInput::make('category')
                    ->required(),
                TextInput::make('author')
                    ->required()
                    ->default('Takeover FC'),
                DatePicker::make('published_at')
                    ->required(),
                Textarea::make('excerpt')
                    ->required()
                    ->columnSpanFull(),
                FileUpload::make('featured_image')
                    ->image(),
                FileUpload::make('featured_image_alt')
                    ->image(),
                Textarea::make('body')
                    ->columnSpanFull(),
                Textarea::make('tags')
                    ->columnSpanFull(),
                Toggle::make('featured')
                    ->required(),
                Toggle::make('is_published')
                    ->required(),
            ]);
    }
}
