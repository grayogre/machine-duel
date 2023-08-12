import { useState, useEffect, FormEventHandler, ChangeEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';

export default function Register() {
    const form = useForm('post', route('register'), {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            form.reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.submit();
    };

    return (
        <GuestLayout className="w-96">
            <Head title="プレイヤー登録" />
            <h1 className="text-xl text-bold mb-4">プレイヤー登録</h1>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="ニックネーム" />

                    <TextInput
                        id="name"
                        name="name"
                        value={form.data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => form.setData('name', e.target.value)}
                        onBlur={() => form.validate('name')}
                        required
                    />

                    {form.invalid('name') && <InputError message={form.errors.name} className="mt-2" />}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={form.data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => form.setData('email', e.target.value)}
                        onBlur={() => form.validate('email')}
                        required
                    />

                    {form.invalid('email') && <InputError message={form.errors.email} className="mt-2" />}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={form.data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => form.setData('password', e.target.value)}
                        onBlur={() => form.validate('password')}
                        required
                    />

                    {form.invalid('password') && <InputError message={form.errors.password} className="mt-2" />}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="パスワード（確認用）" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={form.data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        onBlur={() => form.validate('password')}
                        required
                    />

                    {form.invalid('password_confirmation') && <InputError message={form.errors.password_confirmation} className="mt-2" />}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        登録済みですか？
                    </Link>

                    <PrimaryButton className="ml-4" disabled={form.processing}>
                        登録
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
