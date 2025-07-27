"use client"

import { ChevronRight, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter()

  const handleNavigation = (path?: string) => {
    if (path) {
      router.push(path)
    }
  }

  return (
    <nav className="flex items-center space-x-1 text-base text-gray-600 mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleNavigation("/upload")}
        className="h-6 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      >
        <Home className="w-3 h-3 mr-1" />
        ホーム
      </Button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-3 h-3 mx-1 text-gray-400" />
          {item.path && index < items.length - 1 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className="h-6 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {item.label}
            </Button>
          ) : (
            <span className={index === items.length - 1 ? "text-gray-900 font-medium" : "text-gray-600"}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
