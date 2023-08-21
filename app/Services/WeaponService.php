<?php

namespace App\Services;

use App\Models\Weapon;
use App\Models\User;
use App\Http\Requests\WeaponEditRequest;

const WEAPON_BASE_WEIGHT = 5;
const ATTACK_TYPE_SHOOT = 0;
const ATTACK_TYPE_MEREE = 1;
const ATTACK_TYPE_SHIELD = 2;
const AMMO_TYPE_FINITE = 0;
const WEIGHT_INFINITE_AMMO = 2;

class WeaponService
{

  const AttackTypeTable = ['射撃', '白兵', '盾'];

  public function selectSummaries(
    string $namePart, 
    int $attackType,
    bool $myWeapon,
    int $userId,
    string $headMountable,
    string $handMountable,
    string $armMountable,
    string $shoulderMountable,
    string $torsoMountable,
    string $legMounbtable
  ) {

    $summaries = [];

    $query = Weapon::with('user')->join('users','users.id','=','weapons.user_id')
        ->select('weapons.*', 'users.name as register', 'users.id as uid');
    if ($namePart != '') {
        $query = $query->where('weapon_name','LIKE', '%'.addcslashes($namePart, '%_\\').'%');
    }
    if ($attackType >= 0 && $attackType <= 2) {
        $query = $query->where('attack_type', '=', $attackType);
    }
    if ($myWeapon) {
        $query = $query->where('user_id', '=', $userId);
    }   
    $query->where(function($q) 
        use ($headMountable, $handMountable, $armMountable,
              $shoulderMountable, $torsoMountable, $legMounbtable) 
    {
        $orFlag = false;
        if ($headMountable === '1') {
            $q = $q->where('can_mount_head', '=', 1);
            $orFlag = true;
        }
        if ($handMountable === '1') {
            if ($orFlag) {
                $q = $q->orWhere('can_mount_hand', '=', 1);
            } else {
                $q = $q->where('can_mount_hand', '=', 1);
                $orFlag = true;
            }
        }
        if ($armMountable === '1') {
            if ($orFlag) {
                $q = $q->orWhere('can_mount_arm', '=', 1);
            } else {
                $q = $q->where('can_mount_arm', '=', 1);
                $orFlag = true;
            }
        }
        if ($shoulderMountable === '1') {
            if ($orFlag) {
                $q = $q->orWhere('can_mount_shoulder', '=', 1);
            } else {
                $q = $q->where('can_mount_shoulder', '=', 1);
                $orFlag = true;
            }
        }
        if ($torsoMountable === '1') {
            if ($orFlag) {
                $q = $q->orWhere('can_mount_torso', '=', 1);
            } else {
                $q = $q->where('can_mount_torso', '=', 1);
                $orFlag = true;
            }
        }
        if ($legMounbtable === '1') {
            if ($orFlag) {
                $q = $q->orWhere('can_mount_leg', '=', 1);
            } else {
                $q = $q->where('can_mount_leg', '=', 1);
                $orFlag = true;
            }
        }
        if (!$orFlag) {
            $q->where('weapons.id', '=', '-1');
        }
    });

    $weapons = $query->get(); 
    foreach ($weapons as $weapon)
    {
        $row = [];
        $row['id'] = $weapon['id'];
        $row['weapon_name'] = $weapon['weapon_name'];
        $row['register'] = $weapon['register'];
        $row['myWeapon'] = $weapon['user_id'] === $userId;
        $row['attack_type'] = $this->attackTypeText($weapon);
        $power_total = $weapon['power_impact'] + $weapon['power_penetrate'] + $weapon['power_heat'];
        $row['power_total'] = $power_total;
        $row['ammo_type'] = $this->ammoText($weapon);
        $row['atacck_range'] = strval($weapon['min_range']) . '～' . strval($weapon['max_range']);
        $total_waight = $this->baseWaight($weapon['min_range'], $weapon['max_range'], $weapon['attack_type'], $weapon['ammo_type'], $weapon['ammo_count'], $weapon['parry_rate']) + $weapon['stabilizer_weight'];
        $row['total_waight'] = $total_waight;
        $row['hit_rate'] = $weapon['hit_rate'];
        $row['parry_rate'] = $weapon['parry_rate'];
        $row['failure_rate'] = $this->failureRate($power_total, $weapon['min_range'],$weapon['max_range'], $total_waight, $weapon['hit_rate'], $weapon['parry_rate']);
        $row['mount_position'] = $this->mountPointString($weapon);
        $summaries[] = $row;
    } 

    return $summaries;
  }

  public function getDetail(string $id)
  {
    $weapon = Weapon::where('id', intval($id))->firstOrFail();

    $result = [];
    $result['id'] = $weapon['id'];
    $result['weapon_name'] = $weapon['weapon_name'];
    $result['user_id'] = $weapon['user_id'];
    $result['register'] = $weapon->user->name;
    $result['power_impact'] = $weapon['power_impact'];
    $result['power_penetrate'] = $weapon['power_penetrate'];
    $result['power_heat'] = $weapon['power_heat'];
    $powerTotal = $weapon['power_impact'] + $weapon['power_penetrate'] + $weapon['power_heat'];
    $result['ammo_text'] = $this->ammoText($weapon);
    $result['hit_rate'] = $weapon['hit_rate'];
    $result['attack_text'] = $this->attackTypeText($weapon);
    $result['range_text'] = strval($weapon['min_range']) . ' ～ ' . strval($weapon['max_range']);
    $baseWaight = $this->baseWaight($weapon['min_range'], $weapon['max_range'], $weapon['attack_type'], $weapon['ammo_type'], $weapon['ammo_count'], $weapon['parry_rate']);
    $result['base_waight'] = $baseWaight;
    $result['stabilizer_weight'] = $weapon['stabilizer_weight'];
    $totalWaight = $baseWaight + $weapon['stabilizer_weight'];
    $result['total_waight'] = $totalWaight;
    $result['parry_rate'] = $weapon['parry_rate'];
    $result['failure_rate'] = $this->failureRate($powerTotal, $weapon['min_range'],$weapon['max_range'], $totalWaight, $weapon['hit_rate'], $weapon['parry_rate']);
    $result['mount_points'] = $this->mountPointString($weapon);
    $result['description'] = $weapon['description'];

    return $result;
  }

