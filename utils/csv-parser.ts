import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

export type RealEstateData = {
  host: string
  契約: string
  会社番号: string
  商号: string
  都道府県: string
  市区町村: string
  掲載物件数: string
  公開物件数: string
  先月の電話反響数: string
  PC反響数: string
  PCガチ反響数: string
  スマホ反響数: string
  スマホガチ反響数: string
  PC会員登録数: string
  スマホ会員登録数: string
  全反響数: string
  全ガチ反響数: string
  LINEバナー設定: string
  LINE反響数: string
  ブログ数: string
  平均物件文字数: string
  セールスポイントの平均文字数: string
  ポイント・特徴の平均文字数: string
  備考の平均文字数: string
  担当者コメントの平均文字数: string
  成約物件用コメントの平均文字数: string
  成約物件用備考の平均文字数: string
  平均画像枚数: string
  日付: string
  [key: string]: string
}

// CSVファイルを読み込んで解析する関数
async function parseCSVFile(filePath: string): Promise<RealEstateData[]> {
  try {
    const fileContent = await fs.promises.readFile(filePath, { encoding: "utf8" })
    // CSV-parseの設定。skip_empty_lines: trueを追加
    const records: RealEstateData[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
      trim: true,
    })
    return records
  } catch (error) {
    console.error(`CSVファイルの解析エラー (${filePath}):`, error)
    return []
  }
}

// ディレクトリが存在しない場合のエラーハンドリングを改善
export async function getCSVFiles(directory: string): Promise<string[]> {
  try {
    // ディレクトリが存在するか確認
    try {
      await fs.promises.access(directory, fs.constants.F_OK)
    } catch (error) {
      // ディレクトリが存在しない場合は作成
      await fs.promises.mkdir(directory, { recursive: true })
      console.log(`ディレクトリを作成しました: ${directory}`)
    }

    const files = await fs.promises.readdir(directory)
    return files.filter((file) => file.endsWith(".csv"))
  } catch (error) {
    console.error("ディレクトリの読み込みエラー:", error)
    return []
  }
}

// サンプルデータを提供する関数を追加
export function getSampleData(): RealEstateData[] {
  return [
    {
      host: "example-estate.jp",
      契約: "1",
      会社番号: "10001",
      商号: "サンプル不動産株式会社",
      都道府県: "東京都",
      市区町村: "新宿区",
      掲載物件数: "250",
      公開物件数: "120",
      先月の電話反響数: "15",
      PC反響数: "25",
      PCガチ反響数: "20",
      スマホ反響数: "45",
      スマホガチ反響数: "35",
      PC会員登録数: "10",
      スマホ会員登録数: "20",
      全反響数: "70",
      全ガチ反響数: "55",
      LINEバナー設定: "1",
      LINE反響数: "10",
      ブログ数: "15",
      平均物件文字数: "450.5",
      セールスポイントの平均文字数: "120.3",
      ポイント・特徴の平均文字数: "80.2",
      備考の平均文字数: "95.7",
      担当者コメントの平均文字数: "110.5",
      成約物件用コメントの平均文字数: "130.8",
      成約物件用備考の平均文字数: "85.4",
      平均画像枚数: "12.5",
      日付: "2025-04-01",
      month: "2025-04",
    },
    {
      host: "example-estate.jp",
      契約: "1",
      会社番号: "10001",
      商号: "サンプル不動産株式会社",
      都道府県: "東京都",
      市区町村: "新宿区",
      掲載物件数: "270",
      公開物件数: "135",
      先月の電話反響数: "18",
      PC反響数: "28",
      PCガチ反響数: "22",
      スマホ反響数: "50",
      スマホガチ反響数: "40",
      PC会員登録数: "12",
      スマホ会員登録数: "25",
      全反響数: "78",
      全ガチ反響数: "62",
      LINEバナー設定: "1",
      LINE反響数: "12",
      ブログ数: "18",
      平均物件文字数: "460.2",
      セールスポイントの平均文字数: "125.5",
      ポイント・特徴の平均文字数: "85.3",
      備考の平均文字数: "100.2",
      担当者コメントの平均文字数: "115.8",
      成約物件用コメントの平均文字数: "135.4",
      成約物件用備考の平均文字数: "90.1",
      平均画像枚数: "13.2",
      日付: "2025-03-01",
      month: "2025-03",
    },
    {
      host: "example-estate.jp",
      契約: "1",
      会社番号: "10001",
      商号: "サンプル不動産株式会社",
      都道府県: "東京都",
      市区町村: "新宿区",
      掲載物件数: "230",
      公開物件数: "110",
      先月の電話反響数: "12",
      PC反響数: "22",
      PCガチ反響数: "18",
      スマホ反響数: "40",
      スマホガチ反響数: "30",
      PC会員登録数: "8",
      スマホ会員登録数: "18",
      全反響数: "62",
      全ガチ反響数: "48",
      LINEバナー設定: "1",
      LINE反響数: "8",
      ブログ数: "12",
      平均物件文字数: "440.8",
      セールスポイントの平均文字数: "115.2",
      ポイント・特徴の平均文字数: "75.8",
      備考の平均文字数: "90.5",
      担当者コメントの平均文字数: "105.3",
      成約物件用コメントの平均文字数: "125.6",
      成約物件用備考の平均文字数: "80.9",
      平均画像枚数: "11.8",
      日付: "2025-02-01",
      month: "2025-02",
    },
  ]
}

// getAllData関数を修正してサンプルデータを使用するオプションを追加
export async function getAllData(
  directory: string,
  useSample = false,
): Promise<{
  data: RealEstateData[]
  months: string[]
}> {
  // サンプルデータを使用する場合
  if (useSample) {
    const sampleData = getSampleData()
    const months = [...new Set(sampleData.map((item) => item.month))].sort()
    return { data: sampleData, months }
  }

  const files = await getCSVFiles(directory)
  let allData: RealEstateData[] = []
  const months: string[] = []

  // CSVファイルが見つからない場合はサンプルデータを使用
  if (files.length === 0) {
    console.log("CSVファイルが見つかりません。サンプルデータを使用します。")
    return getAllData(directory, true)
  }

  for (const file of files) {
    const filePath = path.join(directory, file)
    const data = await parseCSVFile(filePath)

    // ファイル名から月を抽出（例: responseAggregate_2025-04-01_filtered.csv → 2025-04）
    const match = file.match(/(\d{4}-\d{2})-\d{2}/)
    if (match && match[1]) {
      const month = match[1]
      months.push(month)

      // 各レコードに月情報を追加
      data.forEach((record) => {
        record.month = month
      })
    }

    allData = [...allData, ...data]
  }

  return { data: allData, months: [...new Set(months)].sort() }
}

export function getCompanyData(
  data: RealEstateData[],
  identifier: string,
  type: "host" | "商号" | "会社番号",
): RealEstateData[] {
  // フィールドが欠落しているレコードをスキップ
  return data.filter((record) => record[type] && record[type] === identifier)
}

export function getUniqueCompanies(data: RealEstateData[]): { host: string; 商号: string; 会社番号: string }[] {
  const uniqueMap = new Map<string, { host: string; 商号: string; 会社番号: string }>()

  data.forEach((record) => {
    // hostが欠落している場合は会社番号をキーとして使用
    const key = record.host || record.会社番号 || record.商号 || `unknown-${Math.random().toString(36).substring(2, 10)}`
    
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, {
        host: record.host || '',
        商号: record.商号 || '',
        会社番号: record.会社番号 || '',
      })
    }
  })

  return Array.from(uniqueMap.values())
}

