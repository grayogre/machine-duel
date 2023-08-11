<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Weapon>
 */
class WeaponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'weapon_name' => $this->faker->word(),
            'user_id' => $this->faker->randomElement([1, 2, 3]),
            'power_impact' => $this->faker->numberBetween(0, 50),
            'power_penetrate' => $this->faker->numberBetween(0, 50),
            'power_heat' => $this->faker->numberBetween(0, 50),
            'ammo_type' => $this->faker->randomElement([0, 1]),
            'ammo_count' => $this->faker->numberBetween(1, 50),
            'hit_rate' => $this->faker->numberBetween(1, 99),
            'attack_type' => $this->faker->randomElement([0, 1, 2]),
            'min_range' => $this->faker->numberBetween(1, 30),
            'max_range' => $this->faker->numberBetween(31, 50),
            'stabilizer_weight' => $this->faker->numberBetween(0, 20),
            'parry_rate' => $this->faker->numberBetween(1, 99),
            'can_mount_head' => $this->faker->randomElement([0, 1]),
            'can_mount_hand' => $this->faker->randomElement([0, 1]),
            'can_mount_arm' => $this->faker->randomElement([0, 1]),
            'can_mount_shoulder' => $this->faker->randomElement([0, 1]),
            'can_mount_torso' => $this->faker->randomElement([0, 1]),
            'can_mount_leg' => $this->faker->randomElement([0, 1]),
            'description' => $this->faker->realText(),
        ];
    }
}
