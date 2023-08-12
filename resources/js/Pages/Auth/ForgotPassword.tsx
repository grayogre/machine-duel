import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const form = useForm('post',route('password.email'),{
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.submit();
    };

    return (
        <GuestLayout className="w-96">
            <Head title="パスワード再設定" />

            <div className="mb-4 text-sm text-gray-600">
                メールアドレスを入力して、送信ボタンを押してください。<br />
                パスワードリセット用のメールが送信されます。
            </div>

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
                        isFocused={true}
                        onChange={(e) => form.setData('email', e.target.value)}
                        onBlur={() => form.validate('email')}
                    />

                    {form.invalid('email') && <InputError message={form.errors.email} className="mt-2" />}
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={form.processing}>
                        メール送信
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
