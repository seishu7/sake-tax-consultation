"use client"

import { Sidebar } from "@/components/sidebar"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ArrowRight } from "lucide-react"

// ビール注がれるエフェクトコンポーネント
const BeerPouringEffect = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-20 h-28 bg-gradient-to-b from-transparent to-amber-100 border-2 border-gray-300 rounded-b-lg relative overflow-hidden">
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-yellow-300 animate-[fillUp_2s_ease-out_forwards] h-0"></div>
            <div className="absolute top-0 w-full h-5 bg-gradient-to-b from-yellow-50 to-orange-100 opacity-90 animate-[foam_2s_ease-out_0.5s_forwards] transform translate-y-full"></div>
          </div>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-orange-400 animate-[pour_2s_ease-out_forwards] opacity-0"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">AI要約中...</h3>
          <p className="text-base text-gray-600">酒税法と過去事例を参照して要点を整理しています</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fillUp {
          0% { height: 0%; }
          100% { height: 75%; }
        }
        @keyframes foam {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0%); opacity: 0.9; }
        }
        @keyframes pour {
          0% { opacity: 0; height: 0px; }
          50% { opacity: 1; height: 24px; }
          100% { opacity: 0; height: 24px; }
        }
      `}</style>
    </div>
  )
}

export default function UploadPage() {
  const [user, setUser] = useState<any>(null)
  const [files, setFiles] = useState<File[]>([])
  const [consultationContent, setConsultationContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const consultationData = {
      files: files.map((f) => ({ name: f.name, size: f.size })),
      content: consultationContent,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("consultationData", JSON.stringify(consultationData))

    setTimeout(() => {
      router.push("/consultation")
    }, 3000)
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      {isLoading && <BeerPouringEffect />}

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">酒税相談</h1>
            <p className="text-xl text-gray-600">AIが酒税法と過去事例を参照して要点を整理します</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 参考文書のアップロード */}
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-2xl">
                  <Upload className="w-6 h-6 mr-3" />
                  参考文書
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="text-base"
                  />

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-base font-medium">選択されたファイル:</Label>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 mr-3 text-blue-600" />
                            <span className="flex-1 text-base">{file.name}</span>
                            <span className="text-sm text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 相談内容 */}
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-2xl">
                  <FileText className="w-6 h-6 mr-3" />
                  相談内容
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="相談したい内容を詳しく記述してください"
                  value={consultationContent}
                  onChange={(e) => setConsultationContent(e.target.value)}
                  className="min-h-[150px] text-base"
                  required
                />
              </CardContent>
            </Card>

            {/* 送信ボタン */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={!consultationContent.trim() || isLoading}
                className="px-12 py-4 bg-orange-600 hover:bg-orange-700 text-xl"
                size="lg"
              >
                {isLoading ? (
                  "AI要約中..."
                ) : (
                  <>
                    要約開始
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
