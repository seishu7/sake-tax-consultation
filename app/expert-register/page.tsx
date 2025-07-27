"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, UserPlus, Edit, X } from "lucide-react"

// 専門分野の選択肢
const specialtyOptions = [
  "ビール",
  "発泡酒",
  "リキュール",
  "輸出入",
  "税率計算",
  "法令解釈",
  "税務調査対応",
  "申告書作成",
  "法改正",
  "製造免許",
  "品質管理",
  "原料管理",
]

// 役職の選択肢
const titleOptions = ["主任", "係長", "課長", "部長", "専門職", "シニアスペシャリスト"]

export default function ExpertRegisterPage() {
  const [isNewUser, setIsNewUser] = useState(true)
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    title: "",
    experience: "",
    specialties: [] as string[],
    description: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
<<<<<<< HEAD
    // 既存担当者かチェック
    const currentExpert = localStorage.getItem("currentExpert")
    const newExpertId = localStorage.getItem("newExpertId")

    if (currentExpert) {
      const expert = JSON.parse(currentExpert)
      setFormData(expert)
      setIsNewUser(false)
    } else if (newExpertId) {
      setFormData((prev) => ({ ...prev, employeeId: newExpertId }))
      setIsNewUser(true)
    } else {
      router.push("/expert-login")
=======
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      // 既存担当者かチェック
      const currentExpert = localStorage.getItem("currentExpert")
      const newExpertId = localStorage.getItem("newExpertId")

      if (currentExpert) {
        const expert = JSON.parse(currentExpert)
        setFormData(expert)
        setIsNewUser(false)
      } else if (newExpertId) {
        setFormData((prev) => ({ ...prev, employeeId: newExpertId }))
        setIsNewUser(true)
      } else {
        router.push("/expert-login")
      }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
    }
  }, [router])

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 担当者データの保存
    setTimeout(() => {
<<<<<<< HEAD
      const experts = JSON.parse(localStorage.getItem("experts") || "[]")

      if (isNewUser) {
        // 新規登録
        const newExpert = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        experts.push(newExpert)
        localStorage.setItem("experts", JSON.stringify(experts))
        localStorage.removeItem("newExpertId")
        alert("担当者登録が完了しました。")
      } else {
        // 既存データの更新
        const updatedExperts = experts.map((expert: any) =>
          expert.employeeId === formData.employeeId ? { ...formData, updatedAt: new Date().toISOString() } : expert,
        )
        localStorage.setItem("experts", JSON.stringify(updatedExperts))
        localStorage.removeItem("currentExpert")
        alert("担当者情報が更新されました。")
=======
      if (typeof window !== "undefined") {
        const experts = JSON.parse(localStorage.getItem("experts") || "[]")

        if (isNewUser) {
          // 新規登録
          const newExpert = {
            ...formData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          }
          experts.push(newExpert)
          localStorage.setItem("experts", JSON.stringify(experts))
          localStorage.removeItem("newExpertId")
          alert("担当者登録が完了しました。")
        } else {
          // 既存データの更新
          const updatedExperts = experts.map((expert: any) =>
            expert.employeeId === formData.employeeId ? { ...formData, updatedAt: new Date().toISOString() } : expert,
          )
          localStorage.setItem("experts", JSON.stringify(updatedExperts))
          localStorage.removeItem("currentExpert")
          alert("担当者情報が更新されました。")
        }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
      }

      router.push("/expert-login")
      setIsLoading(false)
    }, 1500)
  }

  const handleCancel = () => {
<<<<<<< HEAD
    localStorage.removeItem("currentExpert")
    localStorage.removeItem("newExpertId")
=======
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentExpert")
      localStorage.removeItem("newExpertId")
    }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
    router.push("/expert-login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-orange-500 to-yellow-500 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleCancel} className="text-white hover:bg-orange-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                戻る
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">{isNewUser ? "担当者新規登録" : "担当者情報編集"}</h1>
                <p className="text-sm text-orange-100">品質保証部 酒税相談担当者管理</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {isNewUser ? <UserPlus className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
                基本情報
              </CardTitle>
              <CardDescription>
                {isNewUser ? "新しい担当者の基本情報を入力してください" : "担当者情報を編集してください"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">社員番号</Label>
                  <Input id="employeeId" value={formData.employeeId} disabled className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">氏名 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="山田太郎"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">役職 *</Label>
                  <Select
                    value={formData.title}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="役職を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {titleOptions.map((title) => (
                        <SelectItem key={title} value={title}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">経験年数 *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    placeholder="例: 10年"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="yamada@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">内線番号</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="例: 1234"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>専門分野</CardTitle>
              <CardDescription>担当可能な酒税関連の専門分野を選択してください（複数選択可）</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={formData.specialties.includes(specialty)}
                        onCheckedChange={() => handleSpecialtyToggle(specialty)}
                      />
                      <Label htmlFor={specialty} className="text-sm font-normal cursor-pointer">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.specialties.length > 0 && (
                  <div className="space-y-2">
                    <Label>選択された専門分野:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="flex items-center gap-1 bg-yellow-100 text-yellow-800 border-yellow-300"
                        >
                          {specialty}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-red-600"
                            onClick={() => handleSpecialtyToggle(specialty)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>自己紹介・専門性の詳細</CardTitle>
              <CardDescription>経験や得意分野について詳しく記述してください</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="例: 発泡酒の税率計算に10年の経験があり、特に麦芽比率の判定と税務署との折衝に精通しています。過去に○○件の税務調査対応実績があります。"
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={
                !formData.name ||
                !formData.title ||
                !formData.experience ||
                formData.specialties.length === 0 ||
                isLoading
              }
              className="px-8 bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? (
                isNewUser ? (
                  "登録中..."
                ) : (
                  "更新中..."
                )
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isNewUser ? "登録する" : "更新する"}
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
