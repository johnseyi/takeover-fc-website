<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Role-based access for the admin panel (§65).
 *
 * "The admin system should not give every team member full access." Roles are a
 * single column rather than a permissions package: the club has a handful of
 * staff and four clear job shapes, so anything heavier would be overhead the
 * club has to maintain.
 *
 *   admin   — full access, including user management and settings
 *   editor  — all content: players, fixtures, news, media, partners
 *   media   — news, gallery and videos only
 *   viewer  — read-only
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('viewer')->after('email');
            $table->boolean('is_active')->default(true)->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_active']);
        });
    }
};
