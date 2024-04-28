import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Stats {
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  critical: number;
}

interface Props {
  stats: Stats;
}

const CovidStats: React.FC<Props> = ({ stats }) => {
  const data = [
    { name: 'Cases', value: stats.cases },
    { name: 'Deaths', value: stats.deaths },
    { name: 'Recovered', value: stats.recovered },
    { name: 'Active', value: stats.active },
    { name: 'Critical', value: stats.critical },
  ];

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'];

  const formatNumber = (number: number) => new Intl.NumberFormat().format(number);

  return (
    <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px', margin: '10px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '500px', height: '500px',marginBottom : '70px'}}>
      <h2 style={{ textAlign: 'center', color:'#00000', marginTop:'0px'}}>COVID-19 Statistics</h2>
        <PieChart width={500} height={400}>
          <Pie
            data={data}
            cx={250}
            cy={200}
            labelLine={false}
            label={({ name, value }) => `${name}: ${formatNumber(value)}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatNumber(value)} />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default CovidStats;
