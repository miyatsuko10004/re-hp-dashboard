import { fetchCompanyData } from "@/app/actions"
import CompanyInfo from "@/components/company-info"
import MetricsButtons from "@/components/metrics-buttons"
import { notFound } from "next/navigation"

interface DashboardPageProps {
  params: Promise<{
    host: string
  }> | {
    host: string
  }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  // paramsがPromiseの場合はawaitする、そうでなければそのまま使用
  const paramsData = params instanceof Promise ? await params : params
  const host = decodeURIComponent(paramsData.host)
  const { companyData, months } = await fetchCompanyData(host, "host")

  if (companyData.length === 0) {
    notFound()
  }

  // 最新のデータを取得
  const latestData = companyData[companyData.length - 1]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{latestData.商号} ダッシュボード</h1>

      <CompanyInfo data={latestData} />

      <MetricsButtons host={host} />

      <div className="mt-8">
        <p className="text-gray-500">上記のボタンをクリックして、各指標の詳細グラフを表示します。</p>
      </div>
    </div>
  )
}

