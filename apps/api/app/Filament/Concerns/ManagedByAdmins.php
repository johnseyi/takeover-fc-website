<?php

namespace App\Filament\Concerns;

/** Administrators only — user accounts and anything security-sensitive. */
trait ManagedByAdmins
{
    use ChecksClubRole;

    public static function canViewAny(): bool
    {
        return static::userMayManage();
    }

    protected static function userMayManage(): bool
    {
        return static::currentUser()?->isAdmin() ?? false;
    }
}
