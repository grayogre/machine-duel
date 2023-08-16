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