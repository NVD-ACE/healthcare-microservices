"use client"

import { useState } from "react"

// Dữ liệu mẫu cho kết quả xét nghiệm
const mockLabResults = [
  {
    id: 1,
    order: {
      id: "ORD-2024-001",
      test: {
        name: "Công thức máu toàn phần (CBC)",
        description: "Phân tích đầy đủ các thành phần máu",
      },
    },
    result_date: "2024-01-15",
    result_text:
      "Tất cả các chỉ số trong giới hạn bình thường. Bạch cầu: 7.200/μL, Hồng cầu: 4,8 triệu/μL, Hemoglobin: 14,2 g/dL, Hematocrit: 42%",
    result_file: null,
  },
  {
    id: 2,
    order: {
      id: "ORD-2024-002",
      test: {
        name: "Xét nghiệm mỡ máu",
        description: "Kiểm tra cholesterol và triglyceride",
      },
    },
    result_date: "2024-01-20",
    result_text:
      "Cholesterol toàn phần: 220 mg/dL (Cao), LDL: 140 mg/dL (Cao), HDL: 45 mg/dL, Triglycerides: 180 mg/dL",
    result_file: "/sample-lipid-report.pdf",
  },
  {
    id: 3,
    order: {
      id: "ORD-2024-003",
      test: {
        name: "Xét nghiệm chức năng tuyến giáp",
        description: "Kiểm tra nồng độ TSH, T3, T4",
      },
    },
    result_date: "2024-01-25",
    result_text: "TSH: 2,1 mIU/L (Bình thường), Free T4: 1,3 ng/dL (Bình thường), Free T3: 3,2 pg/mL (Bình thường)",
    result_file: null,
  },
  {
    id: 4,
    order: {
      id: "ORD-2024-004",
      test: {
        name: "Đường huyết",
        description: "Xét nghiệm đường huyết lúc đói",
      },
    },
    result_date: "2024-02-01",
    result_text: "Đường huyết lúc đói: 95 mg/dL (Bình thường), HbA1c: 5,4% (Kiểm soát đường huyết tốt)",
    result_file: null,
  },
  {
    id: 5,
    order: {
      id: "ORD-2024-005",
      test: {
        name: "Chức năng gan",
        description: "Kiểm tra ALT, AST, Bilirubin",
      },
    },
    result_date: "2024-02-05",
    result_text: null, // Kết quả đang chờ
    result_file: null,
  },
  {
    id: 6,
    order: {
      id: "ORD-2024-006",
      test: {
        name: "Chức năng thận",
        description: "Kiểm tra Creatinine và BUN",
      },
    },
    result_date: "2024-02-08",
    result_text: "Creatinine: 1,8 mg/dL (Cao), BUN: 25 mg/dL (Bất thường), eGFR: 45 mL/min (Thấp)",
    result_file: "/sample-kidney-report.pdf",
  },
]

// Dữ liệu mẫu cho đơn thuốc
const mockPrescriptions = [
  {
    id: 1,
    medication: "Lisinopril 10mg",
    prescriber: "Bs. Nguyễn Văn A",
    date_prescribed: "2024-01-15",
    quantity: "30 viên",
    refills: 2,
    status: "Đang dùng",
  },
  {
    id: 2,
    medication: "Metformin 500mg",
    prescriber: "Bs. Trần Thị B",
    date_prescribed: "2024-01-20",
    quantity: "60 viên",
    refills: 5,
    status: "Đang dùng",
  },
  {
    id: 3,
    medication: "Atorvastatin 20mg",
    prescriber: "Bs. Nguyễn Văn A",
    date_prescribed: "2024-02-01",
    quantity: "30 viên",
    refills: 3,
    status: "Đã cấp",
  },
]

