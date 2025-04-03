import { fetchCompanyData } from "@/app/actions"
import ImagesChart from "@/components/charts/images-chart"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ImagesPageProps {
  params: {
    host: string
  }
}

export default async function ImagesPage({ params }: ImagesPageProps) {
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
        <h1 className="text-3xl font-bold">{latestData.商号} - 画像数の推移</h1>
      </div>

      <ImagesChart data={companyData} months={months} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">画像数の詳細</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">月</th>
                <th className="text-right py-2">平均画像枚数</th>
                <th className="text-right py-2">スポット合計画像枚数</th>
                <th className="text-right py-2">ブログ合計画像枚数</th>
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
                    <td className="text-right py-2">{monthData?.平均画像枚数 || 0}</td>
                    <td className="text-right py-2">{monthData?.スポット合計画像枚数 || 0}</td>
                    <td className="text-right py-2">{monthData?.ブログ合計画像枚数 || 0}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">画像関連指標（最新）</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">指標</th>
                <th className="text-right py-2">値</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">平均画像枚数</td>
                <td className="text-right py-2">{latestData.平均画像枚数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">スポット合計画像枚数</td>
                <td className="text-right py-2">{latestData.スポット合計画像枚数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">ブログ合計画像枚数</td>
                <td className="text-right py-2">{latestData.ブログ合計画像枚数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">スポット数</td>
                <td className="text-right py-2">{latestData.スポット数 || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

