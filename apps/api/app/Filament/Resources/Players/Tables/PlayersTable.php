<?php

namespace App\Filament\Resources\Players\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PlayersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('slug')
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('alias')
                    ->searchable(),
                TextColumn::make('photo')
                    ->searchable(),
                TextColumn::make('photo_alt')
                    ->searchable(),
                TextColumn::make('position')
                    ->searchable(),
                TextColumn::make('role')
                    ->searchable(),
                TextColumn::make('team.name')
                    ->searchable(),
                TextColumn::make('number')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('height')
                    ->searchable(),
                TextColumn::make('preferred_foot')
                    ->searchable(),
                TextColumn::make('school')
                    ->searchable(),
                TextColumn::make('nationality')
                    ->searchable(),
                TextColumn::make('age_group')
                    ->searchable(),
                TextColumn::make('status')
                    ->searchable(),
                IconColumn::make('is_published')
                    ->boolean(),
                TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
