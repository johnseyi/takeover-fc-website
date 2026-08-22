<?php

namespace App\Filament\Concerns;

/** Editable by administrators and editors. Everyone signed in may look. */
trait ManagedByContentStaff
{
    use ChecksClubRole;

    protected static function userMayManage(): bool
    {
        return static::currentUser()?->canManageContent() ?? false;
    }
}
