import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIconUrl from "../assets/icons/grid.svg";
import CalendarIconUrl from "../assets/icons/calendar.svg";
import AnalyticsIconUrl from "../assets/icons/analytics.svg";
import ReportsIconUrl from "../assets/icons/reports.svg";
import HelpIconUrl from "../assets/icons/help.svg";
import BotIconUrl from "../assets/icons/bot.svg";

const links = [
  { to: "/dashboard", icon: DashboardIconUrl, label: "Trang chủ" },
  { to: "/appointments", icon: CalendarIconUrl, label: "Lịch hẹn" },
  { to: "/dashboard/analytics", icon: AnalyticsIconUrl, label: "Phân tích" },
  { to: "/dashboard/reports", icon: ReportsIconUrl, label: "Báo cáo" },
  { to: "/dashboard/vr", icon: BotIconUrl, label: "Virtual Robot" },
  { to: "/help", icon: HelpIconUrl, label: "Trợ giúp" },
];

export default function Sidebar() {
  return (
    <aside className="bg-white p-6 flex flex-col justify-between h-full shadow-md">
      {/* Logo hoặc tiêu đề */}
      <div>
        <h1 className="text-2xl font-bold text-green-600 mb-8">Danh mục</h1>
        {/* Liên kết điều hướng */}
        <nav className="space-y-2">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <img src={icon} alt={label} className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
