<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Club structure: teams, players and staff.
 *
 * Columns mirror the entity spec in §52 of the Official Website Master Plan and
 * the TypeScript types the Next.js frontend already consumes, so the JSON API
 * can return the exact shapes the site expects.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('short_name');
            $table->string('age_group');
            $table->string('status')->default('active'); // active | planned
            $table->text('summary')->nullable();
            $table->json('description')->nullable();      // array of paragraphs
            $table->string('image')->nullable();
            $table->string('image_alt')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });

        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('alias')->nullable();
            $table->string('photo')->nullable();
            $table->string('photo_alt')->nullable();
            $table->string('position');                   // Goalkeeper|Defender|Midfielder|Forward
            $table->string('role')->nullable();
            $table->foreignId('team_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedSmallInteger('number')->nullable();
            $table->string('height')->nullable();
            $table->string('preferred_foot')->nullable();
            $table->string('school')->nullable();
            $table->string('nationality')->default('Ugandan');
            $table->string('age_group')->nullable();
            $table->string('status')->default('active');  // active|academy|injured|graduate
            $table->json('bio')->nullable();
            $table->json('journey')->nullable();
            $table->json('achievements')->nullable();
            $table->json('stats')->nullable();
            $table->json('quote')->nullable();
            $table->json('gallery')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'team_id']);
            $table->index('position');
        });

        Schema::create('staff_members', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('position');
            $table->string('department'); // Leadership|Technical|Administration|Medical|Support
            $table->string('photo')->nullable();
            $table->text('bio')->nullable();
            $table->json('responsibilities')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'department']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff_members');
        Schema::dropIfExists('players');
        Schema::dropIfExists('teams');
    }
};
