import React from 'react';
import { AdminContainer } from '../../components/layout/AdminContainer';
import { products } from '../../data/data';

export const AdminInventory = () => (
    <AdminContainer>
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Estoque</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <img src={p.image} className="w-16 h-16 rounded-lg object-cover" alt={p.name} />
                    <div>
                        <h3 className="font-bold text-slate-900">{p.name}</h3>
                        <p className="text-sm text-slate-500">{p.stock} unidades</p>
                    </div>
                </div>
            ))}
        </div>
    </AdminContainer>
);
