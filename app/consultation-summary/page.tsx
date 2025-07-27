"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { CheckCircle, FileText, User, Calendar, MessageSquare, ArrowRight, Save } from "lucide-react"

export default function ConsultationSummaryPage() {
  const [user, setUser] = useState<any>(null)
  const [consultationRecord, setConsultationRecord] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
<<<<<<< HEAD
    const userData = localStorage.getItem("user")
    const recordData = localStorage.getItem("pendingConsultationRecord")

    if (!userData || !recordData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))
    setConsultationRecord(JSON.parse(recordData))
=======
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      const recordData = localStorage.getItem("pendingConsultationRecord")

      if (!userData || !recordData) {
        router.push("/login")
        return
      }

      setUser(JSON.parse(userData))
      setConsultationRecord(JSON.parse(recordData))
    }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
  }, [router])

  const handleSaveAndContinue = async () => {
    setIsSaving(true)

<<<<<<< HEAD
    // 既存の相談記録を取得
    const existingRecords = JSON.parse(localStorage.getItem("consultationRecords") || "[]")

    // 新しい記録を追加
    const updatedRecords = [consultationRecord, ...existingRecords]
    localStorage.setItem("consultationRecords", JSON.stringify(updatedRecords))

    // 一時的な記録データを削除
    localStorage.removeItem("pendingConsultationRecord")
    localStorage.removeItem("consultationData")
    localStorage.removeItem("analysisData")
=======
    if (typeof window !== "undefined") {
      // 既存の相談記録を取得
      const existingRecords = JSON.parse(localStorage.getItem("consultationRecords") || "[]")

      // 新しい記録を追加
      const updatedRecords = [consultationRecord, ...existingRecords]
      localStorage.setItem("consultationRecords", JSON.stringify(updatedRecords))

      // 一時的な記録データを削除
      localStorage.removeItem("pendingConsultationRecord")
      localStorage.removeItem("consultationData")
      localStorage.removeItem("analysisData")
    }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)

    setTimeout(() => {
      setIsSaving(false)
      router.push("/upload")
    }, 1500)
  }

  if (!user || !consultationRecord) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* 成功メッセージ */}
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">相談を提出しました</h1>
              <p className="text-xl text-gray-600">担当者のTeamsに通知が送信されました。以下の内容で記録されました。</p>
            </div>

            {/* 相談記録の要約 */}
            <Card className="shadow-lg border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-900">
                  <FileText className="w-6 h-6 mr-2" />
                  相談記録要約
                </CardTitle>
                <CardDescription className="text-green-700">
                  提出された相談内容が以下のように記録されました
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 基本情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-medium text-green-800 mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      相談情報
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">相談ID:</span>
                        <span className="font-medium text-gray-900">{consultationRecord.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">提出日:</span>
                        <span className="font-medium text-gray-900">{consultationRecord.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ステータス:</span>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                          {consultationRecord.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-medium text-green-800 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      担当者情報
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">担当者:</span>
                        <span className="font-medium text-gray-900">{consultationRecord.expert}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">役職:</span>
                        <span className="font-medium text-gray-900">{consultationRecord.expertTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">提出者:</span>
                        <span className="font-medium text-gray-900">
                          {consultationRecord.submittedBy} ({consultationRecord.department})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 相談内容要約 */}
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    相談内容要約
                  </h4>
                  <p className="text-gray-700 text-base leading-relaxed mb-4">{consultationRecord.aiSummary}</p>

                  {consultationRecord.files && consultationRecord.files.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-600 mb-2">添付ファイル:</h5>
                      <div className="flex flex-wrap gap-2">
                        {consultationRecord.files.map((file: any, index: number) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {file.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {consultationRecord.ccEmails && consultationRecord.ccEmails.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-600 mb-2">CC設定:</h5>
                      <div className="flex flex-wrap gap-2">
                        {consultationRecord.ccEmails.map((email: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-sm bg-blue-50 text-blue-700">
                            {email}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 質問事項 */}
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-3">担当者への質問事項</h4>
                  <div className="space-y-3">
                    {consultationRecord.questions.map((question: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 text-base leading-relaxed">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 次のステップ */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">次のステップ</CardTitle>
                <CardDescription>
                  相談が正常に記録されました。担当者からTeamsまたはメールで回答をお待ちください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>担当者のTeamsに相談通知が送信されました</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>担当者が相談内容を確認します</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>必要に応じてTeamsで追加質問があります</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>回答がTeamsとメールで送信されます</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>相談記録に回答内容が記録されます</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 完了ボタン */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleSaveAndContinue}
                disabled={isSaving}
                className="px-12 py-3 bg-green-600 hover:bg-green-700 text-xl"
                size="lg"
              >
                {isSaving ? (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    記録保存中...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    新しい相談を作成する
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
