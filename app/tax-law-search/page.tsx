"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumb } from "@/components/breadcrumb"
import { Search, TrendingUp, Clock, Eye, FileText, Scale, Calendar, User } from "lucide-react"

export default function TaxLawSearchPage() {
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const router = useRouter()

  // 最も参照された酒税法条文・事例（拡張版）
  const mostReferencedItems = [
    {
      id: "law_001",
      type: "法令",
      title: "酒税法第23条（発泡酒の税率）",
      summary: "発泡酒の麦芽比率による税率区分について",
      content:
        "発泡酒に係る酒税の税率は、次の各号に掲げる発泡酒の区分に応じ、それぞれ当該各号に定める税率とする。一 麦芽の使用割合が三分の二以上のもの 二百二十円 二 麦芽の使用割合が四分の一以上三分の二未満のもの 百三十四円二十五銭 三 麦芽の使用割合が四分の一未満のもの 八十円",
      referenceCount: 156,
      lastUpdated: "2023-04-01",
      category: "税率",
      relatedArticles: ["酒税法第3条", "酒税法施行令第6条"],
    },
    {
      id: "case_045",
      type: "事例",
      title: "麦芽比率境界値での分類判定",
      summary: "麦芽比率が25%ちょうどの場合の税務署判断事例",
      content:
        "麦芽比率が正確に25%の場合の分類について税務署に照会した結果、計算方法の詳細確認が必要とされた事例。最終的に乾燥重量ベースでの計算により第二区分として承認された。",
      referenceCount: 142,
      lastUpdated: "2023-08-15",
      category: "分類判定",
      expert: "山田花子",
      department: "品質保証部",
      outcome: "第二区分として承認",
    },
    {
      id: "law_002",
      type: "法令",
      title: "酒税法施行令第6条（麦芽比率の算定方法）",
      summary: "麦芽比率の正確な算定方法と計算基準",
      content:
        "発泡酒の原料中の麦芽の重量の割合は、当該発泡酒の原料の重量の合計に対する麦芽の重量の割合により算定するものとする。この場合において、麦芽の重量は、乾燥した状態における重量とする。",
      referenceCount: 138,
      lastUpdated: "2023-04-01",
      category: "算定方法",
      relatedArticles: ["酒税法第23条", "酒税法施行規則第10条"],
    },
    {
      id: "case_032",
      type: "事例",
      title: "副原料使用時の分類変更事例",
      summary: "ホップ以外の副原料使用による分類への影響",
      content:
        "従来ビールとして製造していた商品に新たな副原料を追加した際の分類変更について。香料の追加により発泡酒への分類変更が必要となった事例。",
      referenceCount: 124,
      lastUpdated: "2023-06-22",
      category: "分類変更",
      expert: "佐藤次郎",
      department: "品質保証部",
      outcome: "発泡酒への分類変更",
    },
    {
      id: "law_003",
      type: "法令",
      title: "酒税法第3条（酒類の定義）",
      summary: "アルコール分1度以上の飲料の酒類該当性",
      content:
        "この法律において「酒類」とは、アルコール分一度以上の飲料（薄めてアルコール分一度以上となるものを含む。）をいう。ただし、酒類の製造免許を受けた者が酒類の原料として使用する場合を除く。",
      referenceCount: 118,
      lastUpdated: "2023-04-01",
      category: "定義",
      relatedArticles: ["酒税法第7条", "酒税法第23条"],
    },
    {
      id: "case_028",
      type: "事例",
      title: "アルコール度数測定での指摘事例",
      summary: "税務調査でのアルコール度数測定方法に関する指摘",
      content:
        "税務調査において、アルコール度数の測定方法と記録保管について指摘を受けた事例。測定温度の補正計算と記録様式の統一が求められた。",
      referenceCount: 95,
      lastUpdated: "2023-12-22",
      category: "測定方法",
      expert: "田中三郎",
      department: "品質保証部",
      outcome: "測定方法の改善実施",
    },
  ]

  // 最新の事例（拡張版）
  const recentCases = [
    {
      id: "case_201",
      title: "2024年度税制改正対応事例",
      summary: "新税率適用開始に伴う製品分類の再確認",
      content:
        "2024年度税制改正により一部税率が変更されたことを受け、既存製品の分類と税率適用について再確認を実施した事例。",
      date: "2024-01-15",
      expert: "田中三郎",
      department: "品質保証部",
      status: "解決済み",
      category: "税制改正",
      outcome: "既存分類の継続確認",
    },
    {
      id: "case_200",
      title: "クラフトビール新商品の分類確認",
      summary: "特殊な副原料を使用したクラフトビールの税務分類",
      content:
        "地域特産品を副原料として使用したクラフトビールの税務分類について事前確認を実施。副原料の性質と使用量から適切な分類を判定。",
      date: "2024-01-08",
      expert: "山田花子",
      department: "品質保証部",
      status: "解決済み",
      category: "新商品",
      outcome: "発泡酒第二区分として承認",
    },
    {
      id: "case_199",
      title: "アルコール度数測定方法の統一",
      summary: "複数工場での測定方法統一に関する税務署相談",
      content:
        "全国の製造拠点でアルコール度数測定方法を統一するため、税務署との事前協議を実施。統一基準の策定と承認を得た。",
      date: "2023-12-22",
      expert: "佐藤次郎",
      department: "品質保証部",
      status: "解決済み",
      category: "測定統一",
      outcome: "統一基準の承認取得",
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // 検索処理のシミュレーション
    setTimeout(() => {
      let results: any[] = []

      if (searchType === "all" || searchType === "law") {
        const lawResults = mostReferencedItems.filter(
          (item) =>
            item.type === "法令" &&
            (searchQuery === "" ||
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.content.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        results = [...results, ...lawResults]
      }

      if (searchType === "all" || searchType === "case") {
        const caseResults = [...mostReferencedItems.filter((item) => item.type === "事例"), ...recentCases].filter(
          (item) =>
            searchQuery === "" ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        results = [...results, ...caseResults]
      }

      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "法令":
        return <Badge className="bg-orange-600 text-white text-xs">法令</Badge>
      case "事例":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">事例</Badge>
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
        )
    }
  }

  const breadcrumbItems = [{ label: "酒税法・DB検索" }]

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">酒税法・DB検索</h2>
              <p className="text-gray-600">酒税法条文、過去の事例、税務署とのやり取りを検索して参考にできます。</p>
            </div>

            {/* 検索セクション */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  検索
                </CardTitle>
                <CardDescription>キーワードを入力して関連する法令や事例を検索してください</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="search">キーワード検索</Label>
                      <Input
                        id="search"
                        placeholder="例：発泡酒、麦芽比率、税率"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">検索対象</Label>
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべて</SelectItem>
                          <SelectItem value="law">法令のみ</SelectItem>
                          <SelectItem value="case">事例のみ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" disabled={isSearching} className="w-full bg-blue-600 hover:bg-blue-700">
                        {isSearching ? (
                          "検索中..."
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            検索
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* 検索結果 */}
            {searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    検索結果 ({searchResults.length}件)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-lg">{item.title}</h4>
                          <div className="flex items-center space-x-2">
                            {getTypeBadge(item.type || "事例")}
                            {item.referenceCount && (
                              <div className="flex items-center text-xs text-gray-500">
                                <Eye className="w-3 h-3 mr-1" />
                                {item.referenceCount}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          {item.lastUpdated && (
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.lastUpdated}
                            </div>
                          )}
                          {item.date && (
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.date}
                            </div>
                          )}
                          {item.expert && (
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {item.expert}
                            </div>
                          )}
                          {item.category && (
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* デフォルト表示 */}
            {searchResults.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 最も参照されたもの */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      最も参照されたもの
                    </CardTitle>
                    <CardDescription>よく参照される法令と事例</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {mostReferencedItems.slice(0, 8).map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedItem(item)}
                        >
                          <div className="flex items-start justify-between mb-1">
                            {getTypeBadge(item.type)}
                            <div className="flex items-center text-xs text-gray-500">
                              <Eye className="w-3 h-3 mr-1" />
                              {item.referenceCount}
                            </div>
                          </div>
                          <h5 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h5>
                          <p className="text-xs text-gray-600 line-clamp-2">{item.summary}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 最新の事例 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Clock className="w-5 h-5 mr-2" />
                      最新の事例
                    </CardTitle>
                    <CardDescription>最近の相談事例と解決例</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {recentCases.map((case_) => (
                        <div
                          key={case_.id}
                          className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedItem(case_)}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                              {case_.date}
                            </Badge>
                            <Badge
                              variant={case_.status === "解決済み" ? "default" : "secondary"}
                              className={`text-xs ${case_.status === "解決済み" ? "bg-yellow-600 text-white" : "bg-orange-100 text-orange-800"}`}
                            >
                              {case_.status}
                            </Badge>
                          </div>
                          <h5 className="font-medium text-sm mb-1 line-clamp-2">{case_.title}</h5>
                          <p className="text-xs text-gray-600 mb-1 line-clamp-2">{case_.summary}</p>
                          <p className="text-xs text-gray-500">担当: {case_.expert}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 詳細モーダル */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedItem.title}</h2>
                  <div className="flex items-center space-x-3">
                    {getTypeBadge(selectedItem.type || "事例")}
                    {selectedItem.category && <Badge variant="outline">{selectedItem.category}</Badge>}
                    {selectedItem.referenceCount && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        参照回数: {selectedItem.referenceCount}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* 基本情報 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">基本情報</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2 text-sm">
                    <div>
                      <span className="font-medium">概要:</span> {selectedItem.summary}
                    </div>
                    {selectedItem.lastUpdated && (
                      <div>
                        <span className="font-medium">最終更新:</span> {selectedItem.lastUpdated}
                      </div>
                    )}
                    {selectedItem.date && (
                      <div>
                        <span className="font-medium">日付:</span> {selectedItem.date}
                      </div>
                    )}
                    {selectedItem.expert && (
                      <div>
                        <span className="font-medium">担当者:</span> {selectedItem.expert} ({selectedItem.department})
                      </div>
                    )}
                    {selectedItem.outcome && (
                      <div>
                        <span className="font-medium">結果:</span> {selectedItem.outcome}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 詳細内容 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">詳細内容</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedItem.content}</p>
                  </CardContent>
                </Card>

                {/* 関連条文 */}
                {selectedItem.relatedArticles && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">関連条文</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.relatedArticles.map((article: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Scale className="w-3 h-3 mr-1" />
                            {article}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
