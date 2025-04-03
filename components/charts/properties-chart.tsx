"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { RealEstateData } from "@/utils/csv-parser"

interface PropertiesChartProps {
  data: RealEstateData[]
  months: string[]
}

export default function PropertiesChart({ data, months }: PropertiesChartProps) {
  // 月ごとのデータを集計
  const chartData = months.map((month) => {
    const monthData = data.find((d) => d.month === month)
    return {
      month,
      掲載物件数: monthData ? Number.parseInt(monthData.掲載物件数) || 0 : 0,
      公開物件数: monthData ? Number.parseInt(monthData.公開物件数) || 0 : 0,
    }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>物件数の推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            掲載物件数: {
              label: "掲載物件数",
              color: "hsl(var(--chart-1))",
            },
            公開物件数: {
              label: "公開物件数",
              color: "hsl(var(--chart-2))",
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
              <Line type="monotone" dataKey="掲載物件数" stroke="var(--color-掲載物件数)" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="公開物件数" stroke="var(--color-公開物件数)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

