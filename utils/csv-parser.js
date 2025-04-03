import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

/**
 * @typedef {Object} RealEstateData
 * @property {string} host
 * @property {string} 契約
 * @property {string} 会社番号
 * @property {string} 商号
 * @property {string} 都道府県
 * @property {string} 市区町村
 * @property {string} 掲載物件数
 * @property {string} 公開物件数
 * @property {string} 先月の電話反響数
 * @property {string} PC反響数
 * @property {string} PCガチ反響数
 * @property {string} スマホ反響数
 * @property {string} スマホガチ反響数
 * @property {string} PC会員登録数
 * @property {string} スマホ会員登録数
 * @property {string} 全反響数
 * @property {string} 全ガチ反響数
 * @property {string} LINEバナー設定
 * @property {string} LINE反響数
 * @property {string} ブログ数
 * @property {string} 平均物件文字数
 * @property {string} セールスポイントの平均文字数
 * @property {string} ポイント・特徴の平均文字数
 * @property {string} 備考の平均文字数
 * @property {string} 担当者コメントの平均文字数
 * @property {string} 成約物件用コメントの平均文字数
 * @property {string} 成約物件用備考の平均文字数
 * @property {string} 平均画像枚数
 * @property {string} 日付
 */

/**
 * CSVファイルを取得する
 * @param {string} directory ディレクトリパス
 * @returns {Promise<string[]>} CSVファイルのリスト
 */
export async function getCSVFiles(directory) {
  try {
    const files = await fs.promises.readdir(directory)
    return files.filter((file) => file.endsWith(".csv"))
  } catch (error) {
    console.error("ディレクトリの読み込みエラー:", error)
    return []
  }
}

/**
 * CSVファイルを解析する
 * @param {string} filePath ファイルパス
 * @returns {Promise<RealEstateData[]>} 解析されたデータ
 */
export async function parseCSVFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, "utf8")
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    })
    return records
  } catch (error) {
    console.error("CSVファイルの解析エラー:", error)
    return []
  }
}

/**
 * 全てのデータを取得する
 * @param {string} directory ディレクトリパス
 * @returns {Promise<{data: RealEstateData[], months: string[]}>} 全データと月のリスト
 */
export async function getAllData(directory) {
  const files = await getCSVFiles(directory)
  let allData = []
  const months = []

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

/**
 * 特定の会社のデータを取得する
 * @param {RealEstateData[]} data データ
 * @param {string} identifier 識別子
 * @param {"host"|"商号"|"会社番号"} type 識別子の種類
 * @returns {RealEstateData[]} 会社のデータ
 */
export function getCompanyData(data, identifier, type) {
  return data.filter((record) => record[type] === identifier)
}

/**
 * ユニークな会社のリストを取得する
 * @param {RealEstateData[]} data データ
 * @returns {{host: string, 商号: string, 会社番号: string}[]} ユニークな会社のリスト
 */
export function getUniqueCompanies(data) {
  const uniqueMap = new Map()

  data.forEach((record) => {
    if (!uniqueMap.has(record.host)) {
      uniqueMap.set(record.host, {
        host: record.host,
        商号: record.商号,
        会社番号: record.会社番号,
      })
    }
  })

  return Array.from(uniqueMap.values())
}

