<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\WeaponService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\WeaponEditRequest;
use App\Models\Weapon;
use Illuminate\Support\Facades\Auth;

class WeaponController extends Controller
{
    public function list(Request $request, WeaponService $service) : Response
    {
        $namePart = is_null($request->namePart) ? '' : $request->namePart;
        $arratckType = is_null($request->attackType) ? -1 : intval($request->attackType);
        $myWeapon = boolval($request->myWeapon);
        $userId = $request->user()->id;
        $headMountable = is_null($request->headMountable) ? '1' : $request->headMountable; 
        $handMountable = is_null($request->handMountable) ? '1' : $request->handMountable;
        $armMountable = is_null($request->armMountable) ? '1' : $request->armMountable;
        $shoulderMountable = is_null($request->shoulderMountable) ? '1' : $request->shoulderMountable;
        $torsoMountable = is_null($request->torsoMountable) ? '1' : $request->torsoMountable;
        $legMountable = is_null($request->legMountable) ? '1' : $request->legMountable;

        $summaries = $service->selectSummaries(
            $namePart, $arratckType, $myWeapon, $userId,
            $headMountable, $handMountable, $armMountable,
            $shoulderMountable, $torsoMountable, $legMountable
        );

        return Inertia::render('Weapon/Summaries',[ 'list' => $summaries ]);
    }

    public function view(string $id, WeaponService $service) : Response
    {
        $detail = $service->getDetail($id);
        return Inertia::render('Weapon/View', [ 'weapon' => $detail ]);
    }

    public function create(Request $request, WeaponService $service)
    {
        $weapon = $service->newWeapon($request->user()->id);
        return Inertia::render('Weapon/Edit', ['weapon' => $weapon ]);
    }

    public function edit(string $id, WeaponService $service) : Response
    {
        $weapon = $service->getWeapon($id);
        return Inertia::render('Weapon/Edit', ['weapon' => $weapon ]);
    }

    public function store(WeaponEditRequest $request, WeaponService $service)
    {
        $weapon = $service->setWeaponAttributes($request);
        $weapon->save();
        return to_route('weapon.summary');
    }

    public function copy(string $id) {
        $src = Weapon::where('id', intval($id))->firstOrFail();
        $dst = $src->replicate();
        $dst['user_id'] = Auth::id();
        $dst->save();
        return to_route('weapon.summary');
    }

    public function delete(string $id) {
        $target = Weapon::where('id', intval($id))->firstOrFail();
        $target->delete();
        return to_route('weapon.summary');
    }
  
    public function baseweight(Request $request, WeaponService $service) {
        $min_range = intval($request->min_range);
        $max_range = intval($request->max_range);
        $attack_type = intval($request->attack_type);
        $ammo_type = intval($request->ammo_type);
        $ammo_count = intval($request->ammo_count);
        $parry_rate = intval($request->parry_rate);

        $base_waight = $service->baseWaight(
            $min_range,
            $max_range,
            $attack_type,
            $ammo_type,
            $ammo_count,
            $parry_rate
        );

        return ["base_weight" => $base_waight];
    }

    public function failurerate(Request $request, WeaponService $service)
    {
        $power_total = $request->power_total;
        $min_range = $request->min_range;
        $max_range = $request->max_range;
        $total_weight = $request->total_weight;
        $hit_rate = $request->hit_rate;
        $parry_rate = $request->parry_rate;
    
        $failure_rate = $service->failureRate(
            $power_total,
            $min_range,
            $max_range,
            $total_weight,
            $hit_rate,
            $parry_rate
        );

        return ["failure_rate" => $failure_rate];
    }
}
