import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { WeaponDetail } from '@/types/weapon.d'
import { PageProps } from '@/types'
import { Head, Link } from '@inertiajs/react'
import FixedField from '@/Components/FixedField'
import FixedFieldFull from '@/Components/FixedFieldFull'
import BackButton from '@/Components/BackButton'

export default function WeaponView({weapon, auth}: PageProps<{weapon: WeaponDetail}>)
{
  const user = auth.user

  return (
    <AuthenticatedLayout user={user} className="w-96" >
      <Head>
        <title>武器詳細</title>
      </Head>
      <div className="grid grid-cols-3 gap-3 mt-2">
        <FixedFieldFull title="武器名" value={weapon.weapon_name} className="text-left" />
        <FixedFieldFull title="登録者" value={weapon.register} className="text-left" />
        <FixedField title="威力：衝撃" value={weapon.power_impact} className="text-right" />
        <FixedField title="威力：貫通" value={weapon.power_penetrate} className="text-right" />
        <FixedField title="威力：熱" value={weapon.power_heat} className="text-right" />
        <FixedField title="種別" value={weapon.attack_text} className="text-center" />
        <FixedField title="弾薬数" value={weapon.ammo_text} className="text-center" />
        <FixedField title="攻撃距離" value={weapon.range_text}  className="text-center" />
        <FixedField title="命中率" value={String(weapon.hit_rate) + '%'} className="text-right" />
        <FixedField title="受け率" value={String(weapon.parry_rate) + '%'} className="text-right" />
        <FixedField title="故障率" value={String(weapon.failure_rate) + '%'} className="text-right" />
        <FixedField title="基礎重量" value={weapon.base_waight} className="text-right" />
        <FixedField title="安定器重量" value={weapon.stabilizer_weight} className="text-right" />
        <FixedField title="総重量" value={weapon.total_waight} className="text-right" />
        <FixedFieldFull title="装備箇所" value={weapon.mount_points} className="text-center" />
        <FixedFieldFull title="説明" value={weapon.description} className="text-left" />
      </div>
      <div className="mt-3 w-full">
        <BackButton>戻る</BackButton>
      </div>
    </AuthenticatedLayout>
  )

}