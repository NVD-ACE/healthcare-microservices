// src/components/Solutions.jsx
import React, { useState } from 'react'

const tabGroup1 = ['Ảo hóa', 'Nhân sự y tế']
const tabGroup2 = ['Y tế từ xa', 'Nền tảng']

const features = [
  {
    title: 'Giải pháp ảo hóa cho phòng khám',
    description: 'Chuyển đổi số toàn diện cho cơ sở y tế truyền thống',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    title: 'Phủ sóng 63 tỉnh thành',
    description: 'Dịch vụ y tế trực tuyến trên toàn quốc',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 hover:bg-green-100'
  },
  {
    title: 'Hồ sơ bệnh án điện tử',
    description: 'Quản lý thông tin bệnh nhân an toàn, bảo mật',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    title: 'Kê đơn thuốc điện tử',
    description: 'Hệ thống kê đơn thông minh, chính xác',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
      </svg>
    ),
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 hover:bg-orange-100'
  },
  {
    title: 'Tư vấn trực tuyến 24/7',
    description: 'Hỗ trợ bệnh nhân mọi lúc, mọi nơi',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100'
  },
  {
    title: 'AI Chẩn đoán thông minh',
    description: 'Công nghệ AI hỗ trợ chẩn đoán chính xác',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50 hover:bg-teal-100'
  },
  {
    title: 'Thanh toán trực tuyến',
    description: 'Hệ thống thanh toán an toàn, tiện lợi',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50 hover:bg-yellow-100'
  },
  {
    title: 'Phân tích dữ liệu y tế',
    description: 'Báo cáo thống kê chi tiết, trực quan',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50 hover:bg-pink-100'
  }
]

export default function Solutions() {
  const [active1, setActive1] = useState(tabGroup1[0])
  const [active2, setActive2] = useState(tabGroup2[0])
  // const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section className="relative px-6 lg:px-12 py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-sm font-medium mb-6">
            🚀 Giải pháp toàn diện
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Bộ giải pháp hoàn chỉnh để nâng cao{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                chăm sóc ảo
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200 opacity-30 rounded"></div>
            </span>{" "}
            của bạn
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá các giải pháp white-label được thiết kế chuyên nghiệp bởi MedTech Vietnam, 
            giúp bạn xây dựng hệ thống y tế số hoàn hảo.
          </p>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="flex flex-wrap gap-2">
            {tabGroup1.map(tab => (
              <button
                key={tab}
                onClick={() => setActive1(tab)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  active1 === tab 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tabGroup2.map(tab => (
              <button
                key={tab}
                onClick={() => setActive2(tab)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  active2 === tab 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              // onMouseEnter={() => setHoveredCard(i)}
              // onMouseLeave={() => setHoveredCard(null)}
              className={`relative group ${feature.bgColor} rounded-3xl p-8 border border-gray-100 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden`}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              {/* Icon container */}
              <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} p-[1px]`}>
                  <div className={`w-full h-full ${feature.bgColor} rounded-3xl`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a 
              href="/solutions" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
            >
              Xem tất cả giải pháp
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            
            <a 
              href="/demo" 
              className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Xem demo trực tiếp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}