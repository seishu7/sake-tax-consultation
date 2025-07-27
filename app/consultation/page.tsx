"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/sidebar"
import { Brain, FileText, Info, ArrowRight, ChefHat, Package, Users, ChevronDown } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function ConsultationPage() {
  const [user, setUser] = useState<any>(null)
  const [consultationData, setConsultationData] = useState<any>(null)
  const [showLawArticles, setShowLawArticles] = useState(false)
  const [showPastCases, setShowPastCases] = useState(false)
  const router = useRouter()
  const [customQuestions, setCustomQuestions] = useState<string[]>([])
  const [showRecipe, setShowRecipe] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)

  // 参照用のref
  const lawSectionRef = useRef<HTMLDivElement>(null)
  const casesSectionRef = useRef<HTMLDivElement>(null)

  // 酒税法条文データベース（模擬）- レシピ・提供方法に基づいて拡張
  const sakeTaxLawDatabase = [
    {
      id: "article_3",
      title: "酒税法第3条（酒類の定義）",
      content:
        "この法律において「酒類」とは、アルコール分一度以上の飲料（薄めてアルコール分一度以上となるものを含む。）をいう。",
      relevance: 85,
      applicableToRecipe: ["アルコール度数3.5%"],
      applicableToDelivery: ["缶容器", "ボトル容器"],
    },
    {
      id: "article_23",
      title: "酒税法第23条（発泡酒の税率）",
      content:
        "発泡酒に係る酒税の税率は、次の各号に掲げる発泡酒の区分に応じ、それぞれ当該各号に定める税率とする。一 麦芽の使用割合が三分の二以上のもの 二百二十円 二 麦芽の使用割合が四分の一以上三分の二未満のもの 百三十四円二十五銭",
      relevance: 95,
      applicableToRecipe: ["麦芽比率25%", "副原料使用"],
      applicableToDelivery: ["一般販売", "業務用販売"],
    },
    {
      id: "article_24",
      title: "酒税法施行令第6条（麦芽比率の算定方法）",
      content:
        "発泡酒の原料中の麦芽の重量の割合は、当該発泡酒の原料の重量の合計に対する麦芽の重量の割合により算定するものとする。",
      relevance: 90,
      applicableToRecipe: ["麦芽比率25%", "原料配合計算"],
      applicableToDelivery: [],
    },
    {
      id: "article_7",
      title: "酒税法第7条（製造免許）",
      content:
        "酒類を製造しようとする者は、製造しようとする酒類の品目別に、製造場ごとに、その製造場の所在地の所轄税務署長の免許を受けなければならない。",
      relevance: 80,
      applicableToRecipe: ["新商品開発"],
      applicableToDelivery: ["製造場での生産"],
    },
  ]

  // 過去のやり取りデータベース（模擬）- レシピ・提供方法に基づいて拡張
  const pastCasesDatabase = [
    {
      id: "case_001",
      date: "2023-08-15",
      title: "麦芽比率25%の発泡酒の分類確認",
      summary: "アルコール度数3.2%、麦芽比率25%の新商品について税務署に事前相談",
      taxOfficeResponse: "麦芽比率25%は第二区分に該当。ただし、副原料の種類と使用量について詳細確認が必要。",
      outcome: "追加資料提出後、第二区分として承認",
      担当者: "山田花子",
      relevance: 92,
      relatedRecipe: ["麦芽比率25%", "ホップ使用", "副原料：コーン"],
      relatedDelivery: ["350ml缶", "一般小売販売"],
    },
    {
      id: "case_002",
      date: "2023-06-22",
      title: "製造工程変更による分類への影響",
      summary: "既存商品の製造工程変更時の酒税分類への影響について相談",
      taxOfficeResponse:
        "製造工程の変更が最終製品の性状に影響する場合は再分類が必要。特に発酵度合いとアルコール度数の変化に注意。",
      outcome: "工程変更後も同一分類で継続可能と判定",
      担当者: "佐藤次郎",
      relevance: 78,
      relatedRecipe: ["発酵工程変更", "アルコール度数調整"],
      relatedDelivery: ["既存販売チャネル継続"],
    },
    {
      id: "case_003",
      date: "2023-04-10",
      title: "税務調査での麦芽比率測定方法の指摘",
      summary: "税務調査において麦芽比率の測定方法について指摘を受けた事例",
      taxOfficeResponse: "麦芽比率の算定は乾燥重量ベースで行うこと。水分含有量の補正計算書の保管が必要。",
      outcome: "測定方法を修正し、過去分の修正申告を実施",
      担当者: "田中三郎",
      relevance: 85,
      relatedRecipe: ["麦芽比率計算方法", "乾燥重量ベース算定"],
      relatedDelivery: ["製造記録管理"],
    },
    {
      id: "case_004",
      date: "2023-09-12",
      title: "缶容器から瓶容器への変更時の手続き",
      summary: "同一商品の容器変更時の税務署への届出と表示事項確認",
      taxOfficeResponse: "容器変更は製品仕様変更に該当するため、事前届出が必要。表示事項の再確認も実施すること。",
      outcome: "届出完了後、瓶容器での販売開始",
      担当者: "山田花子",
      relevance: 75,
      relatedRecipe: ["同一レシピ"],
      relatedDelivery: ["缶→瓶容器変更", "表示事項変更"],
    },
  ]

  // 相談内容からレシピと提供方法を分析（模擬AI分析）
  const analyzeConsultationContent = (data: any) => {
    // 統合された分析データから情報を抽出
    const recipeAnalysis = {
      ingredients: [
        { name: "麦芽", percentage: 25, note: "二条大麦使用" },
        { name: "ホップ", percentage: 0.1, note: "アロマホップ" },
        { name: "副原料（コーン）", percentage: 15, note: "コーンスターチ" },
        { name: "水", percentage: 59.9, note: "軟水使用" },
      ],
      alcoholContent: 3.5,
      maltRatio: 25,
      productionMethod: "下面発酵",
      fermentationPeriod: "14日間",
      taxCategory: "発泡酒第二区分",
    }

    const deliveryAnalysis = {
      container: "350ml缶",
      salesChannel: "一般小売店",
      distributionMethod: "常温流通",
      targetMarket: "一般消費者向け",
      shelfLife: "9ヶ月",
      labelingRequirements: ["アルコール度数表示", "原材料名表示", "製造者名表示"],
      specialConsiderations: ["季節限定商品として販売予定"],
    }

    return { recipeAnalysis, deliveryAnalysis }
  }

  // レシピ・提供方法に基づいて関連条文と事例をフィルタリング
  const getRelevantLawArticles = () => {
    return sakeTaxLawDatabase
      .filter((law) => {
        const recipeMatch = law.applicableToRecipe.some((item) =>
          ["麦芽比率25%", "副原料使用", "アルコール度数3.5%"].includes(item),
        )
        const deliveryMatch = law.applicableToDelivery.some((item) => ["350ml缶", "一般小売店"].includes(item))
        return recipeMatch || deliveryMatch
      })
      .sort((a, b) => b.relevance - a.relevance)
  }

  const getRelevantPastCases = () => {
    return pastCasesDatabase
      .filter((case_) => {
        const recipeMatch = case_.relatedRecipe.some((item) =>
          ["麦芽比率25%", "副原料：コーン", "ホップ使用"].includes(item),
        )
        const deliveryMatch = case_.relatedDelivery.some((item) => ["350ml缶", "一般小売店"].includes(item))
        return recipeMatch || deliveryMatch
      })
      .sort((a, b) => b.relevance - a.relevance)
  }

  // AI分析結果
  const aiAnalysis = {
    query: consultationData?.content || "",
    recipeAnalysis: {
      ingredients: [
        { name: "麦芽", percentage: 25, note: "二条大麦使用" },
        { name: "ホップ", percentage: 0.1, note: "アロマホップ" },
        { name: "副原料（コーン）", percentage: 15, note: "コーンスターチ" },
        { name: "水", percentage: 59.9, note: "軟水使用" },
      ],
      alcoholContent: 3.5,
      maltRatio: 25,
      productionMethod: "下面発酵",
      fermentationPeriod: "14日間",
      taxCategory: "発泡酒第二区分",
    },
    deliveryAnalysis: {
      container: "350ml缶",
      salesChannel: "一般小売店",
      distributionMethod: "常温流通",
      targetMarket: "一般消費者向け",
      shelfLife: "9ヶ月",
      labelingRequirements: ["アルコール度数表示", "原材料名表示", "製造者名表示"],
      specialConsiderations: ["季節限定商品として販売予定"],
    },
    relatedLawArticles: getRelevantLawArticles(),
    relatedPastCases: getRelevantPastCases(),
    // 担当者向け要約を更新
    executiveSummary: {
      situation:
        "麦芽比率25%、アルコール度数3.5%、副原料にコーン15%を使用した新商品発泡酒についての総合的な相談案件です。税務署への事前相談を控え、相談内容を確認させてください。",
      recipeAssessment: "主原料は麦芽25%、副原料にコーン15%を使用。下面発酵による14日間の発酵工程を経て製造予定。",
      deliveryAssessment:
        "350ml缶容器で一般小売店での販売を計画。常温流通での流通を予定し、季節限定商品として販売予定。",
      questionItems: [
        "麦芽比率25%、副原料にコーン15%を使用した本商品は、酒税法上の発泡酒第二区分として適切でしょうか？",
        "350ml缶での一般小売店販売において、容器変更や表示要件で特に注意すべき点はありますか？",
        "過去事例を踏まえ、税務署への事前相談時に追加で準備すべき資料や確認事項はありますか？",
        "季節限定商品として販売する場合、通常の商品と異なる手続きや注意点はありますか？",
        "本案件において、税務上のリスクを最小化するために最も重要な対応策は何でしょうか？",
      ],
    },
    analysisDate: new Date().toISOString(),
  }

  useEffect(() => {
<<<<<<< HEAD
    const userData = localStorage.getItem("user")
    const consultData = localStorage.getItem("consultationData")

    if (!userData || !consultData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))
    setConsultationData(JSON.parse(consultData))

    // 質問事項を初期化
    setCustomQuestions(aiAnalysis.executiveSummary.questionItems)
=======
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      const consultData = localStorage.getItem("consultationData")

      if (!userData || !consultData) {
        router.push("/login")
        return
      }

      setUser(JSON.parse(userData))
      setConsultationData(JSON.parse(consultData))

      // 質問事項を初期化
      setCustomQuestions(aiAnalysis.executiveSummary.questionItems)
    }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
  }, [router])

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...customQuestions]
    updatedQuestions[index] = value
    setCustomQuestions(updatedQuestions)
  }

  const addQuestion = () => {
    setCustomQuestions([...customQuestions, ""])
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = customQuestions.filter((_, i) => i !== index)
    setCustomQuestions(updatedQuestions)
  }

  const handleProceedToExpertSelection = () => {
<<<<<<< HEAD
    // AI分析結果と相談データを保存
    const analysisData = {
      aiAnalysis: {
        ...aiAnalysis,
        executiveSummary: {
          ...aiAnalysis.executiveSummary,
          questionItems: customQuestions.filter((q) => q.trim() !== ""),
        },
      },
      consultationData,
      user,
    }
    localStorage.setItem("analysisData", JSON.stringify(analysisData))
=======
    if (typeof window !== "undefined") {
      // AI分析結果と相談データを保存
      const analysisData = {
        aiAnalysis: {
          ...aiAnalysis,
          executiveSummary: {
            ...aiAnalysis.executiveSummary,
            questionItems: customQuestions.filter((q) => q.trim() !== ""),
          },
        },
        consultationData,
        user,
      }
      localStorage.setItem("analysisData", JSON.stringify(analysisData))
    }
>>>>>>> bdf7d6e (Initial commit: 酒税相談システム)
    router.push("/expert-selection")
  }

  // 参照リンクをクリックした時のスクロール処理
  const scrollToReference = (type: string, id: string) => {
    if (type === "law" && lawSectionRef.current) {
      lawSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (type === "case" && casesSectionRef.current) {
      casesSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!user || !consultationData) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {/* AI要約結果 */}
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    相談内容の確認
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-base text-gray-600">アップロードファイル</h4>
                      <div className="mt-1">
                        {consultationData.files && consultationData.files.length > 0 ? (
                          consultationData.files.map((file: any, index: number) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-1">
                              {file.name}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">ファイルがアップロードされていません</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-base text-gray-600">相談内容</h4>
                      <p className="text-base text-gray-700 bg-gray-50 p-3 rounded mt-1">{consultationData.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-orange-600" />
                    AI要約結果
                  </CardTitle>
                  <CardDescription>アップロードされた文書と相談内容を基に、AIが要点を整理しました</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 担当者向け要約セクション */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-medium mb-3 flex items-center text-orange-900">
                      <Brain className="w-4 h-4 mr-2" />
                      担当者向け要約
                    </h4>

                    <div className="space-y-4 text-base">
                      <div>
                        <p className="text-orange-700">{aiAnalysis.executiveSummary.situation}</p>
                      </div>

                      {/* レシピセクション - 折りたたみ可能 */}
                      <div>
                        <div
                          className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors"
                          onClick={() => setShowRecipe(!showRecipe)}
                        >
                          <h5 className="font-medium text-orange-800 flex items-center">
                            <ChefHat className="w-4 h-4 mr-1" />
                            レシピ
                          </h5>
                          <ChevronDown
                            className={`w-4 h-4 text-orange-600 transition-transform ${showRecipe ? "rotate-180" : ""}`}
                          />
                        </div>

                        {showRecipe && (
                          <div className="mt-2 bg-white rounded-lg p-3 border border-orange-100">
                            <p className="text-orange-700 text-sm mb-2">
                              {aiAnalysis.executiveSummary.recipeAssessment}
                            </p>
                            <div className="space-y-1">
                              {aiAnalysis.recipeAnalysis.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span className="text-orange-600">{ingredient.name}</span>
                                  <span className="text-orange-800 font-medium">{ingredient.percentage}%</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2 pt-2 border-t border-orange-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-orange-600">税区分</span>
                                <span className="text-orange-800 font-medium">
                                  {aiAnalysis.recipeAnalysis.taxCategory}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 提供方法セクション - 折りたたみ可能 */}
                      <div>
                        <div
                          className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors"
                          onClick={() => setShowDelivery(!showDelivery)}
                        >
                          <h5 className="font-medium text-orange-800 flex items-center">
                            <Package className="w-4 h-4 mr-1" />
                            提供方法
                          </h5>
                          <ChevronDown
                            className={`w-4 h-4 text-orange-600 transition-transform ${showDelivery ? "rotate-180" : ""}`}
                          />
                        </div>

                        {showDelivery && (
                          <div className="mt-2 bg-white rounded-lg p-3 border border-orange-100">
                            <p className="text-orange-700 text-sm mb-2">
                              {aiAnalysis.executiveSummary.deliveryAssessment}
                            </p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-orange-600">容器</span>
                                <span className="text-orange-800 font-medium">
                                  {aiAnalysis.deliveryAnalysis.container}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-orange-600">販売チャネル</span>
                                <span className="text-orange-800 font-medium">
                                  {aiAnalysis.deliveryAnalysis.salesChannel}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-orange-600">流通方法</span>
                                <span className="text-orange-800 font-medium">
                                  {aiAnalysis.deliveryAnalysis.distributionMethod}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-orange-600">賞味期限</span>
                                <span className="text-orange-800 font-medium">
                                  {aiAnalysis.deliveryAnalysis.shelfLife}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator className="my-3 border-orange-200" />

                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <h5 className="font-medium text-orange-800 mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <Info className="w-4 h-4 mr-1" />
                            担当者への質問事項
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addQuestion}
                            className="text-sm px-2 py-1 h-6 bg-transparent border-orange-300 text-orange-700 hover:bg-orange-50"
                          >
                            質問追加
                          </Button>
                        </h5>
                        <div className="space-y-3 text-base">
                          {customQuestions.map((question, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-start space-x-2">
                                <span className="text-orange-600 font-medium min-w-[20px] mt-2">{index + 1}.</span>
                                <div className="flex-1">
                                  <Textarea
                                    value={question}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    className="min-h-[60px] text-sm border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="質問内容を入力してください"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeQuestion(index)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 h-8 w-8"
                                >
                                  ×
                                </Button>
                              </div>
                            </div>
                          ))}
                          {customQuestions.length === 0 && (
                            <div className="text-center py-4 text-gray-500 text-sm">
                              質問事項がありません。「質問追加」ボタンで質問を追加してください。
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* 関連法令セクション */}
                  <div ref={lawSectionRef}>
                    <div
                      className="flex items-center justify-between cursor-pointer p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                      onClick={() => setShowLawArticles(!showLawArticles)}
                    >
                      <h4 className="font-medium text-xl flex items-center text-blue-900">
                        <FileText className="w-5 h-5 mr-2" />
                        関連する酒税法条文 ({aiAnalysis.relatedLawArticles.length}件)
                      </h4>
                      <ChevronDown
                        className={`w-5 h-5 text-blue-600 transition-transform ${showLawArticles ? "rotate-180" : ""}`}
                      />
                    </div>

                    {showLawArticles && (
                      <div className="mt-4 space-y-4">
                        {aiAnalysis.relatedLawArticles.map((law, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-blue-50 border-blue-200" id={law.id}>
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-medium text-base text-blue-900">{law.title}</h5>
                              <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800">
                                関連度: {law.relevance}%
                              </Badge>
                            </div>
                            <p className="text-base text-blue-800 leading-relaxed mb-3">{law.content}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-sm text-blue-600">適用要素:</span>
                              {[...law.applicableToRecipe, ...law.applicableToDelivery].map((item, idx) => (
                                <Badge key={idx} variant="outline" className="text-sm border-blue-300 text-blue-700">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* 過去事例セクション */}
                  <div ref={casesSectionRef}>
                    <div
                      className="flex items-center justify-between cursor-pointer p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                      onClick={() => setShowPastCases(!showPastCases)}
                    >
                      <h4 className="font-medium text-xl flex items-center text-green-900">
                        <Users className="w-5 h-5 mr-2" />
                        関連する過去のやり取り ({aiAnalysis.relatedPastCases.length}件)
                      </h4>
                      <ChevronDown
                        className={`w-5 h-5 text-green-600 transition-transform ${showPastCases ? "rotate-180" : ""}`}
                      />
                    </div>

                    {showPastCases && (
                      <div className="mt-4 space-y-4">
                        {aiAnalysis.relatedPastCases.map((case_, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-green-50 border-green-200" id={case_.id}>
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-medium text-base text-green-900">{case_.title}</h5>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-sm border-green-300 text-green-700">
                                  {case_.date}
                                </Badge>
                                <Badge variant="secondary" className="text-sm bg-green-100 text-green-800">
                                  関連度: {case_.relevance}%
                                </Badge>
                              </div>
                            </div>
                            <p className="text-base text-green-800 mb-3">{case_.summary}</p>
                            <div className="bg-white rounded p-3 mb-3 border border-green-100">
                              <p className="text-sm text-gray-600 mb-2">税務署回答:</p>
                              <p className="text-base text-gray-800">{case_.taxOfficeResponse}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm text-green-700 mb-3">
                              <span>結果: {case_.outcome}</span>
                              <span>担当: {case_.担当者}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-sm text-green-600">関連要素:</span>
                              {[...case_.relatedRecipe, ...case_.relatedDelivery].map((item, idx) => (
                                <Badge key={idx} variant="outline" className="text-sm border-green-300 text-green-700">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleProceedToExpertSelection}
              className="px-12 py-3 bg-orange-600 hover:bg-orange-700 text-xl"
              size="lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              相談内容を確認する
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
