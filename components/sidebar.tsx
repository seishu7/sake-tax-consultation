"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare, FileText, Search, Star, ChevronLeft, ChevronRight, LogOut, User } from "lucide-react"

// パンくずナビゲーション用のpropsを追加
interface SidebarProps {
  user?: {
    name: string
    department: string
  }
  currentPath?: string
}

export function Sidebar({ user, currentPath }: SidebarProps) {
  // 既存のコードはそのまま
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // navigationItemsを以下に変更
  const navigationItems = [
    {
      id: "consultation",
      label: "酒税相談",
      icon: MessageSquare,
      path: "/upload",
    },
    {
      id: "records",
      label: "相談記録（準備中）",
      icon: FileText,
      path: "#",
      disabled: true,
    },
    {
      id: "search",
      label: "酒税法・DB検索（準備中）",
      icon: Search,
      path: "#",
      disabled: true,
    },
  ]

  // handleNavigationを以下に変更
  const handleNavigation = (path: string) => {
    if (path !== "#") {
      router.push(path)
    }
  }

  const handleLogout = () => {
<<<<<<< HEAD
    localStorage.removeItem("user")
    localStorage.removeItem("consultationData")
    localStorage.removeItem("analysisData")
=======
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("consultationData")
      localStorage.removeItem("analysisData")
    }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
    router.push("/login")
  }

  const isActive = (path: string) => {
    if (path === "/upload") {
      return pathname === "/upload" || pathname === "/consultation" || pathname === "/expert-selection"
    }
    return pathname === path
  }

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} flex flex-col h-screen`}
    >
      {/* ヘッダー */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <h1 className="text-2xl font-semibold text-gray-900">Sherpath</h1>
            </div>
          )}
          {isCollapsed && <Star className="w-6 h-6 text-yellow-500 fill-current mx-auto" />}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 h-8 w-8">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* ユーザー情報 */}
      {user && (
        <div className="p-4 border-b border-gray-200">
          {!isCollapsed ? (
            <Card className="p-3 bg-gray-50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.department}</p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ナビゲーション */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            const isDisabled = item.disabled || false

            return (
              <Button
                key={item.id}
                variant={active ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  active
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : isDisabled
                      ? "text-gray-400 cursor-not-allowed hover:bg-transparent"
                      : "text-gray-700 hover:bg-gray-100"
                } ${isCollapsed ? "px-3" : ""}`}
                onClick={() => !isDisabled && handleNavigation(item.path)}
                disabled={isDisabled}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"} flex-shrink-0`} />
                {!isCollapsed && (
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                  </div>
                )}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* フッター */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:bg-gray-100 ${isCollapsed ? "px-3" : ""}`}
          onClick={handleLogout}
        >
          <LogOut className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"} flex-shrink-0`} />
          {!isCollapsed && "ログアウト"}
        </Button>
      </div>
    </div>
  )
}
