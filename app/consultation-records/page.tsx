"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumb } from "@/components/breadcrumb"
import { FileText, Search, Calendar, User, CheckCircle, Clock, AlertCircle, Eye, Filter } from "lucide-react"

// 模擬的な相談記録データ
const consultationRecords = [
  {
    id: "CONS-2024-001",
    date: "2024-01-15",
    title: "新商品発泡酒の税区分確認",
    description: "アルコール度数3.5%、麦芽比率25%の新商品について税務署への事前相談",
    category: "発泡酒",
    status: "完了",
    expert: "山田花子",
    expertTitle: "主任",
    submittedBy: "田中太郎",
    department: "企画開発部",
    response: {
      summary: "麦芽比率25%は発泡酒第二区分に該当し、税率134.25円/Lが適用されます。",
      details:
        "提出いただいた資料を確認した結果、本商品は酒税法第23条第2号に基づき発泡酒第二区分として分類されます。副原料の使用量についても基準内であることを確認しました。",
      recommendations: [
        "製造開始前に税務署への事前届出を実施してください",
        "原料配合表は乾燥重量ベースで正確に記録してください",
        "容器表示については別途確認が必要です",
      ],
      attachments: ["税区分判定書.pdf", "原料配合表.xlsx"],
    },
    responseDate: "2024-01-18",
    priority: "高",
  },
  {
    id: "CONS-2024-002",
    date: "2024-01-08",
    title: "クラフトビール特殊原料使用時の分類",
    description: "ホップ以外の香料を使用したクラフトビールの税務分類について",
    category: "ビール",
    status: "完了",
    expert: "佐藤次郎",
    expertTitle: "係長",
    submittedBy: "田中太郎",
    department: "企画開発部",
    response: {
      summary: "使用予定の香料は酒税法上の「その他の物品」に該当し、ビール分類から除外されます。",
      details:
        "ご相談の香料については、酒税法施行令第6条の規定により「その他の物品」に分類されるため、本商品はビールではなく発泡酒として取り扱われます。",
      recommendations: [
        "発泡酒としての税率計算を行ってください",
        "製品表示を「発泡酒」に変更してください",
        "香料の使用量について詳細な記録を保管してください",
      ],
      attachments: ["香料成分分析書.pdf"],
    },
    responseDate: "2024-01-10",
    priority: "中",
  },
  {
    id: "CONS-2023-045",
    date: "2023-12-22",
    title: "アルコール度数測定方法の統一",
    description: "複数工場での測定方法統一に関する税務署相談準備",
    category: "測定・検査",
    status: "完了",
    expert: "田中三郎",
    expertTitle: "課長",
    submittedBy: "田中太郎",
    department: "企画開発部",
    response: {
      summary: "測定方法の統一案について税務署との協議を実施し、承認を得ました。",
      details:
        "各工場での測定方法について統一基準を策定し、税務署との事前協議を経て正式に承認されました。新基準は2024年4月から適用開始予定です。",
      recommendations: [
        "各工場への新基準の周知徹底を行ってください",
        "測定機器の校正スケジュールを見直してください",
        "記録様式を統一してください",
      ],
      attachments: ["測定方法統一基準.pdf", "税務署協議議事録.pdf"],
    },
    responseDate: "2023-12-25",
    priority: "高",
  },
  {
    id: "CONS-2023-038",
    date: "2023-11-15",
    title: "季節限定商品の表示要件確認",
    description: "期間限定販売商品の容器表示について",
    category: "表示・ラベル",
    status: "進行中",
    expert: "山田花子",
    expertTitle: "主任",
    submittedBy: "田中太郎",
    department: "企画開発部",
    response: null,
    responseDate: null,
    priority: "低",
  },
]

