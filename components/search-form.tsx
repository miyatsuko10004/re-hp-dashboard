"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { searchCompanies } from "@/app/actions"

export default function SearchForm() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{ host: string; 商号: string; 会社番号: string }[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.length > 1) {
        setIsSearching(true)
        const companies = await searchCompanies(query)
        setResults(companies)
        setIsSearching(false)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delaySearch)
  }, [query])

  const handleCompanySelect = (host: string) => {
    router.push(`/dashboard/${encodeURIComponent(host)}`)
    setResults([])
    setQuery("")
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="ホスト名、商号、会社番号で検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button variant="ghost" size="icon" className="absolute right-0">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {results.map((company) => (
              <li
                key={company.host}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCompanySelect(company.host)}
              >
                <div className="font-medium">{company.商号}</div>
                <div className="text-sm text-gray-500">{company.host}</div>
                <div className="text-xs text-gray-400">会社番号: {company.会社番号}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isSearching && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg p-4 text-center">検索中...</div>
      )}
    </div>
  )
}

