import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("csvFiles") as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: "CSVファイルが提供されていません" }, { status: 400 })
    }

    const uploadDir = process.env.CSV_DIRECTORY || path.join(process.cwd(), "data")

    // ディレクトリが存在することを確認
    try {
      await writeFile(path.join(uploadDir, ".keep"), "")
    } catch (error) {
      console.error("ディレクトリの作成エラー:", error)
      return NextResponse.json({ error: "ディレクトリの作成に失敗しました" }, { status: 500 })
    }

    const savedFiles = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filePath = path.join(uploadDir, file.name)

      await writeFile(filePath, buffer)
      savedFiles.push(file.name)
    }

    return NextResponse.json({
      message: `${savedFiles.length}個のCSVファイルが正常にアップロードされました`,
      files: savedFiles,
    })
  } catch (error) {
    console.error("ファイルアップロードエラー:", error)
    return NextResponse.json({ error: "ファイルのアップロード中にエラーが発生しました" }, { status: 500 })
  }
}

