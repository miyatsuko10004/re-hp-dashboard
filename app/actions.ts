"use server"

import path from "path"
import { getAllData, getCompanyData, getUniqueCompanies } from "@/utils/csv-parser"

// 環境変数が設定されていない場合はデフォルトのパスを使用
const DATA_DIRECTORY = process.env.CSV_DIRECTORY || path.join(process.cwd(), "data")

// サンプルデータを使用するかどうかのフラグ
const USE_SAMPLE_DATA = process.env.NEXT_PUBLIC_USE_MOCK_API === "true"

export async function fetchAllData() {
  try {
    const { data, months } = await getAllData(DATA_DIRECTORY, USE_SAMPLE_DATA)
    const companies = getUniqueCompanies(data)
    return { data, months, companies }
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error)
    // エラーが発生した場合はサンプルデータを使用
    const { data, months } = await getAllData(DATA_DIRECTORY, true)
    const companies = getUniqueCompanies(data)
    return { data, months, companies }
  }
}

export async function fetchCompanyData(identifier: string, type: "host" | "商号" | "会社番号") {
  try {
    const { data, months } = await getAllData(DATA_DIRECTORY, USE_SAMPLE_DATA)
    const companyData = getCompanyData(data, identifier, type)

    // 会社データが見つからない場合はサンプルデータを使用
    if (companyData.length === 0 && type === "host" && identifier !== "example-estate.jp") {
      console.log("会社データが見つかりません。サンプルデータを使用します。")
      const { data: sampleData } = await getAllData(DATA_DIRECTORY, true)
      return { companyData: sampleData, months }
    }

    return { companyData, months }
  } catch (error) {
    console.error("会社データの取得中にエラーが発生しました:", error)
    // エラーが発生した場合はサンプルデータを使用
    const { data, months } = await getAllData(DATA_DIRECTORY, true)
    const companyData = getCompanyData(data, "example-estate.jp", "host")
    return { companyData, months }
  }
}

export async function searchCompanies(query: string) {
  try {
    const { data } = await getAllData(DATA_DIRECTORY, USE_SAMPLE_DATA)
    const companies = getUniqueCompanies(data)

    if (!query) return companies

    const lowerQuery = query.toLowerCase()
    return companies.filter((company) => {
      const hostMatch = company.host ? company.host.toLowerCase().includes(lowerQuery) : false
      const companyNameMatch = company.商号 ? company.商号.toLowerCase().includes(lowerQuery) : false
      const companyNumberMatch = company.会社番号 ? company.会社番号.toLowerCase().includes(lowerQuery) : false
      
      return hostMatch || companyNameMatch || companyNumberMatch
    })
  } catch (error) {
    console.error("会社検索中にエラーが発生しました:", error)
    // エラーが発生した場合はサンプルデータを使用
    const { data } = await getAllData(DATA_DIRECTORY, true)
    const companies = getUniqueCompanies(data)

    if (!query) return companies

    const lowerQuery = query.toLowerCase()
    return companies.filter((company) => {
      const hostMatch = company.host ? company.host.toLowerCase().includes(lowerQuery) : false
      const companyNameMatch = company.商号 ? company.商号.toLowerCase().includes(lowerQuery) : false
      const companyNumberMatch = company.会社番号 ? company.会社番号.toLowerCase().includes(lowerQuery) : false
      
      return hostMatch || companyNameMatch || companyNumberMatch
    })
  }
}

