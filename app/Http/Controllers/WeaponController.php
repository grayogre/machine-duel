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
        $src = Weapon::where('id',$id)->firstOrFail();
        $dst = $src->replicate();
        $dst['user_id'] = Auth::id();
        $dst->save();
    }
}
