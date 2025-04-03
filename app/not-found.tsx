import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="text-gray-500 mb-8">お探しのページは存在しないか、移動された可能性があります。</p>
      <Link href="/">
        <Button>ホームに戻る</Button>
      </Link>
    </div>
  )
}

