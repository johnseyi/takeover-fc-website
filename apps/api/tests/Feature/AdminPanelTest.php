<?php

namespace Tests\Feature;

use App\Filament\Resources\Articles\ArticleResource;
use App\Filament\Resources\GalleryAlbums\GalleryAlbumResource;
use App\Filament\Resources\Players\PlayerResource;
use App\Filament\Resources\Users\UserResource;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Smoke tests for the admin panel.
 *
 * Every Filament resource is compiled and rendered, so a broken form schema or
 * a bad column definition fails here rather than in front of the club.
 */
class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::create([
            'name' => 'Test Admin',
            'email' => 'admin@example.test',
            'password' => 'password',
            'role' => User::ROLE_ADMIN,
            'is_active' => true,
        ]);
    }

    public function test_login_screen_is_reachable(): void
    {
        $this->get('/admin/login')->assertOk();
    }

    public function test_panel_requires_authentication(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_deactivated_users_cannot_access_the_panel(): void
    {
        $user = $this->admin();
        $user->update(['is_active' => false]);

        $this->actingAs($user)->get('/admin')->assertForbidden();
    }

    /**
     * Renders every resource's list screen. A syntax or schema error in any
     * table definition surfaces as a 500 here.
     */
    public function test_every_resource_list_screen_renders(): void
    {
        $admin = $this->admin();

        $paths = [
            '/admin/players',
            '/admin/teams',
            '/admin/fixtures',
            '/admin/articles',
            '/admin/staff-members',
            '/admin/partners',
            '/admin/gallery-albums',
            '/admin/videos',
            '/admin/users',
        ];

        foreach ($paths as $path) {
            $this->actingAs($admin)
                ->get($path)
                ->assertOk("Failed rendering {$path}");
        }
    }

    /**
     * Role gating (§65). A media user may publish news but must not be able to
     * create panel users or edit the squad.
     */
    public function test_roles_restrict_what_each_user_can_manage(): void
    {
        $media = User::create([
            'name' => 'Media Officer',
            'email' => 'media@example.test',
            'password' => 'password',
            'role' => User::ROLE_MEDIA,
            'is_active' => true,
        ]);

        $this->actingAs($media);

        $this->assertTrue(ArticleResource::canCreate(), 'Media staff should manage news');
        $this->assertTrue(GalleryAlbumResource::canCreate(), 'Media staff should manage albums');
        $this->assertFalse(PlayerResource::canCreate(), 'Media staff should not edit the squad');
        $this->assertFalse(UserResource::canViewAny(), 'Only admins manage panel users');

        $viewer = User::create([
            'name' => 'Viewer',
            'email' => 'viewer@example.test',
            'password' => 'password',
            'role' => User::ROLE_VIEWER,
            'is_active' => true,
        ]);

        $this->actingAs($viewer);

        $this->assertTrue(ArticleResource::canViewAny(), 'Viewers may read');
        $this->assertFalse(ArticleResource::canCreate(), 'Viewers may not write');
    }

    /** The match form is the screen the club will use most (§51). */
    public function test_fixture_create_screen_renders(): void
    {
        Team::create([
            'slug' => 'senior',
            'name' => 'Senior Team',
            'short_name' => 'Senior',
            'age_group' => 'Senior',
        ]);

        $this->actingAs($this->admin())
            ->get('/admin/fixtures/create')
            ->assertOk();
    }
}
