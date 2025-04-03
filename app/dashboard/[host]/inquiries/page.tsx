import { fetchCompanyData } from "@/app/actions"
import InquiriesChart from "@/components/charts/inquiries-chart"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface InquiriesPageProps {
  params: {
    host: string
  }
}

export default async function InquiriesPage({ params }: InquiriesPageProps) {
  const host = decodeURIComponent(params.host)
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
        <h1 className="text-3xl font-bold">{latestData.商号} - 反響数の推移</h1>
      </div>

      <InquiriesChart data={companyData} months={months} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">反響数の詳細</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">月</th>
                <th className="text-right py-2">PC反響数</th>
                <th className="text-right py-2">スマホ反響数</th>
                <th className="text-right py-2">全反響数</th>
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
                    <td className="text-right py-2">{monthData?.PC反響数 || 0}</td>
                    <td className="text-right py-2">{monthData?.スマホ反響数 || 0}</td>
                    <td className="text-right py-2">{monthData?.全反響数 || 0}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">反響タイプの内訳（最新）</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">タイプ</th>
                <th className="text-right py-2">数</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">PC反響数</td>
                <td className="text-right py-2">{latestData.PC反響数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">PCガチ反響数</td>
                <td className="text-right py-2">{latestData.PCガチ反響数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">スマホ反響数</td>
                <td className="text-right py-2">{latestData.スマホ反響数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">スマホガチ反響数</td>
                <td className="text-right py-2">{latestData.スマホガチ反響数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">電話反響数</td>
                <td className="text-right py-2">{latestData.先月の電話反響数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">LINE反響数</td>
                <td className="text-right py-2">{latestData.LINE反響数 || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

