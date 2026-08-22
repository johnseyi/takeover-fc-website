<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Editorial and media: articles, partners, gallery albums, photos and videos
 * (§§18–19, 31–32, 38, 42–43, and the ARTICLE/PARTNER entities in §52).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category'); // Club News|Match Reports|Player Stories|...
            $table->string('author')->default('Takeover FC');
            $table->date('published_at');
            $table->text('excerpt');
            $table->string('featured_image')->nullable();
            $table->string('featured_image_alt')->nullable();
            $table->json('body')->nullable();  // paragraphs; "## " prefix = subheading
            $table->json('tags')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->index(['is_published', 'published_at']);
            $table->index('category');
        });

        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('logo')->nullable();
            $table->text('description')->nullable();
            $table->string('website')->nullable();
            $table->string('partnership_type')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_albums', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('cover')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_album_id')->constrained()->cascadeOnDelete();
            $table->string('src');
            $table->string('alt');
            $table->string('caption')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['gallery_album_id', 'sort_order']);
        });

        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('youtube_id')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('duration')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        /**
         * Site settings — contact channels, social links and the club statistics
         * shown on the homepage. Stored as key/value so the club can edit them
         * without a developer (§51) and without a schema change.
         */
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->string('group')->default('general');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('videos');
        Schema::dropIfExists('gallery_photos');
        Schema::dropIfExists('gallery_albums');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('articles');
    }
};
