import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30"); // days
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("appointments");

  useEffect(() => {
    // Mock analytics data
    const mockData = {
      summary: {
        totalPatients: 1245,
        totalAppointments: 892,
        completedAppointments: 765,
        cancelledAppointments: 127,
        revenue: 245000000,
        averageWaitTime: 15, // minutes
      },
      trends: {
        appointments: [
          { date: "2024-12-01", count: 28 },
          { date: "2024-12-02", count: 32 },
          { date: "2024-12-03", count: 25 },
          { date: "2024-12-04", count: 38 },
          { date: "2024-12-05", count: 42 },
          { date: "2024-12-06", count: 35 },
          { date: "2024-12-07", count: 40 },
        ],
        patients: [
          { date: "2024-12-01", new: 8, returning: 20 },
          { date: "2024-12-02", new: 12, returning: 20 },
          { date: "2024-12-03", new: 6, returning: 19 },
          { date: "2024-12-04", new: 15, returning: 23 },
          { date: "2024-12-05", new: 18, returning: 24 },
          { date: "2024-12-06", new: 10, returning: 25 },
          { date: "2024-12-07", new: 14, returning: 26 },
        ],
      },
      demographics: {
        ageGroups: [
          { range: "0-18", count: 156, percentage: 12.5 },
          { range: "19-35", count: 374, percentage: 30.0 },
          { range: "36-50", count: 435, percentage: 35.0 },
          { range: "51-65", count: 218, percentage: 17.5 },
          { range: "65+", count: 62, percentage: 5.0 },
        ],
        genderDistribution: [
          { gender: "Nam", count: 598, percentage: 48.0 },
          { gender: "Nữ", count: 647, percentage: 52.0 },
        ],
      },
      departments: [
        { name: "Nội khoa", appointments: 245, revenue: 89000000 },
        { name: "Ngoại khoa", appointments: 189, revenue: 67000000 },
        { name: "Sản phụ khoa", appointments: 156, revenue: 52000000 },
        { name: "Nhi khoa", appointments: 134, revenue: 23000000 },
        { name: "Răng hàm mặt", appointments: 98, revenue: 14000000 },
        { name: "Mắt", appointments: 70, revenue: 8000000 },
      ],
    };

    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, [timeRange]);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Phân tích & Thống kê" />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Phân tích & Thống kê" />
        <main className="flex-1 p-6">
          {/* Time Range Selector */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Phân tích
            </h1>
            <div className="flex space-x-2">
              {[
                { value: "7", label: "7 ngày" },
                { value: "30", label: "30 ngày" },
                { value: "90", label: "3 tháng" },
                { value: "365", label: "1 năm" },
              ].map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range.value
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng bệnh nhân
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.summary.totalPatients.toLocaleString()}
                  </p>
                  <p className="text-green-600 text-sm font-medium">
                    ↗ 12.5% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Lịch hẹn hoàn thành
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.summary.completedAppointments}
                  </p>
                  <p className="text-green-600 text-sm font-medium">
                    ↗ 8.2% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Doanh thu</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(analyticsData.summary.revenue)}
                  </p>
                  <p className="text-green-600 text-sm font-medium">
                    ↗ 15.3% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Thời gian chờ TB
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.summary.averageWaitTime} phút
                  </p>
                  <p className="text-red-600 text-sm font-medium">
                    ↘ 5.1% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏱️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Appointments Trend */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Xu hướng lịch hẹn
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveChart("appointments")}
                    className={`px-3 py-1 rounded text-sm ${
                      activeChart === "appointments"
                        ? "bg-green-100 text-green-600"
                        : "text-gray-600 hover:text-green-600"
                    }`}
                  >
                    Lịch hẹn
                  </button>
                  <button
                    onClick={() => setActiveChart("patients")}
                    className={`px-3 py-1 rounded text-sm ${
                      activeChart === "patients"
                        ? "bg-green-100 text-green-600"
                        : "text-gray-600 hover:text-green-600"
                    }`}
                  >
                    Bệnh nhân
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-end space-x-2">
                {activeChart === "appointments" &&
                  analyticsData.trends.appointments.map((item, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{
                          height: `${(item.count / 50) * 100}%`,
                          minHeight: "20px",
                        }}
                      ></div>
                      <p className="text-xs text-gray-600 mt-2">
                        {new Date(item.date).getDate()}
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {item.count}
                      </p>
                    </div>
                  ))}
                {activeChart === "patients" &&
                  analyticsData.trends.patients.map((item, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div className="w-full flex flex-col">
                        <div
                          className="w-full bg-blue-500 rounded-t"
                          style={{
                            height: `${(item.new / 30) * 100}%`,
                            minHeight: "10px",
                          }}
                        ></div>
                        <div
                          className="w-full bg-green-500"
                          style={{
                            height: `${(item.returning / 30) * 100}%`,
                            minHeight: "10px",
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {new Date(item.date).getDate()}
                      </p>
                    </div>
                  ))}
              </div>
              {activeChart === "patients" && (
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Bệnh nhân mới</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Tái khám</span>
                  </div>
                </div>
              )}
            </div>

            {/* Demographics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Phân bố độ tuổi
              </h3>
              <div className="space-y-3">
                {analyticsData.demographics.ageGroups.map((group, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">
                      {group.range}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                          style={{ width: `${group.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-gray-900 text-right">
                      {group.count}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {analyticsData.demographics.genderDistribution.map(
                  (item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {item.count}
                      </div>
                      <div className="text-sm text-gray-600">{item.gender}</div>
                      <div className="text-xs text-green-600">
                        {item.percentage}%
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Department Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Hiệu suất theo khoa
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Khoa
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Số lịch hẹn
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Doanh thu
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Doanh thu/Lịch hẹn
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Hiệu suất
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.departments.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {dept.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {dept.appointments}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatCurrency(dept.revenue)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatCurrency(dept.revenue / dept.appointments)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${(dept.appointments / 250) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {Math.round((dept.appointments / 250) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Xuất PDF
            </button>
            <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Xuất Excel
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Tạo báo cáo tùy chỉnh
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
