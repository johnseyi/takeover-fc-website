<?php

namespace App\Filament\Concerns;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Shared role gate for Filament resources (§65 — "the admin system should not
 * give every team member full access").
 *
 * A resource opts in by using one of the three traits below, which each define
 * the single `userMayManage` check the rest of the methods hang off.
 */
trait ChecksClubRole
{
    public static function canViewAny(): bool
    {
        return auth()->check();
    }

    public static function canView(Model $record): bool
    {
        return auth()->check();
    }

    public static function canCreate(): bool
    {
        return static::userMayManage();
    }

    public static function canEdit(Model $record): bool
    {
        return static::userMayManage();
    }

    public static function canDelete(Model $record): bool
    {
        return static::userMayManage();
    }

    public static function canDeleteAny(): bool
    {
        return static::userMayManage();
    }

    protected static function currentUser(): ?User
    {
        $user = auth()->user();

        return $user instanceof User ? $user : null;
    }
}
