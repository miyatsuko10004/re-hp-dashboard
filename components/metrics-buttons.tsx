"use client"

import { Button } from "@/components/ui/button"
import { Home, Phone, FileText, Image, MessageSquare } from "lucide-react"
import Link from "next/link"

interface MetricsButtonsProps {
  host: string
}

export default function MetricsButtons({ host }: MetricsButtonsProps) {
  const encodedHost = encodeURIComponent(host)

  return (
    <div className="flex flex-wrap gap-4 my-6">
      <Link href={`/dashboard/${encodedHost}/properties`}>
        <Button className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>物件数</span>
        </Button>
      </Link>

      <Link href={`/dashboard/${encodedHost}/inquiries`}>
        <Button className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>反響数</span>
        </Button>
      </Link>

      <Link href={`/dashboard/${encodedHost}/blogs`}>
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>ブログ</span>
        </Button>
      </Link>

      <Link href={`/dashboard/${encodedHost}/images`}>
        <Button className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          <span>画像</span>
        </Button>
      </Link>

      <Link href={`/dashboard/${encodedHost}/text`}>
        <Button className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>文字数</span>
        </Button>
      </Link>
    </div>
  )
}

