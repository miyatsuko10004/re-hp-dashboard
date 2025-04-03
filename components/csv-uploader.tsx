"use client"

import { useState, useRef } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Check, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CSVUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    setSelectedFiles(fileArray)
    setError(null)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("アップロードするファイルを選択してください")
      return
    }

    setIsUploading(true)
    setError(null)
    setUploadSuccess(false)

    const formData = new FormData()

    for (const file of selectedFiles) {
      formData.append("csvFiles", file)
    }

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "CSVファイルのアップロードに失敗しました")
      }

      setUploadSuccess(true)
      setSelectedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // データを更新するためにページをリフレッシュ
      setTimeout(() => {
        router.refresh()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files).filter((file) => file.name.endsWith(".csv"))
      if (fileArray.length === 0) {
        setError("CSVファイルのみアップロードできます")
        return
      }
      setSelectedFiles(fileArray)
      setError(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSVファイルのアップロード</CardTitle>
        <CardDescription>月次のCSVファイルをアップロードしてデータを更新します</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 mb-4">
            CSVファイルをドラッグ＆ドロップするか、クリックして選択してください
          </p>
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
            ref={fileInputRef}
            disabled={isUploading}
          />
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="csv-upload">
              <Button as="span" variant="outline" disabled={isUploading}>
                {isUploading ? "アップロード中..." : "ファイルを選択"}
              </Button>
            </label>

            {selectedFiles.length > 0 && (
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "アップロード中..." : `${selectedFiles.length}個のファイルをアップロード`}
              </Button>
            )}
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4 w-full">
              <p className="text-sm font-medium mb-2">選択されたファイル:</p>
              <ul className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {uploadSuccess && (
            <div className="mt-4 flex items-center text-green-600">
              <Check className="h-5 w-5 mr-2" />
              <p>CSVファイルが正常にアップロードされました</p>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2">注意事項:</h3>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>CSVファイルは「responseAggregate_YYYY-MM-DD_filtered.csv」の形式で命名してください</li>
            <li>ファイル名から月情報（YYYY-MM）が抽出されます</li>
            <li>環境変数 NEXT_PUBLIC_USE_MOCK_API=true を設定するとサンプルデータを使用できます</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

