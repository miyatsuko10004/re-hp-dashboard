"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { RealEstateData } from "@/utils/csv-parser"

interface ImagesChartProps {
  data: RealEstateData[]
  months: string[]
}

export default function ImagesChart({ data, months }: ImagesChartProps) {
  // 月ごとのデータを集計
  const chartData = months.map((month) => {
    const monthData = data.find((d) => d.month === month)
    return {
      month,
      平均画像枚数: monthData ? Number.parseFloat(monthData.平均画像枚数) || 0 : 0,
      スポット合計画像枚数: monthData ? Number.parseInt(monthData.スポット合計画像枚数) || 0 : 0,
      ブログ合計画像枚数: monthData ? Number.parseInt(monthData.ブログ合計画像枚数) || 0 : 0,
    }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>画像数の推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            平均画像枚数: {
              label: "平均画像枚数",
              color: "hsl(var(--chart-1))",
            },
            スポット合計画像枚数: {
              label: "スポット合計画像枚数",
              color: "hsl(var(--chart-2))",
            },
            ブログ合計画像枚数: {
              label: "ブログ合計画像枚数",
              color: "hsl(var(--chart-3))",
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
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="平均画像枚数"
                stroke="var(--color-平均画像枚数)"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="スポット合計画像枚数"
                stroke="var(--color-スポット合計画像枚数)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="ブログ合計画像枚数"
                stroke="var(--color-ブログ合計画像枚数)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

