import { fetchAllData } from "./actions"
import SearchForm from "@/components/search-form"
import CSVUploader from "@/components/csv-uploader"
import { CsvFileList } from "@/components/csv-file-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Home() {
  const { companies } = await fetchAllData()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">不動産会社データ分析ダッシュボード</h1>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>会社を検索</CardTitle>
            <CardDescription>ホスト名、商号、会社番号で検索できます</CardDescription>
          </CardHeader>
          <CardContent>
            <SearchForm />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>登録会社数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{companies.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>データ更新日</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">{new Date().toLocaleDateString("ja-JP")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <CSVUploader />
      </div>

      <div className="mb-8">
        <CsvFileList />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>使い方</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>CSVファイルをアップロードするか、サンプルデータを使用</li>
            <li>会社を検索</li>
            <li>会社情報を確認</li>
            <li>分析したい項目のボタンをクリック</li>
            <li>グラフで推移を確認</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

