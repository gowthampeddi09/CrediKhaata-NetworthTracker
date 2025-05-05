import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import CustomerDetail from './components/customer/CustomerDetail';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/layout/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DataProvider>
          <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/customer/:id" element={
                  <PrivateRoute>
                    <CustomerDetail />
                  </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </DataProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;