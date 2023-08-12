import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia'

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const form = useForm('post', route('password.store'), {
        token: token,
        email: email,
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
            <Head title="パスワードリセット" />

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
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => form.setData('password', e.target.value)}
                        onBlur={() => form.validate('password')}
                    />

                    {form.invalid('password') && <InputError message={form.errors.password} className="mt-2" />}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="パスワード（確認用）" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={form.data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        onBlur={() => form.validate('password')}
                    />

                    {form.invalid('password_confirmation') && <InputError message={form.errors.password_confirmation} className="mt-2" />}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={form.processing}>
                        登録
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
