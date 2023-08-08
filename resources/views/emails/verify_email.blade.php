<x-mail::message>
# ご登録ありがとうございます。

この度は「{{ config('app.name') }}」にご登録いただき、ありがとうございます。<br>
メールアドレス確認のため、以下のボタンをクリックしてください。

<x-mail::button :url=$verify_url>
メールアドレスを確認
</x-mail::button>

アカウントの作成にお心当たりが無い場合は、このメールを無視してください。<br>
<br>
よろしくお願いします。<br>
{{ config('app.name') }}運営
<hr>
\"メールアドレスを確認\" ボタンが機能しない場合は, 次のURLをコピーしてWebブラウザに貼り付けてください。<br>
{{ $verify_url }}
</x-mail::message>
