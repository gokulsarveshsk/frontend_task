import React, { useState, useEffect } from 'react';
import MapLeaflet from '../graph/MapLeaflet';
import CovidLineGraph from '../graph/CovidLineGraph';
import '../styles/Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <>
            <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px', margin:'10px 20px'}}>
                    <h2 style={{ textAlign: 'center', color:'#0B4266', marginTop:'10px' }}>Total Cases in Country</h2>
                    <div style={{marginBottom:'60px'}}>
                    <MapLeaflet/>
                    </div>
                    
            </div>
            <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px', margin:'10px 20px' }}>
                <div>
                    <CovidLineGraph/>
                </div>
            </div>
        </>
  );
};

export default Dashboard;