export default function ConsultationRecordsPage() {
  const [user, setUser] = useState<any>(null)
  const [records, setRecords] = useState(consultationRecords)
  const [filteredRecords, setFilteredRecords] = useState(consultationRecords)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  useEffect(() => {
    let filtered = records

    // 検索フィルター
    if (searchQuery) {
      filtered = filtered.filter(
        (record) =>
          record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.expert.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // ステータスフィルター
    if (statusFilter !== "all") {
      filtered = filtered.filter((record) => record.status === statusFilter)
    }

    // カテゴリフィルター
    if (categoryFilter !== "all") {
      filtered = filtered.filter((record) => record.category === categoryFilter)
    }

    setFilteredRecords(filtered)
  }, [searchQuery, statusFilter, categoryFilter, records])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "完了":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            完了
          </Badge>
        )
      case "進行中":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            進行中
          </Badge>
        )
      case "保留":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="w-3 h-3 mr-1" />
            保留
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "高":
        return (
          <Badge variant="destructive" className="text-xs">
            高
          </Badge>
        )
      case "中":
        return (
          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
            中
          </Badge>
        )
      case "低":
        return (
          <Badge variant="outline" className="text-xs">
            低
          </Badge>
        )
      default:
        return null
    }
  }

  const breadcrumbItems = [{ label: "相談記録" }]

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">相談記録</h2>
              <p className="text-gray-600">過去に提出した酒税相談の履歴と回答結果を確認できます。</p>
            </div>

            {/* フィルターセクション */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Filter className="w-5 h-5 mr-2" />
                  検索・フィルター
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="search">キーワード検索</Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="タイトル、内容、担当者名で検索"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">ステータス</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="完了">完了</SelectItem>
                        <SelectItem value="進行中">進行中</SelectItem>
                        <SelectItem value="保留">保留</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">カテゴリ</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="発泡酒">発泡酒</SelectItem>
                        <SelectItem value="ビール">ビール</SelectItem>
                        <SelectItem value="測定・検査">測定・検査</SelectItem>
                        <SelectItem value="表示・ラベル">表示・ラベル</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 相談記録一覧 */}
            <div className="grid grid-cols-1 gap-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{record.title}</h3>
                          {getStatusBadge(record.status)}
                          {getPriorityBadge(record.priority)}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{record.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {record.date}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {record.expert} ({record.expertTitle})
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {record.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-xs text-gray-500">ID: {record.id}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                          className="border-orange-300 text-orange-700 hover:bg-orange-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          詳細
                        </Button>
                      </div>
                    </div>

                    {record.response && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-800">回答済み ({record.responseDate})</span>
                        </div>
                        <p className="text-sm text-green-700">{record.response.summary}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecords.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">該当する相談記録がありません</h3>
                  <p className="text-gray-600">検索条件を変更するか、新しい相談を作成してください。</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* 詳細モーダル */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedRecord.title}</h2>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(selectedRecord.status)}
                    {getPriorityBadge(selectedRecord.priority)}
                    <Badge variant="outline">{selectedRecord.category}</Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* 基本情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">相談情報</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                      <div>
                        <span className="font-medium">ID:</span> {selectedRecord.id}
                      </div>
                      <div>
                        <span className="font-medium">提出日:</span> {selectedRecord.date}
                      </div>
                      <div>
                        <span className="font-medium">提出者:</span> {selectedRecord.submittedBy} (
                        {selectedRecord.department})
                      </div>
                      <div>
                        <span className="font-medium">カテゴリ:</span> {selectedRecord.category}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">担当者情報</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                      <div>
                        <span className="font-medium">担当者:</span> {selectedRecord.expert}
                      </div>
                      <div>
                        <span className="font-medium">役職:</span> {selectedRecord.expertTitle}
                      </div>
                      {selectedRecord.responseDate && (
                        <div>
                          <span className="font-medium">回答日:</span> {selectedRecord.responseDate}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* 相談内容 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">相談内容</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-700">{selectedRecord.description}</p>
                  </CardContent>
                </Card>

                {/* 回答内容 */}
                {selectedRecord.response ? (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-green-800 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        担当者回答
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-green-800 mb-2">回答要約</h4>
                        <p className="text-sm text-green-700">{selectedRecord.response.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-green-800 mb-2">詳細回答</h4>
                        <p className="text-sm text-green-700">{selectedRecord.response.details}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-green-800 mb-2">推奨事項</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedRecord.response.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="text-sm text-green-700">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedRecord.response.attachments && (
                        <div>
                          <h4 className="font-medium text-sm text-green-800 mb-2">添付資料</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedRecord.response.attachments.map((file: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700">
                                <FileText className="w-3 h-3 mr-1" />
                                {file}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-center text-yellow-800">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">回答待ち</span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">担当者からの回答をお待ちください。</p>
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
