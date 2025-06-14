import React from 'react';
import BellIconUrl from '../assets/icons/bell.svg';
import MailIconUrl from '../assets/icons/mail.svg';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      {/* Thanh tìm kiếm */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Tìm kiếm bệnh nhân, hóa đơn, lịch hẹn..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-sm"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
      </div>

      {/* Biểu tượng thông báo và tin nhắn */}
      <div className="flex items-center space-x-4">
        <button
          aria-label="Thông báo"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <img
            src={BellIconUrl}
            alt="Thông báo"
            className="w-6 h-6"
          />
        </button>
        <button
          aria-label="Tin nhắn"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <img
            src={MailIconUrl}
            alt="Tin nhắn"
            className="w-6 h-6"
          />
        </button>
      </div>
    </header>
  );
}
