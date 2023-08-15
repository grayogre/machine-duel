import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Menu({ auth }: PageProps) {
  return (
    <>
      <Head>
        <title>メニュー</title>
      </Head>
      <div>
        <ol>
           <li><Link href={route('weapon.summary')}>武器エディタ</Link></li>
        </ol>
      </div>
    </>
  )
}