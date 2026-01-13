'use client';

import { useState } from 'react';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/User/userApi';
import ProductPage from './apis/productApi';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard searchQuery={searchQuery} />;
      case 'users':
        return <UserPage />;
      case 'products':
        return <ProductPage />;
      case 'settings':
      case 'help':
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>Coming Soon...</p>
          </div>
        );
      default:
        return <Dashboard searchQuery={searchQuery} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;
