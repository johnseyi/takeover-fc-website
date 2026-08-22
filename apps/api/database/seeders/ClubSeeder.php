<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\GalleryAlbum;
use App\Models\Player;
use App\Models\Setting;
use App\Models\StaffMember;
use App\Models\Team;
use Illuminate\Database\Seeder;

/**
 * Seeds the club's genuinely documented content.
 *
 * Deliberately does NOT seed the placeholder squad or the invented fixtures
 * that the static frontend shipped with. Those existed so the design could be
 * reviewed; now that the club has an admin panel, real players and real results
 * should be entered through it. Starting from an honest, mostly-empty database
 * is the point — the site already handles empty states properly.
 *
 * Safe to re-run: every record is matched on its slug.
 */
class ClubSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedTeams();
        $this->seedPlayers();
        $this->seedStaffRoles();
        $this->seedArticles();
        $this->seedAlbums();
        $this->seedSettings();
    }

    private function seedTeams(): void
    {
        $teams = [
            [
                'slug' => 'senior',
                'name' => 'Senior Team',
                'short_name' => 'Senior',
                'age_group' => 'Senior',
                'status' => 'active',
                'sort_order' => 1,
                'summary' => "The club's first team, and the standard every other squad is measured against.",
                'description' => [
                    "The senior team is where the club's identity is most visible: community players, competing week to week, representing the neighbourhoods they come from.",
                    'It is also the destination the rest of the club\'s structure points toward — the proof that a pathway from community football into an organised squad genuinely exists.',
                ],
                'image' => '/images/senior-team-lineup.jpg',
                'image_alt' => 'The Takeover FC senior team lined up in white and green kit before a match',
            ],
            [
                'slug' => 'under-17',
                'name' => 'Under-17',
                'short_name' => 'U17',
                'age_group' => 'Under-17',
                'status' => 'active',
                'sort_order' => 2,
                'summary' => 'The club\'s youth squad, where development is the result and the scoreline is the by-product.',
                'description' => [
                    'The Under-17 side is the heart of the club\'s youth work. Players here are still in school, still growing into their bodies, and still learning what commitment to a team actually costs.',
                    'The squad is coached with that in mind: technique and game understanding first, results as the consequence of getting the rest right.',
                ],
                'image' => '/images/squad-portrait-five.jpg',
                'image_alt' => 'Five Takeover FC Under-17 players standing together in club kit',
            ],
            [
                'slug' => 'academy',
                'name' => 'Takeover FC Academy',
                'short_name' => 'Academy',
                'age_group' => 'Youth',
                'status' => 'planned',
                'sort_order' => 3,
                'summary' => 'The next generation starts here.',
                'description' => [
                    'A structured youth academy is the club\'s next major step: consistent coaching, education support and a defined pathway from community football into the Under-17 and senior squads.',
                    'The academy is in development. We would rather build it properly than announce it early.',
                ],
                'image' => '/images/squad-portrait-trio.jpg',
                'image_alt' => 'Three young Takeover FC players in club shirts after a match',
            ],
            [
                'slug' => 'girls',
                'name' => "Girls' Football",
                'short_name' => 'Girls',
                'age_group' => 'Youth',
                'status' => 'planned',
                'sort_order' => 4,
                'summary' => 'A pathway in development.',
                'description' => [
                    'Football opportunities should not be limited by gender. Establishing a girls\' programme is part of the club\'s long-term development strategy.',
                    'This is a future programme, and we will present it as one until the first session is on the ground.',
                ],
            ],
        ];

        foreach ($teams as $team) {
            Team::updateOrCreate(['slug' => $team['slug']], $team);
        }
    }

    /**
     * The only two players documented in the master plan (§35).
     *
     * No photograph is attached: the club's photography has not been matched to
     * named individuals, and misidentifying a young player is not a risk worth
     * taking. The website renders a crest avatar until a portrait is uploaded.
     */
    private function seedPlayers(): void
    {
        $u17 = Team::where('slug', 'under-17')->first();
        $senior = Team::where('slug', 'senior')->first();

        Player::updateOrCreate(['slug' => 'kenneth-gidudu'], [
            'name' => 'Kenneth Gidudu',
            'position' => 'Midfielder',
            'role' => 'Captain / Under-17',
            'team_id' => $u17?->id,
            'nationality' => 'Ugandan',
            'age_group' => 'Under-17',
            'status' => 'active',
            'school' => 'Standard High School Zana — Ndeje Campus',
            'sort_order' => 1,
            'bio' => [
                'Kenneth captains the Takeover FC Under-17 side, and he leads the way most young captains have to at this level — by being the most consistent person on the pitch rather than the loudest.',
                'He came through community football in the neighbourhoods the club was built in, and his development has tracked the club\'s own: more structure, more discipline, more responsibility each season.',
                'Alongside his football, Kenneth is a student at Standard High School Zana — Ndeje Campus, where his leadership within the squad has become one of the clearest examples of what the club is trying to build.',
            ],
            'journey' => [
                ['label' => 'Community football', 'detail' => "Introduced to organised football through Takeover FC's work in the surrounding communities."],
                ['label' => 'Under-17 squad', 'detail' => "Established himself as a regular in the club's Under-17 team."],
                ['label' => 'Captain', 'detail' => 'Appointed captain of the Under-17 side, taking responsibility for standards on and off the pitch.'],
            ],
            'achievements' => ['Captain of the Takeover FC Under-17 team'],
            'quote' => [
                'text' => "We don't simply develop footballers. We develop young people through football.",
                'attribution' => 'The club standard Kenneth leads by',
            ],
        ]);

        Player::updateOrCreate(['slug' => 'imran-yasin'], [
            'name' => 'Imran Yasin',
            'alias' => 'Santos',
            'position' => 'Midfielder',
            'role' => 'Senior Team',
            'team_id' => $senior?->id,
            'nationality' => 'Ugandan',
            'age_group' => 'Senior',
            'status' => 'active',
            'school' => 'Standard High School Zana — Ndeje Campus',
            'sort_order' => 1,
            'bio' => [
                'Known throughout the club as "Santos", Imran Yasin is one of the clearest examples of what leadership looks like at Takeover FC.',
                "He captained the senior team at Standard High School Zana — Ndeje Campus, and the side's record under his leadership speaks for itself: the Post Primary Championship, the District Championship and the Regional Championship.",
                'That combination — a player who wins and who raises the standard of the people around him — is exactly the profile the club is trying to produce.',
            ],
            'journey' => [
                ['label' => 'Community football', 'detail' => 'Came through football in the communities Takeover FC serves.'],
                ['label' => 'School captaincy', 'detail' => 'Captained the senior team at Standard High School Zana — Ndeje Campus.'],
                ['label' => 'Championship run', 'detail' => 'Led the side to the Post Primary, District and Regional Championships.'],
            ],
            'achievements' => [
                'Post Primary Championship',
                'District Championship',
                'Regional Championship',
                'Captain, Standard High School Zana — Ndeje Campus senior team',
            ],
            'quote' => [
                'text' => 'Talent without discipline cannot build a lasting career.',
                'attribution' => 'Takeover FC core value',
            ],
        ]);
    }

    /**
     * Staff roles, not staff names.
     *
     * The club's structure is known; the post-holders are not confirmed. Seeding
     * the roles unpublished means the panel shows exactly what needs filling in,
     * without publishing placeholder people to the website.
     */
    private function seedStaffRoles(): void
    {
        $roles = [
            ['club-chairperson', 'Club Chairperson', 'Leadership', ['Overall direction of the club', 'Institutional partnerships and representation', 'Governance and accountability']],
            ['club-manager', 'Club Manager', 'Leadership', ['Day-to-day running of the club', 'Fixture and competition administration', 'Coordination between teams, staff and community programmes']],
            ['head-coach', 'Head Coach — Senior Team', 'Technical', ['Senior team selection and match preparation', 'Training programme and player development plans', 'Coaching standards across the club']],
            ['under-17-coach', 'Coach — Under-17', 'Technical', ['Under-17 training and matchday management', 'Individual development tracking', 'Progression of players toward the senior squad']],
            ['goalkeeping-coach', 'Goalkeeping Coach', 'Technical', ['Specialist goalkeeper sessions across all squads', 'Match preparation for goalkeepers']],
            ['community-officer', 'Community Programmes Officer', 'Administration', ['Community programme delivery across the five core communities', 'School and partner liaison', 'Participant welfare and safeguarding referrals']],
            ['media-officer', 'Media & Communications Officer', 'Administration', ['Club photography, video and match coverage', 'Website and social media publishing', 'Press and media enquiries']],
            ['team-physiotherapist', 'Physiotherapist', 'Medical', ['Injury assessment, treatment and return-to-play decisions', 'Matchday medical cover', 'Player conditioning and injury prevention']],
            ['kit-manager', 'Kit & Equipment Manager', 'Support', ['Kit, training equipment and matchday logistics', 'Equipment donations and inventory']],
        ];

        foreach ($roles as $index => [$slug, $position, $department, $responsibilities]) {
            StaffMember::updateOrCreate(['slug' => $slug], [
                'name' => $position,
                'position' => $position,
                'department' => $department,
                'responsibilities' => $responsibilities,
                'bio' => null,
                // Unpublished until a real person is attached to the role.
                'is_published' => false,
                'sort_order' => $index + 1,
            ]);
        }
    }

    private function seedArticles(): void
    {
        $articles = [
            [
                'slug' => 'from-the-community-to-the-captains-armband',
                'title' => "From the community to the captain's armband",
                'category' => 'Player Stories',
                'published_at' => '2026-08-12',
                'featured' => true,
                'excerpt' => 'Kenneth Gidudu leads the Under-17 side the way the club wants leadership to look: quietly, consistently, and by example.',
                'featured_image' => '/images/squad-portrait-trio.jpg',
                'featured_image_alt' => 'Three Takeover FC players in club shirts standing together after a match',
                'tags' => ['Kenneth Gidudu', 'Under-17', 'Leadership'],
                'body' => [
                    'There is a version of a captain that shouts. There is another that simply does the work, arrives first, and makes it awkward for anyone else to do less. Kenneth Gidudu is the second kind.',
                    'Kenneth captains the Takeover FC Under-17 side. He came into the club the same way most of our players do — through football happening on open ground in the communities we work in, without an academy badge or a scouting network in sight.',
                    '## Development, not discovery',
                    'It is tempting to describe young players as being discovered. That is rarely what actually happens. What happens is that someone keeps showing up, over months, and the structure around them slowly catches up to their commitment.',
                    'That is the story of Kenneth\'s progress through the club, and it is the story of the club\'s own progress too. As Takeover FC has become more organised — more consistent training, clearer expectations, actual fixtures — the players inside it have had something firmer to push against.',
                    '## On and off the pitch',
                    "Alongside his football, Kenneth is a student at Standard High School Zana — Ndeje Campus. The club's position on this is not negotiable: education is not a fallback for players who do not make it. It is part of making it.",
                    'That is the point. A club is not built by one talented generation. It is built when the first generation leaves behind a standard the next one inherits.',
                ],
            ],
            [
                'slug' => 'santos-and-a-season-that-proved-the-point',
                'title' => 'Santos, and a season that proved the point',
                'category' => 'Player Stories',
                'published_at' => '2026-08-05',
                'excerpt' => "Imran Yasin captained his school's senior side to the Post Primary, District and Regional Championships. The club has been paying attention.",
                'featured_image' => '/images/champions-trophy-celebration.jpg',
                'featured_image_alt' => 'Young footballers celebrating together with a championship trophy',
                'tags' => ['Imran Yasin', 'Senior Team', 'Leadership'],
                'body' => [
                    "Everyone at the club calls him Santos. It is the kind of name a player earns rather than chooses, and in Imran Yasin's case it has followed him through one of the more convincing runs of results any player associated with Takeover FC has been part of.",
                    'Imran captained the senior team at Standard High School Zana — Ndeje Campus. Under his leadership the side won the Post Primary Championship, the District Championship and the Regional Championship.',
                    '## What a run like that actually shows',
                    'Three championships in a season is a result. But results at school level can come from a single outstanding player carrying a team, and that is not what interests us most about this one.',
                    'What interests us is that a captain held a group together across three separate competitions, in different formats, against progressively better opposition. That requires a squad that keeps its shape when it is tired and keeps its discipline when it is provoked. Somebody has to set that.',
                    '## The profile the club is trying to produce',
                    'Takeover FC has been explicit about what it is building toward: players with the discipline to sustain a career and the character to raise the level of the people around them. Talent on its own has never been the scarce resource in our communities.',
                ],
            ],
            [
                'slug' => 'where-we-come-from-matters',
                'title' => 'Where we come from matters',
                'category' => 'Community',
                'published_at' => '2026-07-29',
                'excerpt' => 'Namuwongo, Kanyogoga, Kasanvu, Soweto and Tebaleka are not a catchment area. They are the club\'s identity.',
                'featured_image' => '/images/match-dirt-pitch-duel.jpg',
                'featured_image_alt' => 'Takeover FC players competing for the ball on a dirt pitch with community housing behind',
                'tags' => ['Community', 'Namuwongo', 'Impact'],
                'body' => [
                    'Football clubs usually describe the places they come from in the language of geography — a region, a district, a catchment. For Takeover FC, five names do something more specific than that.',
                    'Namuwongo. Kanyogoga. Kasanvu. Soweto. Tebaleka.',
                    "These are not simply locations on a map. They are part of the club's identity, and the reason the club exists in the form it does.",
                    '## Football is the platform',
                    "The club's work in these communities starts with access. Organised football — a fixture list, a coach, a kit, an actual pitch to turn up to — is not a given for most young people here. Creating that access is the first thing Takeover FC does, because everything else depends on it.",
                    '## Seeing further than the immediate',
                    'The honest ambition is modest to state and difficult to achieve: to help young people see possibilities beyond their immediate circumstances.',
                    'Not every player in a Takeover FC shirt will have a football career. Most will not. But every one of them can leave with habits, relationships and a sense of what they are capable of that outlasts the season.',
                ],
            ],
            [
                'slug' => 'building-the-next-generation',
                'title' => 'Building the next generation',
                'category' => 'Academy',
                'published_at' => '2026-07-15',
                'excerpt' => "The club's next major step is a structured youth academy. Here is what it needs to be, and why we are not rushing it.",
                'featured_image' => '/images/squad-portrait-five.jpg',
                'featured_image_alt' => 'Five young Takeover FC players standing together in club kit after a match',
                'tags' => ['Academy', 'Youth Development'],
                'body' => [
                    'Talent in our communities is not scarce. Structure is.',
                    "That single observation is the reason the Takeover FC Academy is the club's next major undertaking — and the reason we are being careful about how it is announced.",
                    '## What an academy has to actually provide',
                    "A youth academy is not a training session with a better name. To be worth a young player's time it has to offer consistency: sessions that happen whether or not the weather cooperates, coaching that follows a plan across a season, and a defined route from community football into the Under-17 squad and beyond.",
                    '## Why we are not announcing a launch date',
                    'The club could open an academy tomorrow and fill it. What it could not yet guarantee is that the coaching, the safeguarding, the equipment and the education support would all be in place at the standard young players deserve.',
                    'So the academy is in development, and we will say so plainly until it is not.',
                ],
            ],
            [
                'slug' => 'the-score-is-bigger-than-the-scoreboard',
                'title' => 'The score is bigger than the scoreboard',
                'category' => 'Opinion',
                'published_at' => '2026-07-08',
                'excerpt' => 'Every match matters. So does every young person who finds discipline, confidence and opportunity through football.',
                'featured_image' => '/images/player-celebration.jpg',
                'featured_image_alt' => 'A Takeover FC player celebrating during a community match',
                'tags' => ['Opinion', 'Impact'],
                'body' => [
                    'There is a question community football clubs get asked more than any other: how are you doing this season?',
                    'It is a fair question, and the club answers it honestly. Results matter. Competing properly is the reason a football club is a football club and not a youth programme with a badge.',
                    '## What else gets counted',
                    'A player who has turned up to every session for four months has built something that does not appear in a league table. A young person who stayed in school because the club made it a condition has gained something no scoreline records.',
                    '## Both things at once',
                    'The argument is simply that a football club serving communities like ours has two scoreboards, and only one of them is visible on a Saturday afternoon.',
                ],
            ],
        ];

        foreach ($articles as $article) {
            Article::updateOrCreate(
                ['slug' => $article['slug']],
                $article + ['author' => 'Takeover FC', 'is_published' => true],
            );
        }
    }

    private function seedAlbums(): void
    {
        $albums = [
            [
                'slug' => 'matchday',
                'title' => 'Matchday',
                'sort_order' => 1,
                'description' => 'Competitive football on the grounds the club calls home — dirt pitches, community backdrops, and no shortage of intensity.',
                'cover' => '/images/match-dirt-pitch-duel.jpg',
                'photos' => [
                    ['/images/match-dirt-pitch-duel.jpg', 'Four players contest possession on a dirt pitch with community housing behind', "Possession contested on the club's home ground."],
                    ['/images/match-shoulder-to-shoulder.jpg', 'Two players run shoulder to shoulder chasing a loose ball', 'Shoulder to shoulder, chasing the same ball.'],
                    ['/images/match-driving-forward.jpg', 'A Takeover FC player drives forward with the ball under pressure', 'Driving forward under pressure.'],
                    ['/images/match-first-touch.jpg', 'A player takes a first touch out of the air on a grass pitch', 'First touch, taken out of the air.'],
                    ['/images/match-shielding-ball.jpg', 'A Takeover FC player shields the ball from an opponent', 'Shielding possession on the turn.'],
                    ['/images/player-celebration.jpg', 'A Takeover FC player celebrates on a dirt pitch, kit covered in red dust', 'The kit tells you what kind of afternoon it was.'],
                ],
            ],
            [
                'slug' => 'players',
                'title' => 'Players',
                'sort_order' => 2,
                'description' => 'The squad, photographed where they play — after the final whistle, before anyone has changed.',
                'cover' => '/images/squad-portrait-trio.jpg',
                'photos' => [
                    ['/images/squad-portrait-trio.jpg', 'Three Takeover FC players stand together in club shirts after a match', 'Three of the squad after full time.'],
                    ['/images/squad-portrait-duo.jpg', 'Two Takeover FC players in club shirts, smiling after a match', 'The best part of the afternoon.'],
                    ['/images/squad-portrait-five.jpg', 'Five Takeover FC players including the goalkeeper stand in a line in club kit', 'Five of the group, goalkeeper included.'],
                    ['/images/senior-team-lineup.jpg', 'The Takeover FC senior team lined up in white and green kit before a match', 'The senior team before kick-off.'],
                ],
            ],
            [
                'slug' => 'community',
                'title' => 'Community',
                'sort_order' => 3,
                'description' => 'Where the club comes from. The environment is part of the story, not the background to it.',
                'cover' => '/images/squad-lineup-community.jpg',
                'photos' => [
                    ['/images/squad-lineup-community.jpg', 'The Takeover FC squad lined up across a dirt pitch with community buildings behind them', 'Lined up on home ground, the community directly behind.'],
                    ['/images/match-dirt-pitch-duel.jpg', 'Players compete on a dirt pitch surrounded by community housing', 'Football happening exactly where the club is rooted.'],
                ],
            ],
            [
                'slug' => 'events',
                'title' => 'Events',
                'sort_order' => 4,
                'description' => 'Finals, presentations and the afternoons that get remembered for longer than a league fixture.',
                'cover' => '/images/champions-medals.jpg',
                'photos' => [
                    ['/images/champions-medals.jpg', 'A championship-winning squad with medals and a trophy alongside officials', 'Medals, a trophy, and a photograph nobody wanted to rush.'],
                    ['/images/champions-trophy-celebration.jpg', 'Young footballers celebrating together around a championship trophy', "The celebration that follows a season's work."],
                    ['/images/trophy-presentation.jpg', 'A captain receives a championship trophy at a presentation ceremony', 'The presentation.'],
                ],
            ],
        ];

        foreach ($albums as $data) {
            $photos = $data['photos'];
            unset($data['photos']);

            $album = GalleryAlbum::updateOrCreate(['slug' => $data['slug']], $data);
            $album->photos()->delete();

            foreach ($photos as $index => [$src, $alt, $caption]) {
                $album->photos()->create([
                    'src' => $src,
                    'alt' => $alt,
                    'caption' => $caption,
                    'sort_order' => $index + 1,
                ]);
            }
        }
    }

    private function seedSettings(): void
    {
        // ⚠️ Contact and social values are placeholders until the club supplies
        // its real channels. They live here so they are editable in the panel.
        $settings = [
            ['contact', [
                'general' => 'hello@takeoverfc.com',
                'partnerships' => 'partners@takeoverfc.com',
                'media' => 'media@takeoverfc.com',
                'players' => 'join@takeoverfc.com',
                'phone' => '+256 700 000 000',
                'address' => 'Namuwongo, Kampala, Uganda',
            ], 'contact'],
            ['socials', [
                ['label' => 'Instagram', 'handle' => '@takeovercreativesfc', 'href' => ''],
                ['label' => 'Facebook', 'handle' => 'Takeover Creatives FC', 'href' => ''],
                ['label' => 'TikTok', 'handle' => '@takeovercreativesfc', 'href' => ''],
                ['label' => 'YouTube', 'handle' => 'Takeover Creatives FC', 'href' => ''],
                ['label' => 'X', 'handle' => '@takeoverfc', 'href' => ''],
            ], 'contact'],
            ['club_stats', [
                ['value' => 2024, 'label' => 'Founded', 'format' => 'plain'],
                ['value' => 25, 'label' => 'Young People Served', 'suffix' => '+'],
                ['value' => 5, 'label' => 'Core Communities'],
                ['value' => 1, 'label' => 'Bigger Mission'],
            ], 'homepage'],
        ];

        foreach ($settings as [$key, $value, $group]) {
            Setting::put($key, $value, $group);
        }
    }
}
