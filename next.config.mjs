/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  // テスト用のポートを変更
  devIndicators: {
    buildActivity: false,
  },
  typescript: {
    // 一時的に型チェックを無効化
    ignoreBuildErrors: true,
  },
  env: {
    // CSVファイルを格納するディレクトリのパス
    CSV_DIRECTORY: process.env.CSV_DIRECTORY || './data',
    // サンプルデータを使用するかどうか
    NEXT_PUBLIC_USE_MOCK_API: process.env.NEXT_PUBLIC_USE_MOCK_API || 'false',
  },
}

export default nextConfig

