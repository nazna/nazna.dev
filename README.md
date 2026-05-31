# nazna.dev

> nazna's websit

## Rules

- ファイル名を created_at として扱い不変とする
- 画像は代替テキストの箇所にサイズと loading 属性を設定する
- 引用は最後の行に by と cite を指定する

## Todos

- レンダリング対象ページに 404 を追加する
- LinkNode で別タブで開くかどうかの判定を追加する
- canonical に設定すべき値や og:description が必要かを[OpenGraph](https://ogp.me/)で調べる
- `vite dev` で開発サーバーの起動に対応したい
- RSS を Vite プラグインじゃなくて xml をレンダリングする pages として扱いたい
- ビルド対象ページが増えてきたら mtime をみてキャッシュしたい
- preact-render-to-string は閉じタグにスラッシュが入ってしまうので Async Component 対応の JSX を実装する
- [Cloudflare Web Analytics](https://www.cloudflare.com/ja-jp/web-analytics/)を導入する
- [OpenSearch](https://developer.mozilla.org/ja/docs/Web/OpenSearch)に対応する
- [vercel/satori](https://github.com/vercel/satori)を検証する
- [Standard.site](https://standard.site/)に対応する

## Notes

- updated_at を mtime を使うようにすると git clone とかで更新されてしまう
- Shiki の pre 要素の親に div 要素が発生するのを消したい
- Shiki の pre 要素直下の code 要素に class 属性で言語を指定できていない `class=language-typescript` のようにしたい
- `extractDescription()` や `extractRelativeLinks()` にバグがあるかもしれない

## References

- [react-markdown をやめて remark から自力でレンダリングするようにした話](https://blog.stin.ink/articles/replace-react-markdown-with-remark)
- [JSX をテンプレートエンジンとして使い、Vite でビルドする](https://blog.sasakiy84.net/articles/jsx-as-a-template-with-vite/)
- [画像を囲うボーダーの色を半透明にしてコンテンツに馴染みやすくする](https://yuheiy.com/blog/2026/semi-transparent-image-borders)
