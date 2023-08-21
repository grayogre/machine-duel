import { InputHTMLAttributes } from 'react';
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'

export default function NumberInput(
  { name, title, className='', form, ...props } : InputHTMLAttributes<HTMLInputElement> & {title: string, form: any}
) {
  return (
    <>
      <InputLabel htmlFor={name} value={title} />
      <TextInput
        {...props}
        id={name}
        name={name}
        type="number"
        className={"text-right w-24" + className}
        value={form.data[name as string]}
        onChange={(e) => form.setData(name, Number(e.target.value))}
        onBlur={() => form.validate(name)}
        required
      />
    </>    
  )
}