export default function ReportsTable() {
  const [activeTab, setActiveTab] = useState("lab")

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getResultStatus = (resultText) => {
    if (!resultText) return { text: "Chờ kết quả", style: "bg-yellow-100 text-yellow-700" }

    const text = resultText.toLowerCase()
    if (
      text.includes("bình thường") ||
      text.includes("âm tính") ||
      text.includes("tốt") ||
      text.includes("normal") ||
      text.includes("negative") ||
      text.includes("good")
    ) {
      return { text: "Bình thường", style: "bg-green-100 text-green-700" }
    } else if (
      text.includes("bất thường") ||
      text.includes("dương tính") ||
      text.includes("cao") ||
      text.includes("thấp") ||
      text.includes("abnormal") ||
      text.includes("positive") ||
      text.includes("high") ||
      text.includes("low")
    ) {
      return { text: "Bất thường", style: "bg-red-100 text-red-700" }
    } else {
      return { text: "Cần xem xét", style: "bg-blue-100 text-blue-700" }
    }
  }

  const getPrescriptionStatus = (status) => {
    switch (status.toLowerCase()) {
      case "đang dùng":
        return { text: "Đang dùng", style: "bg-green-100 text-green-700" }
      case "đã cấp":
        return { text: "Đã cấp", style: "bg-blue-100 text-blue-700" }
      case "hết hạn":
        return { text: "Hết hạn", style: "bg-gray-100 text-gray-700" }
      default:
        return { text: status, style: "bg-gray-100 text-gray-700" }
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab("lab")}
          className={`px-4 py-1 rounded-full transition-colors ${
            activeTab === "lab" ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Kết quả xét nghiệm
        </button>
        <button
          onClick={() => setActiveTab("prescription")}
          className={`px-4 py-1 rounded-full transition-colors ${
            activeTab === "prescription" ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Đơn thuốc
        </button>
      </div>

      {/* Lab Reports Tab */}
      {activeTab === "lab" && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b">
                <tr>
                  <th className="py-2 px-2">Tên xét nghiệm</th>
                  <th className="py-2 px-2">Mã đơn</th>
                  <th className="py-2 px-2">Ngày</th>
                  <th className="py-2 px-2">Kết quả</th>
                  <th className="py-2 px-2">Trạng thái</th>
                  <th className="py-2 px-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {mockLabResults.map((result) => {
                  const status = getResultStatus(result.result_text)
                  return (
                    <tr key={result.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="font-medium">{result.order?.test?.name || "Xét nghiệm không xác định"}</div>
                        <div className="text-xs text-gray-500">{result.order?.test?.description || ""}</div>
                      </td>
                      <td className="py-3 px-2 text-gray-600">#{result.order?.id || "N/A"}</td>
                      <td className="py-3 px-2 text-gray-600">{formatDate(result.result_date)}</td>
                      <td className="py-3 px-2">
                        <div className="max-w-xs">
                          {result.result_text ? (
                            <div className="text-sm">
                              {result.result_text.length > 50
                                ? `${result.result_text.substring(0, 50)}...`
                                : result.result_text}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">Đang chờ</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.style}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          {result.result_file && (
                            <button
                              onClick={() => alert(`Sẽ mở file: ${result.result_file}`)}
                              className="text-blue-600 hover:text-blue-800 text-xs underline"
                            >
                              Xem file
                            </button>
                          )}
                          <button
                            onClick={() => {
                              alert(`Kết quả chi tiết:\n${result.result_text || "Chưa có kết quả"}`)
                            }}
                            className="text-gray-600 hover:text-gray-800 text-xs underline"
                          >
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === "prescription" && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b">
                <tr>
                  <th className="py-2 px-2">Thuốc</th>
                  <th className="py-2 px-2">Bác sĩ kê đơn</th>
                  <th className="py-2 px-2">Ngày kê đơn</th>
                  <th className="py-2 px-2">Số lượng</th>
                  <th className="py-2 px-2">Tái kê</th>
                  <th className="py-2 px-2">Trạng thái</th>
                  <th className="py-2 px-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {mockPrescriptions.map((prescription) => {
                  const status = getPrescriptionStatus(prescription.status)
                  return (
                    <tr key={prescription.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="font-medium">{prescription.medication}</div>
                      </td>
                      <td className="py-3 px-2 text-gray-600">{prescription.prescriber}</td>
                      <td className="py-3 px-2 text-gray-600">{formatDate(prescription.date_prescribed)}</td>
                      <td className="py-3 px-2 text-gray-600">{prescription.quantity}</td>
                      <td className="py-3 px-2 text-gray-600">{prescription.refills} lần</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.style}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => alert(`Yêu cầu tái kê đơn thuốc: ${prescription.medication}`)}
                            className="text-blue-600 hover:text-blue-800 text-xs underline"
                          >
                            Tái kê
                          </button>
                          <button
                            onClick={() => alert(`Chi tiết đơn thuốc: ${prescription.medication}`)}
                            className="text-gray-600 hover:text-gray-800 text-xs underline"
                          >
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
