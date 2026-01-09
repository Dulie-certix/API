'use client';

import { useState } from 'react';
import { Layout } from './components/Layout';
import UserPage from '../src/pages/User/userApi';
import ProductPage from './apis/productApi';
import { DataTable } from './components/customUi/data-table';
import Dashboard from '../src/pages/dashbroad';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserPage />;
      case 'products':
        return <ProductPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
