"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { RealEstateData } from "@/utils/csv-parser"

interface BlogsChartProps {
  data: RealEstateData[]
  months: string[]
}

export default function BlogsChart({ data, months }: BlogsChartProps) {
  // 月ごとのデータを集計
  const chartData = months.map((month) => {
    const monthData = data.find((d) => d.month === month)
    return {
      month,
      ブログ数: monthData ? Number.parseInt(monthData.ブログ数) || 0 : 0,
      先月のブログ数: monthData ? Number.parseInt(monthData.先月のブログ数) || 0 : 0,
      ブログ合計文字数: monthData ? Number.parseInt(monthData.ブログ合計文字数) || 0 : 0,
    }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ブログの推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ブログ数: {
              label: "ブログ数",
              color: "hsl(var(--chart-1))",
            },
            先月のブログ数: {
              label: "先月のブログ数",
              color: "hsl(var(--chart-2))",
            },
            ブログ合計文字数: {
              label: "ブログ合計文字数",
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
                dataKey="ブログ数"
                stroke="var(--color-ブログ数)"
                activeDot={{ r: 8 }}
              />
              <Line yAxisId="left" type="monotone" dataKey="先月のブログ数" stroke="var(--color-先月のブログ数)" />
              <Line yAxisId="right" type="monotone" dataKey="ブログ合計文字数" stroke="var(--color-ブログ合計文字数)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

