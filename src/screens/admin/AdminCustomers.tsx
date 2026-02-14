import React from 'react';
import { AdminContainer } from '../../components/layout/AdminContainer';
import { customers } from '../../data/data';

export const AdminCustomers = () => (
    <AdminContainer>
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
        </header>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {customers.map((c, i) => (
                <div key={c.id} className={`p-6 flex items-center gap-4 ${i !== customers.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <img src={c.avatar} className="w-12 h-12 rounded-full" alt={c.name} />
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{c.name}</h3>
                        <p className="text-sm text-slate-500">{c.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{c.status}</span>
                </div>
            ))}
        </div>
    </AdminContainer>
);
