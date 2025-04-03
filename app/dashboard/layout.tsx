import type React from "react"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            不動産会社データ分析
          </Link>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} 不動産会社データ分析ダッシュボード
        </div>
      </footer>
    </div>
  )
}

