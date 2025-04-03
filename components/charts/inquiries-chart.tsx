"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { RealEstateData } from "@/utils/csv-parser"

interface InquiriesChartProps {
  data: RealEstateData[]
  months: string[]
}

export default function InquiriesChart({ data, months }: InquiriesChartProps) {
  // 月ごとのデータを集計
  const chartData = months.map((month) => {
    const monthData = data.find((d) => d.month === month)
    return {
      month,
      PC反響数: monthData ? Number.parseInt(monthData.PC反響数) || 0 : 0,
      スマホ反響数: monthData ? Number.parseInt(monthData.スマホ反響数) || 0 : 0,
      全反響数: monthData ? Number.parseInt(monthData.全反響数) || 0 : 0,
      電話反響数: monthData ? Number.parseInt(monthData.先月の電話反響数) || 0 : 0,
    }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>反響数の推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            PC反響数: {
              label: "PC反響数",
              color: "hsl(var(--chart-1))",
            },
            スマホ反響数: {
              label: "スマホ反響数",
              color: "hsl(var(--chart-2))",
            },
            全反響数: {
              label: "全反響数",
              color: "hsl(var(--chart-3))",
            },
            電話反響数: {
              label: "電話反響数",
              color: "hsl(var(--chart-4))",
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
              <Line type="monotone" dataKey="PC反響数" stroke="var(--color-PC反響数)" />
              <Line type="monotone" dataKey="スマホ反響数" stroke="var(--color-スマホ反響数)" />
              <Line type="monotone" dataKey="全反響数" stroke="var(--color-全反響数)" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="電話反響数" stroke="var(--color-電話反響数)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

