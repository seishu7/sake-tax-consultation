"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 簡単な認証シミュレーション
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            name: "田中太郎",
            department: "企画開発部",
          }),
        )
        router.push("/upload")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ロゴとタイトル */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Star className="w-12 h-12 text-yellow-500 mx-auto fill-current" />
          </div>
          <h1 className="text-4xl font-normal text-gray-900">Sherpath</h1>
        </div>

        {/* ログインフォーム */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-normal text-gray-700">
                  メールアドレス
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@supporobeer.co.jp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-gray-200 rounded-md focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-normal text-gray-700">
                  パスワード
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-gray-200 rounded-md focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-normal rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 担当者専用ページリンク */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/expert-login")}
            className="text-gray-600 hover:text-gray-800 font-normal"
          >
            担当者専用ページ
          </Button>
        </div>
      </div>
    </div>
  )
}
