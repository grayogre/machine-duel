import { Link, router} from '@inertiajs/react'
import { ButtonHTMLAttributes } from 'react'
import { Method } from '@inertiajs/core'

export default function PrimaryButtonLink({url, method='get', className='', disabled, children, ...props}: {url: string, method?: Method} & ButtonHTMLAttributes<HTMLButtonElement>) {

  return (
    <Link href={url} method={method} as='button' type='button'
    className={
      `inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
      } ` + className
    }
    disabled={disabled}
  >
    {children}
  </Link>

  )
}