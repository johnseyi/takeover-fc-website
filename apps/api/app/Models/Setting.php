<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * Key/value site settings — contact channels, social links and the homepage
 * club statistics. Kept out of the schema so the club can edit them without a
 * developer (§51) and without a migration.
 */
#[Fillable(['key', 'value', 'group'])]
class Setting extends Model
{
    protected function casts(): array
    {
        return ['value' => 'array'];
    }

    protected static function booted(): void
    {
        // Settings are read on nearly every API response, so they are cached
        // and the cache is dropped whenever one changes.
        static::saved(fn () => Cache::forget('settings.all'));
        static::deleted(fn () => Cache::forget('settings.all'));
    }

    /**
     * Every setting as a key => value map.
     *
     * Deliberately not named all() — overriding Eloquent's static all() would
     * change a signature the framework and Filament both rely on.
     *
     * @return array<string, mixed>
     */
    public static function values(): array
    {
        return Cache::rememberForever(
            'settings.all',
            fn () => static::query()->pluck('value', 'key')->toArray(),
        );
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return static::values()[$key] ?? $default;
    }

    public static function put(string $key, mixed $value, string $group = 'general'): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value, 'group' => $group]);
    }
}
