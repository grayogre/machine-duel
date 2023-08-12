import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const form = useForm('post', route('login'), {
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            form.reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.submit();
    };

    return (
        <GuestLayout className="w-96">
            <Head title="ログイン" />
            <h1 className="text-xl text-bold mb-4">ログイン</h1>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={form.data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => form.setData('email', e.target.value)}
                        onBlur={() => form.validate('email')}
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
                        autoComplete="current-password"
                        onChange={(e) => form.setData('password', e.target.value)}
                        onBlur={() => form.validate('password')}
                    />

                    {form.invalid('password') && <InputError message={form.errors.password} className="mt-2" />}
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={form.data.remember}
                            onChange={(e) => form.setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">ログイン状態を保持する</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            パスワードを忘れた方はこちら
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={form.processing}>
                        ログイン
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
