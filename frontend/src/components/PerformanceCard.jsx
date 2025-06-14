// src/components/PerformanceCard.jsx
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [{ name: 'Sức khỏe', value: 75, fill: '#5B4FFF' }];

export default function PerformanceCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex flex-col">
      <h4 className="font-semibold mb-4">Hiệu suất tổng thể</h4>
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width={150} height={150}>
          <RadialBarChart innerRadius="80%" outerRadius="100%" data={data} startAngle={180} endAngle={0}>
            <RadialBar dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4">
        <p className="text-3xl font-bold">468</p>
        <p className="text-green-600 font-medium">Hoàn hảo</p>
        <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Xem báo cáo đầy đủ
        </button>
      </div>
    </div>
  );
}
