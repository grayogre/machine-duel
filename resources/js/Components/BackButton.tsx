import { ButtonHTMLAttributes } from 'react';
import PrimaryButton from '@/Components/PrimaryButton'

export default function BackButton ({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {

  const goBack = () => window.history.back();

  return (
    <PrimaryButton className={className} disabled={disabled} onClick={goBack} {...props}>
      {children}
    </PrimaryButton>
  )
}
