<x-mail::message>
ボタンを押して、パスワードリセットの手続きを行ってください。

<x-mail::button :url=$reset_url>
パスワードリセット
</x-mail::button>

もしこのメールにお心当たりが無い場合は、無視してください。<br>
<br>
よろしくお願いします。<br>
{{ config('app.name') }}運営
<hr>
「パスワードリセット」ボタンが機能しない場合は, 次のURLをコピーしてWebブラウザに貼り付けてください。<br>
{{ $reset_url }}
</x-mail::message>
