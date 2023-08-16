import React, { useEffect } from 'react'
import Checkbox from '@/Components/Checkbox'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Select from '@/Components/Select'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import WeaponList from '@/Components/WeaponList'
import { Head, useForm } from '@inertiajs/react'
import { WeaponSummary } from '@/types/weapon.d'
import { PageProps } from '@/types'

export default function WeaponSummaries({list, auth}: PageProps<{list:WeaponSummary[]}>)
{
  const user = auth.user
  const { data, setData, get, errors, hasErrors } = useForm({
    namePart: '',
    attackType: '-1',
    myWeapon: '0',
    headMountable: '1',
    handMountable: '1',
    armMountable: '1',
    shoulderMountable: '1',
    torsoMountable: '1', 
    legMountable: '1',
  })

  const url = route('weapon.summary')
  const onChangeNamePart = (e:React.ChangeEvent<HTMLInputElement>) => {
    setData('namePart', e.target.value)
  }

  const onChangeAttackType = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setData('attackType', e.target.value)
  }

  const onChangeChecked = (e:React.ChangeEvent<HTMLInputElement>, inputName: keyof typeof data) => {
    setData(inputName, e.target.checked ? '1' : '0');
  } 

  useEffect(() => {
    get(url, {
      replace: true,
      preserveState: true,
      preserveScroll: true,
    })
  },[data])

  return (
    <AuthenticatedLayout user={user} className="w-full lg:w-10/12" >
      <Head>
        <title>武器リスト</title>
      </Head>
      <form>
        <fieldset className="flex md:flex-row flex-col justify-start border border-solid border-black px-3 py-1">
          <legend>絞り込み条件</legend>
          <div>
            <InputLabel htmlFor="namePart" value="武器名(部分一致)" />
            <TextInput
              id="namePart"
              name="namePart"
              value={data.namePart}
              className="mt-1 mr-2 block"
              isFocused={true}
              onChange={onChangeNamePart}
            />
          </div>
          <div>
            <InputLabel htmlFor="attackType" value="種別" />
            <Select
              id="attackType"
              name="attackType"
              value={data.attackType}
              className="mt-1 block"
              onChange={onChangeAttackType}
            >
              <option value="-1">(未指定)</option>
              <option value="0">射撃</option>
              <option value="1">白兵</option>
              <option value="2">盾</option>
            </Select>
          </div>
          <div className="ml-5 mt-6">
            <label className="flex items-center">
              <Checkbox
                    name="myWeapon"
                    checked={data.myWeapon === '1' ? true : false}
                    onChange={(e) => onChangeChecked(e, 'myWeapon')}
                />
                <span className="ml-2 text-sm text-gray-600">自分で登録</span>
            </label>
          </div>
          <div className="ml-5 mt-6">
            <label className="flex items-center">
              <Checkbox
                    name="headMountable"
                    checked={data.headMountable === '1' ? true : false}
                    onChange={(e) => onChangeChecked(e, 'headMountable')}
                />
                <span className="ml-2 text-sm text-gray-600">頭装備</span>
            </label>
          </div>
          <div className="ml-5 mt-6">
            <label className="flex items-center">
              <Checkbox
                    name="handMountable"
                    checked={data.handMountable === '1' ? true : false}
                    onChange={(e) => onChangeChecked(e, 'handMountable')}
                />
                <span className="ml-2 text-sm text-gray-600">手装備</span>
            </label>
          </div>
          <div className="ml-5 mt-6">
            <label className="flex items-center">
              <Checkbox
                    name="armMountable"
                    checked={data.armMountable === '1' ? true : false}
                    onChange={(e) => onChangeChecked(e, 'armMountable')}
                />
                <span className="ml-2 text-sm text-gray-600">腕装備</span>
            </label>
          </div>
          <div className="ml-5 mt-6">
            <label className="flex items-center">
              <Checkbox
                    name="shoulderMountable"
                    checked={data.shoulderMountable === '1' ? true : false}
                    onChange={(e) => onChangeChecked(e, 'shoulderMountable')}
                />
                <span className="ml-2 text-sm text-gray-600">肩装備</span>
            </label>
          </div>
          <div className="ml-5 mt-6">
            <label className="flex items-center">
              <Checkbox
                    name="torsoMountable"
                    checked={data.torsoMountable === '1' ? true : false}
                    onChange={(e) => onChangeChecked(e, 'torsoMountable')}
                />
                <span className="ml-2 text-sm text-gray-600">胴装備</span>
            </label>
          </div>
          <div className="ml-5 mt-6">
            <label className="flex items-center">
              <Checkbox
                    name="legMountable"
                    checked={data.legMountable === '1' ? true : false}
                    onChange={(e) => onChangeChecked(e, 'legMountable')}
                />
                <span className="ml-2 text-sm text-gray-600">脚装備</span>
            </label>
          </div>
        </fieldset>
      </form>
      <WeaponList list={list} />
    </AuthenticatedLayout>
  )
}