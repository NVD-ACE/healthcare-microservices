import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("lab");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30"); // days

  const reportTabs = [
    { id: "lab", name: "Xét nghiệm", icon: "🧪" },
    { id: "medical", name: "Khám bệnh", icon: "🏥" },
    { id: "prescription", name: "Đơn thuốc", icon: "💊" },
    { id: "imaging", name: "Chẩn đoán hình ảnh", icon: "📷" },
  ];
  useEffect(() => {
    // Mock data for reports
    const mockReports = {
      lab: [
        {
          id: 1,
          title: "Xét nghiệm máu tổng quát",
          date: "2024-12-08",
          doctor: "BS. Nguyễn Văn A",
          status: "Hoàn thành",
          result: "Bình thường",
          downloadUrl: "#",
        },
        {
          id: 2,
          title: "Xét nghiệm gan",
          date: "2024-12-05",
          doctor: "BS. Trần Thị B",
          status: "Hoàn thành",
          result: "Bất thường nhẹ",
          downloadUrl: "#",
        },
        {
          id: 3,
          title: "Xét nghiệm đường huyết",
          date: "2024-12-01",
          doctor: "BS. Lê Văn C",
          status: "Đang xử lý",
          result: "Đang chờ kết quả",
          downloadUrl: null,
        },
      ],
      medical: [
        {
          id: 1,
          title: "Khám tổng quát định kỳ",
          date: "2024-12-07",
          doctor: "BS. Phạm Thị D",
          status: "Hoàn thành",
          diagnosis: "Sức khỏe tốt",
          downloadUrl: "#",
        },
        {
          id: 2,
          title: "Khám tim mạch",
          date: "2024-11-28",
          doctor: "BS. Hoàng Văn E",
          status: "Hoàn thành",
          diagnosis: "Huyết áp cao nhẹ",
          downloadUrl: "#",
        },
      ],
      prescription: [
        {
          id: 1,
          title: "Đơn thuốc điều trị cảm cúm",
          date: "2024-12-06",
          doctor: "BS. Nguyễn Văn A",
          status: "Đã cấp",
          medications: ["Paracetamol 500mg", "Vitamin C"],
          downloadUrl: "#",
        },
      ],
      imaging: [
        {
          id: 1,
          title: "X-quang phổi",
          date: "2024-11-30",
          doctor: "BS. Vũ Thị F",
          status: "Hoàn thành",
          result: "Phổi bình thường",
          downloadUrl: "#",
        },
      ],
    };

    // Simulate API call
    const fetchReports = async () => {
      setLoading(true);
      try {
        // In real app, call API: const response = await api.get('/reports', { params: { type: activeTab, days: dateRange } });
        setTimeout(() => {
          setReports(mockReports[activeTab] || []);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReports(mockReports[activeTab] || []);
        setLoading(false);
      }
    };

    fetchReports();
  }, [activeTab, dateRange]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
      case "Đã cấp":
        return "bg-green-100 text-green-800";
      case "Đang xử lý":
      case "Đang chờ kết quả":
        return "bg-yellow-100 text-yellow-800";
      case "Hủy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const exportReports = () => {
    // Simulate export functionality
    alert("Xuất báo cáo thành công! File sẽ được tải xuống...");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="w-64" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="p-6 overflow-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Báo cáo y tế
            </h1>
            <p className="text-gray-600">
              Quản lý và xem tất cả các báo cáo y tế của bạn
            </p>
          </div>
          {/* Filters and Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="dateRange"
                  className="text-sm font-medium text-gray-700"
                >
                  Khoảng thời gian:
                </label>
                <select
                  id="dateRange"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="7">7 ngày qua</option>
                  <option value="30">30 ngày qua</option>
                  <option value="90">3 tháng qua</option>
                  <option value="365">12 tháng qua</option>
                </select>
              </div>

              <button
                onClick={exportReports}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Xuất báo cáo
              </button>
            </div>
          </div>
          {/* Report Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {reportTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Reports Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <span className="ml-2 text-gray-600">Đang tải...</span>
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có báo cáo
                  </h3>
                  <p className="text-gray-600">
                    Không có báo cáo nào trong khoảng thời gian đã chọn.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {report.title}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Ngày:</span>{" "}
                              {new Date(report.date).toLocaleDateString(
                                "vi-VN"
                              )}
                            </div>
                            <div>
                              <span className="font-medium">Bác sĩ:</span>{" "}
                              {report.doctor}
                            </div>
                            <div>
                              <span className="font-medium">
                                {activeTab === "lab"
                                  ? "Kết quả:"
                                  : activeTab === "medical"
                                  ? "Chẩn đoán:"
                                  : activeTab === "prescription"
                                  ? "Thuốc:"
                                  : "Kết quả:"}
                              </span>{" "}
                              {report.result ||
                                report.diagnosis ||
                                (report.medications &&
                                  report.medications.join(", "))}
                            </div>
                            <div>
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  report.status
                                )}`}
                              >
                                {report.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>

                          {report.downloadUrl && (
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>{" "}
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-sm">🧪</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Xét nghiệm
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🏥</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Khám bệnh
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">2</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-sm">💊</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Đơn thuốc
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">1</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-sm">📷</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Chẩn đoán hình ảnh
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">1</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
