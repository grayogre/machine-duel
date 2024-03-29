export type WeaponSummary = {
  id: number,
  weapon_name: string,
  register: string,
  myWeapon: boolean,
  attack_type: string,
  power_total: number,
  ammo_type: string,
  atacck_range: string,
  total_waight:number,
  hit_rate: number,
  parry_rate: number,
  failure_rate:number,
  mount_position: string
}

export type WeaponDetail = {
  id: number,
  weapon_name: string,
  user_id: number,
  register: string,
  power_impact: number, 
  power_penetrate: number,
  power_heat: number,
  ammo_text:string,
  hit_rate: number,
  attack_text: string,
  range_text: string,
  base_waight: number,
  stabilizer_weight: number,
  total_waight: number,
  parry_rate: number,
  failure_rate: number,
  mount_points: string,
  description: string
}

type Weapon = {
  id: number | null,
  weapon_name: string,
  user_id: number,
  power_impact: number,
  power_penetrate: number,
  power_heat: number,
  ammo_type: number,
  ammo_count:number,
  hit_rate: number,
  attack_type: number,
  min_range: number,
  max_range: number,
  stabilizer_weight: number,
  parry_rate: number,
  can_mount_head: number,
  can_mount_hand: number,
  can_mount_arm: number,
  can_mount_shoulder: number,
  can_mount_torso: number,
  can_mount_leg: number,
  description: string
}