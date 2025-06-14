// src/components/AnalyticsCard.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sample = [
  { day: 'Thứ 7', bpm: 135 },
  { day: 'Chủ nhật', bpm: 150 },
];

export default function AnalyticsCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Phân tích</h4>
        <select className="border border-gray-200 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Hàng tuần</option>
          <option>Hàng tháng</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={sample}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value} bpm`, 'Nhịp tim']}
            labelFormatter={(label) => `Ngày: ${label}`}
          />
          <Bar dataKey="bpm" fill="#5B4FFF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
