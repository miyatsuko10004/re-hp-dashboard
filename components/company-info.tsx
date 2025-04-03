import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RealEstateData } from "@/utils/csv-parser"

interface CompanyInfoProps {
  data: RealEstateData
}

export default function CompanyInfo({ data }: CompanyInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{data.商号}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">ホスト名:</span>
              <span>{data.host}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">会社番号:</span>
              <span>{data.会社番号}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">所在地:</span>
              <span>
                {data.都道府県} {data.市区町村}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">掲載物件数:</span>
              <span>{data.掲載物件数}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">公開物件数:</span>
              <span>{data.公開物件数}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">全反響数:</span>
              <span>{data.全反響数}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

