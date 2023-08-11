import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ className, children}: PropsWithChildren<{className:string}>) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-blue-500">
            <div className={"mx-auto sm:max-w-md mt-6 px-6 py-4 bg-white overflow-hidden " + className}>
                <div className="flex justify-between -mx-6 -mt-4 px-5 mb-4 bg-blue-500">
                    <div>
                        <Link href="/" as="button" type="button"
                            className="border border-white text-white rounded shadow mx-1 px-2 mb-2">
                            トップ
                        </Link>
                    </div>
                    <div>
                        <span className="text-white font-4xl font-bold italic">Machine Duel</span>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
