<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Admin panel user.
 *
 * Roles implement §65's requirement that "the admin system should not give
 * every team member full access". See the roles migration for what each grants.
 */
#[Fillable(['name', 'email', 'password', 'role', 'is_active'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public const ROLE_ADMIN = 'admin';
    public const ROLE_EDITOR = 'editor';
    public const ROLE_MEDIA = 'media';
    public const ROLE_VIEWER = 'viewer';

    /** @var array<string, string> */
    public const ROLES = [
        self::ROLE_ADMIN => 'Administrator',
        self::ROLE_EDITOR => 'Editor',
        self::ROLE_MEDIA => 'Media',
        self::ROLE_VIEWER => 'Viewer',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /** Deactivated accounts keep their history but cannot sign in. */
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->is_active;
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /** Admins and editors may change any content. */
    public function canManageContent(): bool
    {
        return in_array($this->role, [self::ROLE_ADMIN, self::ROLE_EDITOR], true);
    }

    /** Media staff may additionally manage news, gallery and video. */
    public function canManageMedia(): bool
    {
        return in_array(
            $this->role,
            [self::ROLE_ADMIN, self::ROLE_EDITOR, self::ROLE_MEDIA],
            true,
        );
    }
}
