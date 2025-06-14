import React, { useState } from 'react';

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = {
    general: [
      {
        question: "Làm thế nào để đăng ký tài khoản?",
        answer: "Để đăng ký tài khoản, bạn có thể nhấp vào nút 'Đăng ký' ở góc trên bên phải của trang web, sau đó điền đầy đủ thông tin cá nhân và làm theo hướng dẫn."
      },
      {
        question: "Tôi quên mật khẩu, phải làm gì?",
        answer: "Bạn có thể nhấp vào 'Quên mật khẩu' ở trang đăng nhập, nhập email đã đăng ký và làm theo hướng dẫn để đặt lại mật khẩu mới."
      },
      {
        question: "Làm thế nào để cập nhật thông tin cá nhân?",
        answer: "Sau khi đăng nhập, vào phần 'Dashboard' và chọn 'Hồ sơ cá nhân' để cập nhật thông tin."
      }
    ],
    appointments: [
      {
        question: "Làm thế nào để đặt lịch khám?",
        answer: "Vào phần 'Dịch vụ' → 'Đặt lịch khám', chọn bác sĩ, ngày giờ phù hợp và điền lý do khám bệnh. Sau đó nhấn 'Đặt lịch'."
      },
      {
        question: "Tôi có thể hủy lịch khám không?",
        answer: "Có, bạn có thể hủy lịch khám trước 24 giờ qua phần 'Xem lịch khám' trong Dashboard."
      },
      {
        question: "Làm thế nào để xem lịch khám đã đặt?",
        answer: "Vào Dashboard và chọn tab 'Xem lịch khám' để xem tất cả các cuộc hẹn đã đặt."
      }
    ],
    technical: [
      {
        question: "Website không tải được, phải làm gì?",
        answer: "Hãy thử làm mới trang (F5), xóa cache trình duyệt hoặc liên hệ bộ phận hỗ trợ kỹ thuật."
      },
      {
        question: "Ứng dụng có hoạt động trên điện thoại không?",
        answer: "Có, website được thiết kế responsive và hoạt động tốt trên tất cả các thiết bị di động."
      },
      {
        question: "Tôi gặp lỗi khi thanh toán, phải làm gì?",
        answer: "Vui lòng kiểm tra thông tin thẻ, đảm bảo có đủ số dư và thử lại. Nếu vẫn lỗi, hãy liên hệ ngân hàng hoặc bộ phận hỗ trợ."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trung tâm hỗ trợ
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ với đội ngũ hỗ trợ của chúng tôi
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Đặt lịch khám</h3>
            <p className="text-gray-600 mb-4">Hướng dẫn đặt lịch và quản lý cuộc hẹn</p>
            <button 
              onClick={() => setActiveTab('appointments')}
              className="text-green-600 font-medium hover:text-green-700"
            >
              Xem hướng dẫn →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tài khoản</h3>
            <p className="text-gray-600 mb-4">Quản lý thông tin cá nhân và bảo mật</p>
            <button 
              onClick={() => setActiveTab('general')}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Xem hướng dẫn →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kỹ thuật</h3>
            <p className="text-gray-600 mb-4">Giải quyết các vấn đề kỹ thuật</p>
            <button 
              onClick={() => setActiveTab('technical')}
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              Xem hướng dẫn →
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Chung
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'appointments'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Đặt lịch khám
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'technical'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Kỹ thuật
              </button>
            </nav>
          </div>

          {/* FAQ Content */}
          <div className="p-6">
            <div className="space-y-4">
              {faqData[activeTab].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Không tìm thấy câu trả lời?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn giải quyết mọi thắc mắc
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Liên hệ hỗ trợ
              </a>
              <a
                href="mailto:support@healthcare.com"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Gửi email
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Dịch vụ</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="/dashboard?tab=book" className="hover:text-green-600">Đặt lịch khám</a></li>
              <li><a href="/dashboard?tab=view" className="hover:text-green-600">Xem lịch khám</a></li>
              <li><a href="/medical-records" className="hover:text-green-600">Hồ sơ bệnh án</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Tài khoản</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="/dashboard" className="hover:text-green-600">Dashboard</a></li>
              <li><a href="/login" className="hover:text-green-600">Đăng nhập</a></li>
              <li><a href="/register" className="hover:text-green-600">Đăng ký</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Công nghệ</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="/dashboard/vr" className="hover:text-green-600">Virtual Robot</a></li>
              <li><a href="#chatbot" className="hover:text-green-600">Chatbot AI</a></li>
              <li><a href="/solutions" className="hover:text-green-600">Giải pháp</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Liên hệ</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="/contact" className="hover:text-green-600">Thông tin liên hệ</a></li>
              <li><a href="tel:+84123456789" className="hover:text-green-600">Hotline: 0123 456 789</a></li>
              <li><a href="mailto:support@healthcare.com" className="hover:text-green-600">support@healthcare.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
