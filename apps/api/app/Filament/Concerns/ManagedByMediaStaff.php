<?php

namespace App\Filament\Concerns;

/** Editable by administrators, editors and media staff. */
trait ManagedByMediaStaff
{
    use ChecksClubRole;

    protected static function userMayManage(): bool
    {
        return static::currentUser()?->canManageMedia() ?? false;
    }
}
