---
title: Getting Started
description: フルスタックアプリケーションをJavascriptで1秒で作ってみましょう
---

> 📌 こちらのチュートリアルビデオ[Youtube Channel](https://www.youtube.com/watch?v=l23z00GEar8&list=PL5ylYELQy1hyFbguVaShp3XujjdVXLpId)から学べます。

フルスタックjavascriptアプリケーションを`npx`を使って、数秒で最新のテンプレートからプロジェクトファイルを生成する事が出来ます。

> 🔥開発者モードでは、バージョン*12.12.0*以上の[node.js](https://nodejs.org)を使用してください。

> ⚠ もし、ディレクトリにスペースが含まれていて、Windowsを使用していて、`npx`がエラーになる場合は、[既知のnpxのバグ](#the-known-npx-bug)について読んでください。

`project-name`をプロジェクト名に置き換えて、以下のコマンドを実行すると、プロジェクトが開始されます：

```sh
npx create-nullstack-app project-name
```

生成されたフォルダーにディレクトリを変更します：

```sh
cd project-name
```

依存関係のあるものをインストールします：

```sh
npm install
```

アプリケーションを開発モードで起動します：

```sh
npm start
```

## 生成されたファイルについて

以下のようなフォルダとファイルが生成されます：

### index.js

これは、[Webpack](https://webpack.js.org)のエントリーポイントです。

通常、このファイルを使用する必要はありませんが、CSSフレームワークのようなグローバルな依存関係をインポートするには便利です。

### src/

このフォルダには、アプリケーションの実際のソースコードが格納されます。

### src/Application.njs

アプリケーションのメインファイルです。

>✨ njs file extensionについては、[こちら](/njs-file-extension "Nullstack Javascript")をご覧ください。

`start`を実行すると、自動的に`npm start`を実行します。それらをつかってサーバーの[コンテキスト](/context)に[データベース](/how-to-use-mongodb-with-nullstack)を入力したり、[セッティング](/context-settings)や[シークレット](/context-secrets)など使用できます。

>✨ アプリケーション起動については、[こちら](/application-startup)をご覧ください。

### src/Application.scss

このファイルは、[NullstackによるSCSS](/styles)を使えることを示すためだけの空のファイルです。

スタイルファイルは、同じ名前のコンポーネントでインポートするのがよいでしょう。

>✨ スタイルについての詳細は[こちら](/styles)から。

### public/

ここにあるすべてのファイルは、ドメインルートから誰でも利用できるようになります。

デフォルトでは、`create-nullstack-app`は、**manifest.json**に必要なアイコンと、OGのmetaタグ用の画像を生成します。

>✨ manifest.jsonについては[こちら](/context-project)をご覧ください。

これらの画像は、必ずプロジェクトのIDに置き換えてください。

### .development/

このフォルダーは、開発モードのアプリケーションのコンパイル結果です。

> 🔥 このフォルダーには触れないでください。

### .production/

このフォルダーは、プロダクション・モードのアプリケーションのコンパイル結果です。

> 🔥 このフォルダーには触れないでください。

>✨ Nullstackアプリケーションのデプロイ方法については、[こちら](/how-to-deploy-a-nullstack-application)をご覧ください。

## 既知のnpxバグ

キャッシュフォルダへのパスにスペースが含まれている場合、解決しようとするとエラーが発生することがあります。`npx` イシューで[100](https://github.com/zkat/npx/issues/100)や、[110](https://github.com/zkat/npx/issues/110)、[143](https://github.com/zkat/npx/issues/146)など報告されています。

もし、このようなことが起こった場合、以下のプロセスを実行してみてください:

- 通常の `npm` と同様にダウンロードして使用する：
  ```sh
  npm i -g create-nullstack-app
  create-nullstack-app project-name
  ```

- または、[ここ](https://github.com/zkat/npx/issues/146#issuecomment-384016791)や[こちら](https://github.com/zkat/npx/issues/146#issuecomment-384019497)に記載されているように、キャッシュフォルダのディレクトリを変更してください。

  - スペースの使用を維持したい場合は、`FirstName`をパスで使用されているものに置き換えて実行してください：
  ```sh
  npm config set cache "C:\Users\FirstName~1\AppData\Roaming\npm-cache" --global
  ```

  - または、スペースを除いた別のパスを使用してください：
  ```sh
  npm config set cache C:\tmp\nodejs\npm-cache --global
  ```

## Next step

⚔ 次のステップでは[レンダリング可能なコンポーネント](/renderable-components)を作成してみましょう。