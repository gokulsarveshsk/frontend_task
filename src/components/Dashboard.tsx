import React, { useState, useEffect } from 'react';
import MapLeaflet from '../graph/MapLeaflet';
import CovidLineGraph from '../graph/CovidLineGraph';
import CovidStats from '../graph/CovidStats'; // Import the CovidStats component
import '../styles/Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const [covidStats, setCovidStats] = useState(null);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => setCovidStats(data))
      .catch(error => console.error('Error fetching COVID-19 statistics:', error));
  }, []);

  return (
    <>
      {covidStats && (
        <>
          <CovidStats stats={covidStats} />
          <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px', margin:'10px 20px'}}>
            <h2 style={{ textAlign: 'center', color:'#00000', marginTop:'10px' }}>Total Cases in Country</h2>
            <div style={{marginBottom:'50px'}}>
              <MapLeaflet/>
            </div>
          </div>
          <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px', margin:'10px 20px' }}>
            <div>
              <CovidLineGraph/>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
