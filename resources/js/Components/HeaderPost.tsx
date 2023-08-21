import { ReactNode } from 'react'
import { Link } from '@inertiajs/react'

export default function HeaderPost({ href, className = '', disabled, children}: 
      { href: string, className?: string, disabled:boolean, children:ReactNode})
{
    return (
        <div>
          <Link href={href} method="post" as="button" type="button"
            className={`inline-flex items-center border border-white text-white rounded shadow mx-1 px-2 py-1 mb-2 font-semibold text-xs  hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition ease-in-out duration-150 ${
              disabled && 'opacity-25'
            } ` + className}
            disabled={disabled}
          >
              {children}
          </Link>
        </div>
    );
}
