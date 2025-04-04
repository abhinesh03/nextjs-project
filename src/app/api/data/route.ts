// src/app/api/data/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // This is your dummy data
  const data = {
    products: [
      { id: 1, name: 'Product 1', price: 19.99, description: 'This is product 1' },
      { id: 2, name: 'Product 2', price: 29.99, description: 'This is product 2' },
      { id: 3, name: 'Product 3', price: 39.99, description: 'This is product 3' },
    ],
    featured: { id: 2, name: 'Product 2', price: 29.99, description: 'This is product 2' },
    totalProducts: 3,
    lastUpdated: new Date().toISOString()
  };

  // Return the data as JSON
  return NextResponse.json(data);
}