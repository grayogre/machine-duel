<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weapons', function (Blueprint $table) {
            $table->id();
            $table->string('weapon_name');
            $table->integer('user_id');
            $table->integer('power_impact');
            $table->integer('power_penetrate');
            $table->integer('power_heat');
            $table->integer('ammo_type');
            $table->integer('ammo_count');
            $table->integer('hit_rate');
            $table->integer('attack_type');
            $table->integer('min_range');
            $table->integer('max_range');
            $table->integer('stabilizer_weight');
            $table->integer('parry_rate');
            $table->integer('can_mount_head');
            $table->integer('can_mount_hand');
            $table->integer('can_mount_arm');
            $table->integer('can_mount_shoulder');
            $table->integer('can_mount_torso');
            $table->integer('can_mount_leg');
            $table->string('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weapons');
    }
};
