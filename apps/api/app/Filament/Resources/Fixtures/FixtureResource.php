<?php

namespace App\Filament\Resources\Fixtures;

use App\Filament\Resources\Fixtures\Pages\CreateFixture;
use App\Filament\Resources\Fixtures\Pages\EditFixture;
use App\Filament\Resources\Fixtures\Pages\ListFixtures;
use App\Filament\Resources\Fixtures\Schemas\FixtureForm;
use App\Filament\Resources\Fixtures\Tables\FixturesTable;
use App\Models\Fixture;
use BackedEnum;
use App\Filament\Concerns\ManagedByContentStaff;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FixtureResource extends Resource
{
    use ManagedByContentStaff;

    protected static ?string $model = Fixture::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedTrophy;

    protected static string|\UnitEnum|null $navigationGroup = 'Football';
    protected static ?int $navigationSort = 1;
    protected static ?string $navigationLabel = 'Fixtures & Results';
    protected static ?string $pluralModelLabel = 'Fixtures & Results';
    protected static ?string $modelLabel = 'Match';

    public static function form(Schema $schema): Schema
    {
        return FixtureForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FixturesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListFixtures::route('/'),
            'create' => CreateFixture::route('/create'),
            'edit' => EditFixture::route('/{record}/edit'),
        ];
    }
}
