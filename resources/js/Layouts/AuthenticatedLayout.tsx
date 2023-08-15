import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import HeaderLink from '@/Components/HeaderLink';
import HeaderPost from '@/Components/HeaderPost';
import { User } from '@/types';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Authenticated({user, header, className, children }: PropsWithChildren<{ user: User, header?: ReactNode, className?: string }>) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-blue-400 w-full">
            <div className={"mx-auto mt-6 px-6 py-4 bg-white overflow-hidden " + className}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="flex justify-between -mx-6 -mt-4 px-5 mb-4 bg-blue-400">
                    <div className="flex">
                        <HeaderLink href="/menu" disabled={false} >
                            メニュー
                        </HeaderLink>
                        <HeaderPost href="/logout" disabled={false} >
                            ログアウト
                        </HeaderPost>
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
