import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import CreateContact from '../components/CreateContact';
import ViewContact from '../components/ViewContact';
import { DashboardLayout } from '../Layout';

const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<DashboardLayout/>}>
            <Route index path="/dashboard" element={<Dashboard />} />
            <Route path="/createcontact" element={<CreateContact />} />
            <Route path="/viewcontact" element={<ViewContact />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      
    </Routes>
  );
};

export default AppRoutes;
