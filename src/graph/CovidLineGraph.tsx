import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

const LineGraph = () => {
  const [data, setData] = useState<any>({});
  const [selectedType, setSelectedType] = useState('cases');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDataTypeChange = (value:any) => {
    setSelectedType(value);
  };

  const filteredData = Object.entries(data[selectedType] || {}).map(([date, value]) => ({ date, value }));

  return (
    <div>
        <h2 style={{ textAlign: 'center', color:'#0B4266', marginTop:'0px' }}>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Fluctuations</h2>
      <div>
        <Select value={selectedType} onChange={handleDataTypeChange}>
          <Select.Option value="cases">Cases</Select.Option>
          <Select.Option value="deaths">Deaths</Select.Option>
          <Select.Option value="recovered">Recovered</Select.Option>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
