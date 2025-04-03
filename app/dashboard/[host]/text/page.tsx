import { fetchCompanyData } from "@/app/actions"
import TextChart from "@/components/charts/text-chart"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface TextPageProps {
  params: {
    host: string
  }
}

export default async function TextPage({ params }: TextPageProps) {
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
        <h1 className="text-3xl font-bold">{latestData.商号} - 文字数の推移</h1>
      </div>

      <TextChart data={companyData} months={months} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">文字数の詳細</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">月</th>
                <th className="text-right py-2">平均物件文字数</th>
                <th className="text-right py-2">セールスポイントの平均文字数</th>
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
                    <td className="text-right py-2">{monthData?.平均物件文字数 || 0}</td>
                    <td className="text-right py-2">{monthData?.セールスポイントの平均文字数 || 0}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">文字数関連指標（最新）</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">指標</th>
                <th className="text-right py-2">値</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">平均物件文字数</td>
                <td className="text-right py-2">{latestData.平均物件文字数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">セールスポイントの平均文字数</td>
                <td className="text-right py-2">{latestData.セールスポイントの平均文字数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">ポイント・特徴の平均文字数</td>
                <td className="text-right py-2">{latestData["ポイント・特徴の平均文字数"] || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">備考の平均文字数</td>
                <td className="text-right py-2">{latestData.備考の平均文字数 || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">担当者コメントの平均文字数</td>
                <td className="text-right py-2">{latestData.担当者コメントの平均文字数 || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

