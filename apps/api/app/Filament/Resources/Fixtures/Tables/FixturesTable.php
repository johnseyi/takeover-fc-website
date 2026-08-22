<?php

namespace App\Filament\Resources\Fixtures\Tables;

use App\Models\Fixture;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class FixturesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('kickoff', 'desc')
            ->columns([
                TextColumn::make('kickoff')
                    ->label('Date')
                    ->dateTime('D j M Y, H:i')
                    ->timezone('Africa/Kampala')
                    ->sortable(),

                TextColumn::make('opponent')
                    ->label('Match')
                    ->searchable()
                    ->weight('bold')
                    ->formatStateUsing(fn (Fixture $record): string => $record->home
                        ? "Takeover FC v {$record->opponent}"
                        : "{$record->opponent} v Takeover FC"),

                TextColumn::make('score')
                    ->label('Score')
                    ->state(fn (Fixture $record): string => $record->status === 'played'
                        ? "{$record->score_takeover}–{$record->score_opponent}"
                        : '—')
                    ->badge()
                    ->color(fn (Fixture $record): string => match ($record->resultLetter()) {
                        'W' => 'success',
                        'L' => 'danger',
                        'D' => 'gray',
                        default => 'gray',
                    }),

                TextColumn::make('team.short_name')
                    ->label('Squad')
                    ->badge()
                    ->sortable(),

                TextColumn::make('competition')
                    ->searchable()
                    ->toggleable()
                    ->limit(28),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'played' => 'success',
                        'live' => 'warning',
                        'postponed' => 'danger',
                        default => 'info',
                    })
                    ->sortable(),

                IconColumn::make('is_published')
                    ->label('Live')
                    ->boolean()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'scheduled' => 'Scheduled',
                        'live' => 'Live',
                        'played' => 'Played',
                        'postponed' => 'Postponed',
                    ]),

                SelectFilter::make('team')
                    ->relationship('team', 'name')
                    ->label('Squad'),

                TernaryFilter::make('is_published')
                    ->label('Visible on site'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('No matches yet')
            ->emptyStateDescription('Add a fixture and it appears on the website immediately.');
    }
}
