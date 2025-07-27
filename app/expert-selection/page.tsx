"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/sidebar"
import { Users, Send, Mail, FileText, Brain } from "lucide-react"

export default function ExpertSelectionPage() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [ccEmails, setCcEmails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // 登録された担当者データを取得、なければデフォルトデータを使用
  const registeredExperts = JSON.parse(localStorage.getItem("experts") || "[]")
  const experts =
    registeredExperts.length > 0
      ? registeredExperts.map((expert: any) => ({
          id: expert.employeeId,
          name: expert.name,
          title: expert.title,
          specialties: expert.specialties,
          experience: expert.experience,
        }))
      : [
          {
            id: "yamada",
            name: "山田花子",
            title: "主任",
            specialties: ["発泡酒", "リキュール", "税率計算"],
            experience: "15年",
          },
          {
            id: "sato",
            name: "佐藤次郎",
            title: "係長",
            specialties: ["ビール", "輸出入", "法令解釈"],
            experience: "12年",
          },
          {
            id: "tanaka",
            name: "田中三郎",
            title: "課長",
            specialties: ["税務調査対応", "申告書作成", "法改正"],
            experience: "20年",
          },
        ]

  // AIが推奨する担当者（最初の担当者を固定選択）
  const recommendedExpert = experts[0]

  useEffect(() => {
    const data = localStorage.getItem("analysisData")
    if (!data) {
      router.push("/login")
      return
    }

    const parsedData = JSON.parse(data)
    setAnalysisData(parsedData)
  }, [router])

  // handleSubmit関数を以下に変更
  const handleSubmit = async () => {
    setIsSubmitting(true)

    // 相談記録用のデータを準備
    const consultationRecord = {
      id: `CONS-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      date: new Date().toISOString().split("T")[0],
      submittedBy: user.name,
      department: user.department,
      expert: recommendedExpert.name,
      expertTitle: recommendedExpert.title,
      consultationContent: consultationData.content,
      files: consultationData.files || [],
      aiSummary: aiAnalysis.executiveSummary.situation,
      questions: aiAnalysis.executiveSummary.questionItems.filter((q: string) => q.trim() !== ""),
      ccEmails: ccEmails.trim() ? ccEmails.split("\n").filter((email) => email.trim()) : [],
      status: "提出済み",
      timestamp: new Date().toISOString(),
    }

    // 記録データを保存
    localStorage.setItem("pendingConsultationRecord", JSON.stringify(consultationRecord))

    setTimeout(() => {
      // 相談記録画面に遷移
      router.push("/consultation-summary")
    }, 2000)
  }

  if (!analysisData) return null

  const { user, consultationData, aiAnalysis } = analysisData

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">相談内容の確認</h2>
              <p className="text-gray-600">
                相談内容を分析した結果、AIが最適な担当者を選定しました。内容を確認の上、相談を提出してください。担当者にはTeamsで通知が送信されます。
              </p>
            </div>

            {/* 相談内容の確認 */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  相談内容
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-base text-gray-600 mb-2">アップロードファイル</h4>
                    <div className="flex flex-wrap gap-2">
                      {consultationData.files && consultationData.files.length > 0 ? (
                        consultationData.files.map((file: any, index: number) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {file.name}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">ファイルがアップロードされていません</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-base text-gray-600 mb-2">相談内容</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-base text-gray-700 whitespace-pre-wrap">{consultationData.content}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI分析要約 */}
            <Card className="shadow-sm border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-900">
                  <Brain className="w-5 h-5 mr-2" />
                  AI要約結果
                </CardTitle>
                <CardDescription className="text-orange-700">相談内容を分析した結果の要約です</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-base">
                  <div>
                    <h5 className="font-medium text-orange-800 mb-1">案件概要</h5>
                    <p className="text-orange-700">{aiAnalysis.executiveSummary.situation}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-800 mb-1">主な質問事項</h5>
                    <ul className="list-disc list-inside space-y-1 text-orange-700">
                      {aiAnalysis.executiveSummary.questionItems.slice(0, 3).map((question: string, index: number) => (
                        <li key={index} className="text-base">
                          {question}
                        </li>
                      ))}
                      {aiAnalysis.executiveSummary.questionItems.length > 3 && (
                        <li className="text-base text-orange-600">
                          他 {aiAnalysis.executiveSummary.questionItems.length - 3} 件の質問
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI推奨担当者 */}
            <Card className="shadow-sm border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-900">
                  <Users className="w-5 h-5 mr-2" />
                  AI推奨担当者
                </CardTitle>
                <CardDescription className="text-green-700">
                  相談内容に最も適した担当者をAIが選定しました
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 p-4 border rounded-lg bg-white border-green-200">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-xl bg-green-100 text-green-700">
                      {recommendedExpert.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-2xl text-green-900">{recommendedExpert.name}</h4>
                      <Badge className="bg-green-100 text-green-800 border-green-300">{recommendedExpert.title}</Badge>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">AI推奨</Badge>
                    </div>
                    <p className="text-base text-green-700 mb-3">経験年数: {recommendedExpert.experience}</p>
                    <div className="space-y-2">
                      <h5 className="font-medium text-base text-green-800">専門分野</h5>
                      <div className="flex flex-wrap gap-2">
                        {recommendedExpert.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-base border-green-300 text-green-700">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-base text-green-800 mb-1">推奨理由</h5>
                      <p className="text-base text-green-700">
                        発泡酒の税率計算に関する豊富な経験があり、特に麦芽比率の判定と副原料使用時の分類について専門知識を持っています。
                        過去に類似案件を多数担当しており、税務署との折衝経験も豊富です。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CC設定 */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  返信時のCC設定（任意）
                </CardTitle>
                <CardDescription>返信メールでCCに追加したい方のメールアドレスを入力してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="cc-emails" className="text-base">
                    CCメールアドレス
                  </Label>
                  <Textarea
                    id="cc-emails"
                    placeholder="例：manager@company.com&#10;director@company.com&#10;（複数の場合は改行で区切ってください）"
                    value={ccEmails}
                    onChange={(e) => setCcEmails(e.target.value)}
                    className="min-h-[100px] text-base border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <p className="text-sm text-gray-500">複数のメールアドレスを入力する場合は改行で区切ってください</p>
                </div>
              </CardContent>
            </Card>

            {/* 提出ボタン */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-12 py-3 bg-orange-600 hover:bg-orange-700 text-xl"
                size="lg"
              >
                {isSubmitting ? (
                  "相談を提出中..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Teamsで相談を送信する
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
