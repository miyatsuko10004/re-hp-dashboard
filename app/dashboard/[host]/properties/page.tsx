import { fetchCompanyData } from "@/app/actions"
import PropertiesChart from "@/components/charts/properties-chart"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PropertiesPageProps {
  params: Promise<{
    host: string
  }> | {
    host: string
  }
}

export default async function PropertiesPage({ params }: PropertiesPageProps) {
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
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/${encodeURIComponent(host)}`}>
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{latestData.商号} - 物件数の推移</h1>
      </div>

      <PropertiesChart data={companyData} months={months} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">物件数の詳細</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">月</th>
                <th className="text-right py-2">掲載物件数</th>
                <th className="text-right py-2">公開物件数</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month) => {
                const monthData = companyData.find((d) => d.month === month)
                return (
                  <tr key={month} className="border-b">
                    <td className="py-2">
                      {new Date(month).toLocaleDateString("ja-JP", { year: "numeric", month: "long" })}
                    </td>
                    <td className="text-right py-2">{monthData?.掲載物件数 || 0}</td>
                    <td className="text-right py-2">{monthData?.公開物件数 || 0}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">物件タイプの内訳（最新）</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">タイプ</th>
                <th className="text-right py-2">数</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">賃貸物件数</td>
                <td className="text-right py-2">{latestData.流通からの賃貸物件数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">売買物件数</td>
                <td className="text-right py-2">{latestData.流通からの売買物件数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">HP公開賃貸物件数</td>
                <td className="text-right py-2">{latestData["HP公開かつ流通からの賃貸物件数"] || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">HP公開売買物件数</td>
                <td className="text-right py-2">{latestData["HP公開かつ流通からの売買物件数"] || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

