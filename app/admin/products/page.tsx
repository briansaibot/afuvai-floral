'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  allow_auto_reorder: boolean;
  created_at: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoReorder = async (id: string, currentValue: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allow_auto_reorder: !currentValue }),
      });

      if (!res.ok) throw new Error('Failed to update');

      const updated = await res.json();
      setProducts(products.map(p => (p.id === id ? updated : p)));
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Products</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Auto-Reorder</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleAutoReorder(product.id, product.allow_auto_reorder)}
                      className={`px-4 py-2 rounded font-medium transition ${
                        product.allow_auto_reorder
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {product.allow_auto_reorder ? 'ON' : 'OFF'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(product.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products yet. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
