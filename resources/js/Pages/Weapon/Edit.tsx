import { useState, useEffect, FormEventHandler } from 'react'
import { Head, router } from '@inertiajs/react'
import { Weapon } from '@/types/weapon.d'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import NumberInput from '@/Components/NumberInput'
import InputError from '@/Components/InputError'
import Select from '@/Components/Select'
import FixedField from '@/Components/FixedField'
import Checkbox from '@/Components/Checkbox'
import PrimaryButton from '@/Components/PrimaryButton'
import BackButton from '@/Components/BackButton'
import ConfirmModal from '@/Components/ConfirmModal'
import { toast } from 'react-toastify'
import { useForm } from 'laravel-precognition-react-inertia'
import axios from 'axios'

export default function WeaponEdit({weapon, auth}: PageProps<{weapon: Weapon}>) 
{
  const user = auth.user


  const form = useForm('post', route('weapon.store'), weapon)

  const [baseWeight, setBaseWeight] = useState(0)
  const [failureRate, setFailureRate] = useState(1)

  const [viewFlag, setViewFlag] = useState(false)
  const [result, setResult] = useState(false)

  useEffect(() => {
    axios.get(route('weapon.baseweight'),{
      params: {
        min_range: form.data.min_range,
        max_range: form.data.max_range,
        attack_type: form.data.attack_type,
        ammo_type: form.data.ammo_type,
        ammo_count: form.data.ammo_count,
        parry_rate: form.data.parry_rate,
      }
    })
      .then((res) => {
        setBaseWeight(res.data.base_weight)
      })
      .catch((err) => {
        console.log('axios error:', err)
      })
  },[form.data])

  useEffect(() => {
    axios.get(route('weapon.failurerate'), {
      params: {
        power_total: (form.data.power_impact + form.data.power_penetrate + form.data.power_heat),
        min_range: form.data.min_range,
        max_range: form.data.max_range,
        total_weight: (baseWeight + form.data.stabilizer_weight),
        hit_rate: form.data.hit_rate,
        parry_rate: form.data.parry_rate
      }
    })
      .then((res) => {
        setFailureRate(res.data.failure_rate)
      })
      .catch((err) => {
        console.log('axios error:', err)
      })
  }, [form.data, baseWeight])

  const setMountPosition = (field: string, checked:boolean) => {
    form.setData(field, checked ? 1 : 0)
  }

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    form.submit();
  };

  const deleteSuccess = () => {
    toast.success('武器データを削除しました。')
  }

  const deleteError = (errors:any) => {
    console.log('deleteError:', errors)
    toast.error(`Error:${errors.response.status}:${errors.response.statusText}`)
  }

  useEffect(() => {
    if (result) {
      deleteWeapon(weapon.id as number)
    } 
  }, [result])

  const deleteWeapon = (id:number) => {
    router.delete(route('weapon.delete',id), {
      onSuccess: deleteSuccess,
      onError: deleteError
    })
  }

  return (
    <AuthenticatedLayout user={user} className="w-96" >
      <Head>
        <title>武器エディタ</title>
      </Head>
      <form onSubmit={submit}>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="col-span-full">
            <InputLabel htmlFor="weaponName" value="武器名" />
            <TextInput
              id="weaponName"
              name="weaponName"
              value={form.data.weapon_name}
              className="mt-1 block w-full"
              isFocused={true}
              onChange={(e) => form.setData('weapon_name', e.target.value)}
              onBlur={() => form.validate('weapon_name')}
              required
            />
            {form.invalid('weapon_name') && <InputError message={form.errors.weapon_name} className="mt-2" />}
          </div>
          <div className="block col-auto">
            <NumberInput
              name="power_impact"
              title="威力；衝撃"
              form={form}
            />
          </div>
          <div className="block col-auto">
            <NumberInput
              name="power_penetrate"
              title="威力；貫通"
              form={form}
            />
          </div>
          <div className="block col-auto">
            <NumberInput
              name="power_heat"
              title="威力；熱"
              form={form}
            />
          </div>
          <div className="col-span-full">
            {form.invalid('power_impact') && <InputError message={form.errors.power_impact} className="mt-2" />}
            {form.invalid('power_penetrate') && <InputError message={form.errors.power_penetrate} className="mt-2" />}
            {form.invalid('power_heat') && <InputError message={form.errors.power_heat} className="mt-2" />}
          </div>
          <div className="block col-auto">
            <InputLabel htmlFor="attack_type" value="武器種別" />
            <Select id="attack_type" name="attack_type" value={form.data.attack_type}
              onChange={(e) => form.setData('attack_type', e.target.value)}
              onBlur={() => form.validate('attack_type')}
            >
              <option value="0">射撃</option>
              <option value="1">白兵</option>
              <option value="2">盾</option>
            </Select>
          </div>
          <div className="block col-auto">
            <InputLabel htmlFor="ammo_type" value="弾薬数" />
            <div className="flex flex-row">
              <Select id="ammo_type" name="ammo_type" value={form.data.ammo_type} className="mr-1"
                onChange={(e) => form.setData('ammo_type', e.target.value)}
                onBlur={() => form.validate('ammo_type')}
              >
                <option value="0">有限</option>
                <option value="1">無限</option>
              </Select>
              <TextInput
                id="ammo_count"
                name="ammo_count"
                type={Number(form.data.ammo_type) === 0 ? 'number' : 'hidden'}
                value={form.data.ammo_count}
                className="text-right w-24"
                onChange={(e) => form.setData('ammo_count', Number(e.target.value))}
                onBlur={() => form.validate('ammo_count')}
              />
            </div>
          </div>
          <div className="col-span-full">
            {form.invalid('attack_type') && <InputError message={form.errors.attack_type} className="mt-2" />}
            {form.invalid('ammo_type') && <InputError message={form.errors.ammo_type} className="mt-2" />}
            {form.invalid('ammo_count') && <InputError message={form.errors.ammo_count} className="mt-2" />}
          </div>
          <div className="col-span-full">
            <InputLabel htmlFor="min_range" value="攻撃範囲" />
            <div className="flex-inline" >
              <TextInput
                id="min_range"
                name="min_range"
                type="number"
                value={form.data.min_range}
                className="text-right w-24 mr-1"
                onChange={(e) => form.setData('min_range', Number(e.target.value))}
                onBlur={() => form.validate('min_range')}
              />
              ～
              <TextInput
                id="max_range"
                name="max_range"
                type="number"
                value={form.data.max_range}
                className="text-right w-24 ml-1"
                onChange={(e) => form.setData('max_range', Number(e.target.value))}
                onBlur={() => form.validate('max_range')}
              />
            </div>
            {form.invalid('min_range') && <InputError message={form.errors.min_range} className="mt-2" />}
            {form.invalid('max_range') && <InputError message={form.errors.max_range} className="mt-2" />}
          </div>
          <div className="block col-auto">
            <NumberInput
              name="hit_rate"
              title="命中率(%)"
              form={form}
            />
          </div>
          <div className="block col-auto">
            <NumberInput name="parry_rate" title="受け率(%)" form={form} />
          </div>
          <div className="block col-auto">
            <FixedField title="故障率(%)" value={failureRate} className="text-right" />
          </div>
          <div className="col-span-full">
            {form.invalid('hit_rate') && <InputError message={form.errors.hit_rate} className="mt-2" />}
            {form.invalid('parry_rate') && <InputError message={form.errors.parry_rate} className="mt-2" />}
          </div>
          <div className="block col-auto">
            <FixedField title="基礎重量" value={baseWeight} className="text-right" />
          </div>          
          <div className="block col-auto">
            <NumberInput
              name="stabilizer_weight"
              title="安定器重量"
              form={form}
            />
          </div>
          <div className="block col-auto">
            <FixedField title="総重量" value={baseWeight + form.data.stabilizer_weight} className="text-right" />
          </div>          
          <div className="col-span-full">
            {form.invalid('stabilizer_weight') && <InputError message={form.errors.stabilizer_weight} className="mt-2" />}
          </div>
          <div className="col-span-full">
            <h6 className="text-sm font-bold text-gray-700 mb-1">装備位置</h6>
          </div>
          <div className="block col-auto" >
            <label className="flex items-center">
              <Checkbox
                id="can_mount_head"
                name="can_mount_head"
                checked={form.data.can_mount_head}
                onChange={(e) => {setMountPosition('can_mount_head', e.target.checked)}}
              />
              <span className="ml-2 text-sm text-gray-600">頭装備</span>
            </label>
          </div>
          <div className="block col-auto" >
            <label className="flex items-center">
              <Checkbox
                id="can_mount_hand"
                name="can_mount_hand"
                checked={form.data.can_mount_hand}
                onChange={(e) => {setMountPosition('can_mount_hand', e.target.checked)}}
              />
              <span className="ml-2 text-sm text-gray-600">手装備</span>
            </label>
          </div>
          <div className="block col-auto" >
            <label className="flex items-center">
              <Checkbox
                id="can_mount_arm"
                name="can_mount_arm"
                checked={form.data.can_mount_arm}
                onChange={(e) => {setMountPosition('can_mount_arm', e.target.checked)}}
              />
              <span className="ml-2 text-sm text-gray-600">腕装備</span>
            </label>
          </div>
          <div className="block col-auto" >
            <label className="flex items-center">
              <Checkbox
                id="can_mount_shoulder"
                name="can_mount_shoulder"
                checked={form.data.can_mount_shoulder}
                onChange={(e) => {setMountPosition('can_mount_shoulder', e.target.checked)}}
              />
              <span className="ml-2 text-sm text-gray-600">肩装備</span>
            </label>
          </div>
          <div className="block col-auto" >
            <label className="flex items-center">
              <Checkbox
                id="can_mount_torso"
                name="can_mount_torso"
                checked={form.data.can_mount_torso}
                onChange={(e) => {setMountPosition('can_mount_torso', e.target.checked)}}
              />
              <span className="ml-2 text-sm text-gray-600">胴装備</span>
            </label>
          </div>
          <div className="block col-auto" >
            <label className="flex items-center">
              <Checkbox
                id="can_mount_leg"
                name="can_mount_leg"
                checked={form.data.can_mount_leg}
                onChange={(e) => {setMountPosition('can_mount_leg', e.target.checked)}}
              />
              <span className="ml-2 text-sm text-gray-600">脚装備</span>
            </label>
          </div>
          <div className="col-span-full">
            {form.invalid('can_mount_head') && <InputError message={form.errors.can_mount_head} className="mt-2" />}
            {form.invalid('can_mount_hand') && <InputError message={form.errors.can_mount_hand} className="mt-2" />}
            {form.invalid('can_mount_arm') && <InputError message={form.errors.can_mount_arm} className="mt-2" />}
            {form.invalid('can_mount_shoulder') && <InputError message={form.errors.can_mount_shoulder} className="mt-2" />}
            {form.invalid('can_mount_torso') && <InputError message={form.errors.can_mount_torso} className="mt-2" />}
            {form.invalid('can_mount_leg') && <InputError message={form.errors.can_mount_leg} className="mt-2" />}
          </div>
          <div className="col-span-full">
            <InputLabel htmlFor="description" value="解説" />
            <textarea
              id="description"
              name="description"
              className="col-span-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
              value={form.data.description}
              onChange={(e) => form.setData('description', e.target.value)}
              onBlur={() => form.validate('description')}
            ></textarea>
            {form.invalid('description') && <InputError message={form.errors.description} className="mt-2" />}
          </div>
          <div className="flex col-span-full">
            <PrimaryButton disabled={form.processing} type="submit" className="mr-1">
              登録
            </PrimaryButton>
            {weapon.id !== null && 
              <PrimaryButton disabled={form.process} type="button" className="mr-1" onClick={() => setViewFlag(true)}>
                削除
              </PrimaryButton>}
            <BackButton disabled={form.processing}>
              キャンセル
            </BackButton>
          </div>
       </div>
      </form>
      <ConfirmModal title="武器エディタ - Machine-duel" message="本当に削除しますか?" viewFlag={viewFlag} setViewFlag={setViewFlag} setResult={setResult} />
    </AuthenticatedLayout>
  )
}