  public function getWeapon($id) {
    $weapon = Weapon::where('id', intval($id))->firstOrFail();
    return $weapon;
  }

  public function newWeapon(int $userId) {
    $weapon = new Weapon();
    $weapon['id'] = null;
    $weapon['weapon_name'] = '';
    $weapon['user_id'] = $userId;
    $weapon['power_impact'] = 0;
    $weapon['power_penetrate'] = 0;
    $weapon['power_heat'] = 0;
    $weapon['ammo_type'] = 0;
    $weapon['ammo_count'] = 0;
    $weapon['hit_rate'] = 0;
    $weapon['attack_type'] = 0;
    $weapon['min_range'] = 1;
    $weapon['max_range'] = 1;
    $weapon['stabilizer_weight'] = 0;
    $weapon['parry_rate'] = 0;
    $weapon['can_mount_head'] = 0;
    $weapon['can_mount_hand'] = 0;
    $weapon['can_mount_arm'] = 0;
    $weapon['can_mount_shoulder'] = 0;
    $weapon['can_mount_torso'] = 0;
    $weapon['can_mount_leg'] = 0;
    $weapon['description'] = '';

    return $weapon;
  }

  public function setWeaponAttributes(WeaponEditRequest $request)
  {
    $weapon = Weapon::where('id', $request->id)->firstOrFail();
    $weapon['weapon_name'] = $request->weapon_name;
    $weapon['user_id'] = $request->user_id;
    $weapon['power_impact'] = $request->power_impact;
    $weapon['power_penetrate'] = $request->power_penetrate;
    $weapon['power_heat'] = $request->power_heat;
    $weapon['ammo_type'] = $request->ammo_type;
    $weapon['ammo_count'] = $request->ammo_count;
    $weapon['hit_rate'] = $request->hit_rate;
    $weapon['attack_type'] = $request->attack_type;
    $weapon['min_range'] = $request->min_range;
    $weapon['max_range'] = $request->max_range;
    $weapon['stabilizer_weight'] = $request->stabilizer_weight;
    $weapon['parry_rate'] = $request->parry_rate;
    $weapon['can_mount_head'] = $request->can_mount_head;
    $weapon['can_mount_hand'] = $request->can_mount_hand;
    $weapon['can_mount_arm'] = $request->can_mount_arm;
    $weapon['can_mount_shoulder'] = $request->can_mount_shoulder;
    $weapon['can_mount_torso'] = $request->can_mount_torso;
    $weapon['can_mount_leg'] = $request->can_mount_leg;
    $weapon['description'] = $request->description;

    return $weapon;
  }

  public function attackTypeText(Weapon $weapon)
  {
      return $this::AttackTypeTable[$weapon['attack_type']];
  }


  public function ammoText(Weapon $weapon) : string
  {
      return ($weapon['ammo_type'] === 1) ? '無限' : ('有限：' . strval($weapon['ammo_count']));
  }

  public function baseWaight(
    int $min_range,
    int $max_range,
    int $attack_type,
    int $ammo_type,
    int $ammo_count,
    int $parry_rate
  ): int
  {
    $weight = WEAPON_BASE_WEIGHT + ($ammo_type == AMMO_TYPE_FINITE ? intdiv($ammo_count, 10) : WEIGHT_INFINITE_AMMO);
    if ($attack_type == ATTACK_TYPE_MEREE) {
        $weight += $max_range * 5 - $min_range * 3;
    } else if ($attack_type == ATTACK_TYPE_SHIELD) {
        $weight += intdiv($parry_rate , 10);
    } else {
        $weight += intdiv($max_range, 10);
    }
    return $weight;
  }

  public function failureRate(
    int $power_total,
    int $min_range,
    int $max_range,
    int $total_weight,
    int $hit_rate,
    int $parry_rate
  ) 
  {
    $rate = intval(((($power_total / 8.0 + 5.0) ** 2.0) / 2.0 + (($max_range / 10.0) ** 2.0) / 2.0
          + ((($max_range - $min_range) / 10.0) ** 2.0) / 2.0  - $total_weight) / 5.0
          + ((($hit_rate - 50.0) / 20.0) ** 3.0) / 2.0
          + (($parry_rate / 20.0) ** 2.0) / 2.0);
    if ($rate < 1) {
      $rate = 1;
    }
    return $rate; 
  }

  public function mountPointString($weapon) {
    $mount_pos = '';

    if ($weapon['can_mount_head'] === 1) {
        $mount_pos .= '頭';
    }
    if ($weapon['can_mount_hand'] === 1) {
        $mount_pos .= '手';
    }
    if ($weapon['can_mount_arm'] === 1) {
        $mount_pos .= '腕';
    }
    if ($weapon['can_mount_shoulder'] === 1) {
        $mount_pos .= '肩';
    }
    if ($weapon['can_mount_torso'] === 1) {
        $mount_pos .= '胴';
    }
    if ($weapon['can_mount_leg'] === 1) {
        $mount_pos .= '脚';
    }

    return $mount_pos;
  } 


}