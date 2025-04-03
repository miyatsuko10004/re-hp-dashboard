"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // マウント後にのみクライアントサイドのレンダリングを有効にする
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 初期レンダリング時はテーマを適用しない
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 