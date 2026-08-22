<?php

namespace App\Filament\Resources\Fixtures\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

/**
 * The match form.
 *
 * This is the screen the master plan is really about: "The club should not need
 * a developer every time someone needs to update a match result" (§51). The
 * result fields stay hidden until the match is actually marked as played, so
 * entering a fixture is a short form and entering a result is a focused one.
 */
class FixtureForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('The match')
                    ->description('Who, when and where. This is all a fixture needs.')
                    ->columns(2)
                    ->schema([
                        Select::make('team_id')
                            ->label('Our team')
                            ->relationship('team', 'name')
                            ->required()
                            ->native(false),

                        TextInput::make('opponent')
                            ->required()
                            ->maxLength(120)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, $set, Get $get) => $set(
                                'slug',
                                self::buildSlug($get('opponent'), $get('kickoff')),
                            )),

                        ToggleButtons::make('home')
                            ->label('Venue')
                            ->boolean('Home', 'Away')
                            ->inline()
                            ->default(true)
                            ->required(),

                        DateTimePicker::make('kickoff')
                            ->label('Kick-off (East Africa Time)')
                            ->seconds(false)
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, $set, Get $get) => $set(
                                'slug',
                                self::buildSlug($get('opponent'), $get('kickoff')),
                            )),

                        TextInput::make('venue')
                            ->required()
                            ->maxLength(180)
                            ->default('Namuwongo Community Ground, Kampala'),

                        TextInput::make('competition')
                            ->required()
                            ->maxLength(120)
                            ->datalist([
                                'Kampala Community League',
                                'Kampala Youth Championship',
                                'Friendly',
                            ]),

                        ToggleButtons::make('status')
                            ->options([
                                'scheduled' => 'Scheduled',
                                'live' => 'Live',
                                'played' => 'Played',
                                'postponed' => 'Postponed',
                            ])
                            ->default('scheduled')
                            ->inline()
                            ->live()
                            ->required(),

                        Toggle::make('is_published')
                            ->label('Visible on the website')
                            ->default(true),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(200)
                            ->helperText('The match page address. Generated automatically.')
                            ->columnSpanFull(),
                    ]),

                // Everything below only matters once the match has been played.
                Section::make('Result')
                    ->description('Fill this in after the final whistle.')
                    ->visible(fn (Get $get) => in_array($get('status'), ['played', 'live'], true))
                    ->columns(3)
                    ->schema([
                        TextInput::make('score_takeover')
                            ->label('Takeover FC')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(50)
                            ->required(fn (Get $get) => $get('status') === 'played'),

                        TextInput::make('score_opponent')
                            ->label(fn (Get $get) => $get('opponent') ?: 'Opponent')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(50)
                            ->required(fn (Get $get) => $get('status') === 'played'),

                        TextInput::make('player_of_the_match')
                            ->maxLength(120),
                    ]),

                Section::make('Match timeline')
                    ->description('Goals, cards and substitutions, in the order they happened.')
                    ->visible(fn (Get $get) => in_array($get('status'), ['played', 'live'], true))
                    ->collapsed()
                    ->schema([
                        Repeater::make('events')
                            ->relationship()
                            ->hiddenLabel()
                            ->columns(4)
                            ->defaultItems(0)
                            ->addActionLabel('Add an event')
                            ->orderColumn('minute')
                            ->itemLabel(fn (array $state): ?string => isset($state['minute'], $state['player'])
                                ? "{$state['minute']}' — {$state['player']}"
                                : null)
                            ->schema([
                                TextInput::make('minute')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(130)
                                    ->required(),

                                Select::make('type')
                                    ->options([
                                        'goal' => 'Goal',
                                        'assist' => 'Assist',
                                        'yellow' => 'Yellow card',
                                        'red' => 'Red card',
                                        'substitution' => 'Substitution',
                                    ])
                                    ->default('goal')
                                    ->native(false)
                                    ->required(),

                                TextInput::make('player')
                                    ->required()
                                    ->maxLength(120),

                                Select::make('team')
                                    ->options([
                                        'takeover' => 'Takeover FC',
                                        'opponent' => 'Opponent',
                                    ])
                                    ->default('takeover')
                                    ->native(false)
                                    ->required(),

                                TextInput::make('detail')
                                    ->placeholder('e.g. Assisted by Moses Lubega')
                                    ->maxLength(180)
                                    ->columnSpanFull(),
                            ]),
                    ]),

                Section::make('Line-up')
                    ->visible(fn (Get $get) => in_array($get('status'), ['played', 'live'], true))
                    ->collapsed()
                    ->columns(2)
                    ->schema([
                        TagsInput::make('lineup')
                            ->label('Starting eleven')
                            ->helperText('Type a name and press Enter.')
                            ->placeholder('Add a player'),

                        TagsInput::make('substitutes')
                            ->helperText('Type a name and press Enter.')
                            ->placeholder('Add a player'),
                    ]),

                Section::make('Statistics')
                    ->visible(fn (Get $get) => $get('status') === 'played')
                    ->collapsed()
                    ->schema([
                        Repeater::make('statistics')
                            ->hiddenLabel()
                            ->columns(3)
                            ->defaultItems(0)
                            ->addActionLabel('Add a statistic')
                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                            ->schema([
                                TextInput::make('label')
                                    ->placeholder('Possession %')
                                    ->required(),
                                TextInput::make('takeover')
                                    ->label('Takeover FC')
                                    ->numeric()
                                    ->required(),
                                TextInput::make('opponent')
                                    ->numeric()
                                    ->required(),
                            ]),
                    ]),

                Section::make('Match report and photos')
                    ->visible(fn (Get $get) => $get('status') === 'played')
                    ->collapsed()
                    ->schema([
                        Repeater::make('report')
                            ->label('Report')
                            ->helperText('One block per paragraph. Start a block with "## " to make it a subheading.')
                            ->simple(
                                Textarea::make('paragraph')->rows(3)->required(),
                            )
                            ->defaultItems(0)
                            ->addActionLabel('Add a paragraph'),

                        FileUpload::make('photos')
                            ->multiple()
                            ->image()
                            ->reorderable()
                            ->directory('matches')
                            ->maxSize(6144)
                            ->helperText('Match photography. Images are optimised on the website.'),
                    ]),
            ]);
    }

    /** Match slugs read as opponent + date, e.g. "vs-nsambya-united-2026-09-05". */
    private static function buildSlug(?string $opponent, mixed $kickoff): ?string
    {
        if (blank($opponent)) {
            return null;
        }

        $date = $kickoff ? substr((string) $kickoff, 0, 10) : now()->toDateString();

        return Str::slug("vs-{$opponent}-{$date}");
    }
}
