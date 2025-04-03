"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { RealEstateData } from "@/utils/csv-parser"

interface TextChartProps {
  data: RealEstateData[]
  months: string[]
}

export default function TextChart({ data, months }: TextChartProps) {
  // 月ごとのデータを集計
  const chartData = months.map((month) => {
    const monthData = data.find((d) => d.month === month)
    return {
      month,
      平均物件文字数: monthData ? Number.parseFloat(monthData.平均物件文字数) || 0 : 0,
      セールスポイントの平均文字数: monthData ? Number.parseFloat(monthData.セールスポイントの平均文字数) || 0 : 0,
      ポイント特徴の平均文字数: monthData ? Number.parseFloat(monthData["ポイント・特徴の平均文字数"]) || 0 : 0,
      備考の平均文字数: monthData ? Number.parseFloat(monthData.備考の平均文字数) || 0 : 0,
      担当者コメントの平均文字数: monthData ? Number.parseFloat(monthData.担当者コメントの平均文字数) || 0 : 0,
    }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>文字数の推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            平均物件文字数: {
              label: "平均物件文字数",
              color: "hsl(var(--chart-1))",
            },
            セールスポイントの平均文字数: {
              label: "セールスポイントの平均文字数",
              color: "hsl(var(--chart-2))",
            },
            ポイント特徴の平均文字数: {
              label: "ポイント・特徴の平均文字数",
              color: "hsl(var(--chart-3))",
            },
            備考の平均文字数: {
              label: "備考の平均文字数",
              color: "hsl(var(--chart-4))",
            },
            担当者コメントの平均文字数: {
              label: "担当者コメントの平均文字数",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getFullYear()}年${date.getMonth() + 1}月`
                }}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="平均物件文字数"
                stroke="var(--color-平均物件文字数)"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="セールスポイントの平均文字数"
                stroke="var(--color-セールスポイントの平均文字数)"
              />
              <Line type="monotone" dataKey="ポイント特徴の平均文字数" stroke="var(--color-ポイント特徴の平均文字数)" />
              <Line type="monotone" dataKey="備考の平均文字数" stroke="var(--color-備考の平均文字数)" />
              <Line
                type="monotone"
                dataKey="担当者コメントの平均文字数"
                stroke="var(--color-担当者コメントの平均文字数)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

