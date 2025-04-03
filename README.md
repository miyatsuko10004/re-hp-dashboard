# RE-HP Dashboard

RE-HP Dashboardは、Webサイトのパフォーマンスデータを可視化し分析するためのReactベースのダッシュボードアプリケーションです。CSVファイルからデータをインポートし、インタラクティブなチャートと表でデータを表示します。

![Dashboard Screenshot]()

## 主な機能

- **データインポート**: CSVファイルからのデータ読み込みと解析
- **インタラクティブなチャート**: 各種メトリクスを視覚的に表示
- **レスポンシブデザイン**: モバイルからデスクトップまで対応
- **ダークモード対応**: ユーザー体験向上のための明暗切り替え
- **フィルタリング機能**: 日付やカテゴリによるデータフィルタリング
- **ホスト別データ管理**: 複数サイトのデータを一括管理

## 技術スタック

- **フレームワーク**: Next.js (React)
- **スタイリング**: Tailwind CSS
- **チャート**: Recharts
- **状態管理**: React Hooks
- **データ処理**: CSVパーサー
- **UI/UXライブラリ**: shadcn/ui

## 利用方法

以下のコマンドで開発サーバーを起動します:

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを表示します。

## データのインポート

1. ホーム画面からCSVファイルをアップロードします
2. データが自動的に解析され、ダッシュボードに表示されます
3. 各メトリクスタブを切り替えて異なるデータセットを表示できます

## プロジェクト構成

- `/app` - Next.jsのページとルーティング
- `/components` - 再利用可能なUIコンポーネント
- `/lib` - ユーティリティ関数
- `/utils` - データ処理ロジック
- `/public` - 静的アセット

## ライセンス

MIT

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
