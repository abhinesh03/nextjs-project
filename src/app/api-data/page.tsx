// src/app/api-data/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ApiData {
  products: Product[];
  featured: Product;
  totalProducts: number;
  lastUpdated: string;
}

export default function ApiDataPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">No data available</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold mb-6">API Data</h1>
      
      <div className="mb-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-3">Featured Product</h2>
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">{data.featured.name}</h3>
          <p className="text-gray-700">{data.featured.description}</p>
          <p className="text-blue-600 font-semibold">${data.featured.price}</p>
        </div>
      </div>
      
      <div className="mb-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-3">All Products</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {data.products.map(product => (
            <div key={product.id} className="p-4 border rounded-lg">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-blue-600 font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        Total Products: {data.totalProducts} | Last Updated: {new Date(data.lastUpdated).toLocaleString()}
      </div>
      
      <Link href="/" className="mt-8 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
        Back to Home
      </Link>
    </main>
  );
}