<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Football: fixtures, results and match events (§29–30, §52 MATCH).
 *
 * The entity is called "Fixture" rather than "Match" because `match` is a
 * reserved keyword in PHP 8 and cannot be used as a class name.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fixtures', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('opponent');
            $table->boolean('home')->default(true);
            $table->dateTime('kickoff');
            $table->string('venue');
            $table->string('competition');
            $table->string('status')->default('scheduled'); // scheduled|live|played|postponed
            $table->unsignedSmallInteger('score_takeover')->nullable();
            $table->unsignedSmallInteger('score_opponent')->nullable();
            $table->string('player_of_the_match')->nullable();
            $table->json('lineup')->nullable();
            $table->json('substitutes')->nullable();
            $table->json('statistics')->nullable();
            $table->json('report')->nullable();
            $table->json('photos')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            // Drives the fixtures/results tabs and the "next match" lookup.
            $table->index(['is_published', 'status', 'kickoff']);
        });

        Schema::create('fixture_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fixture_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('minute');
            $table->string('type');   // goal|assist|yellow|red|substitution
            $table->string('player');
            $table->string('detail')->nullable();
            $table->string('team')->default('takeover'); // takeover|opponent
            $table->timestamps();

            $table->index(['fixture_id', 'minute']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fixture_events');
        Schema::dropIfExists('fixtures');
    }
};
