// page.tsx - (client component) is where we'll fetch data and render our table.

"use client";

import { useState, useEffect } from 'react';
import { productColumns, type Product } from "../pages/productTable";
import { DataTable } from "../components/customUi/data-table";

export default function DemoPage() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        setLoading(true);
        // Fetch data from DummyJSON API
        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Fetched data:', result);
        
        if (result && result.products) {
          setData(result.products);
        } else {
          throw new Error('No products found in response');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Products Table ({data.length})</h1>
      <DataTable columns={productColumns} data={data} />
    </div>
  );
}