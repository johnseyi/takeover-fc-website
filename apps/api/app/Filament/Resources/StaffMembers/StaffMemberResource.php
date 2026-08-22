<?php

namespace App\Filament\Resources\StaffMembers;

use App\Filament\Resources\StaffMembers\Pages\CreateStaffMember;
use App\Filament\Resources\StaffMembers\Pages\EditStaffMember;
use App\Filament\Resources\StaffMembers\Pages\ListStaffMembers;
use App\Filament\Resources\StaffMembers\Schemas\StaffMemberForm;
use App\Filament\Resources\StaffMembers\Tables\StaffMembersTable;
use App\Models\StaffMember;
use BackedEnum;
use App\Filament\Concerns\ManagedByContentStaff;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class StaffMemberResource extends Resource
{
    use ManagedByContentStaff;

    protected static ?string $model = StaffMember::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedIdentification;

    protected static string|\UnitEnum|null $navigationGroup = 'The Club';
    protected static ?int $navigationSort = 1;
    protected static ?string $navigationLabel = 'Leadership & Staff';
    protected static ?string $pluralModelLabel = 'Leadership & Staff';
    protected static ?string $modelLabel = 'Staff member';

    public static function form(Schema $schema): Schema
    {
        return StaffMemberForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StaffMembersTable::configure($table);
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
            'index' => ListStaffMembers::route('/'),
            'create' => CreateStaffMember::route('/create'),
            'edit' => EditStaffMember::route('/{record}/edit'),
        ];
    }
}
