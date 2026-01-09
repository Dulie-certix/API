// page.tsx - (client component) is where we'll fetch data and render our table.

'use client';

import { useState, useEffect } from 'react';
import {
  createProductColumns,
  type Product,
} from '../pages/Products/productTable';
import { DataTable } from '../components/customUi/data-table';
import { ProductDetailsDialog } from '../pages/Products/productViewCard';

export default function DemoPage() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const productColumns = createProductColumns(handleViewDetails);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to fetch products...');
        
        // Fetch data from DummyJSON API
        const response = await fetch('https://dummyjson.com/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched data:', result);
        console.log('Products array:', result.products);
        console.log('Products count:', result.products?.length);

        if (result && result.products && Array.isArray(result.products)) {
          setData(result.products);
          console.log('Data set successfully:', result.products.length, 'products');
        } else {
          throw new Error('No products found in response or invalid format');
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
          <h2 className="mb-2 text-xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">
        Products Table ({data.length})
      </h1>
      <DataTable columns={productColumns} data={data} />
      <ProductDetailsDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}