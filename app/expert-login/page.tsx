"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Lock, User, ArrowLeft } from "lucide-react"

export default function ExpertLoginPage() {
  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 担当者認証シミュレーション
    setTimeout(() => {
<<<<<<< HEAD
      if (employeeId && password) {
=======
      if (employeeId && password && typeof window !== "undefined") {
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
        // 既存の担当者データをチェック（模擬）
        const existingExperts = JSON.parse(localStorage.getItem("experts") || "[]")
        const expert = existingExperts.find((exp: any) => exp.employeeId === employeeId)

        if (expert) {
          localStorage.setItem("currentExpert", JSON.stringify(expert))
          router.push("/expert-register")
        } else {
          // 新規担当者として登録画面へ
          localStorage.setItem("newExpertId", employeeId)
          router.push("/expert-register")
        }
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">担当者専用ページ</CardTitle>
          <CardDescription>品質保証部 担当者登録・管理システム</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">社員番号</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="担当者の社員番号を入力"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="パスワードを入力"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700" disabled={isLoading}>
              {isLoading ? "認証中..." : "ログイン"}
            </Button>
          </form>

          <div className="mt-6 space-y-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">または</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              一般ユーザーログインに戻る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
