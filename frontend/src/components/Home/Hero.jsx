import React from 'react'
import doctorImg from '../../assets/branch5.jpg'
import avatar from '../../assets/avatar.jpg'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center px-6 lg:px-12 py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-200 rounded-full blur-xl"></div>
      </div>

      {/* LEFT CONTENT */}
      <div className="w-full lg:w-1/2 space-y-8 z-10 order-2 lg:order-1">
        <div className="space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✨ Giải pháp y tế hàng đầu Việt Nam
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight text-gray-900">
            Chăm sóc sức khỏe{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                từ xa
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 opacity-30 rounded"></div>
            </span>{' '}
            chuyên nghiệp
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
            Nền tảng khám chữa bệnh trực tuyến hiện đại, kết nối bạn với các bác sĩ giỏi nhất mọi lúc, mọi nơi.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/appointments" 
             className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
            Bắt đầu ngay
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          
          <a href="/book" 
             className="px-8 py-4 bg-white text-green-700 rounded-2xl font-semibold text-lg border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 flex items-center justify-center">
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Đặt lịch tư vấn
          </a>
        </div>

        {/* Stats & Social Proof */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[avatar, avatar, avatar, avatar, avatar].map((src, i) => (
                <img 
                  key={i} 
                  src={src}
                  className="w-12 h-12 rounded-full border-3 border-white shadow-md hover:scale-110 transition-transform duration-200" 
                  alt={`Bệnh nhân ${i + 1}`}
                />
              ))}
              <div className="w-12 h-12 rounded-full border-3 border-white bg-green-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                +1K
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                1000+ <span className="text-lg font-normal text-gray-600">bệnh nhân hài lòng</span>
              </p>
              <div className="flex items-center text-yellow-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className="ml-2 text-gray-600 text-sm">4.9/5 đánh giá</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="pt-4">
          <a href="/partner" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group">
            Quan tâm đến hợp tác với chúng tôi?
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-12 lg:mb-0">
        <div className="relative">
          <img 
            src={doctorImg} 
            alt="Bác sĩ chuyên nghiệp" 
            className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" 
          />
          
          {/* Floating Card 1 - Support */}
          <div className="absolute bottom-6 left-4 lg:left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-white/20 animate-pulse hover:animate-none transition-all group hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Hỗ trợ 24/7</p>
                <p className="text-sm text-gray-600">Phòng khám trực tuyến</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="ml-2 text-xs text-green-600 font-medium">Đang hoạt động</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 2 - Features */}
          <div className="absolute top-8 right-4 lg:right-8 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-white/20 group hover:scale-105 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Linh hoạt & Tiện lợi</p>
                <p className="text-xs text-gray-500">Khám bệnh mọi lúc, mọi nơi</p>
              </div>
            </div>
          </div>

          {/* Floating Card 3 - Quality */}
          <div className="absolute top-1/2 -left-2 lg:left-0 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20 group hover:scale-105 transition-all">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900">Chất lượng cao</p>
              <p className="text-xs text-gray-500">Bác sĩ giỏi nhất</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}