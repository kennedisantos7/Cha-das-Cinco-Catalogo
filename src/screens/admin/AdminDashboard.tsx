import React from 'react';
import {
    LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { AdminContainer } from '../../components/layout/AdminContainer';

export const AdminDashboard = () => {
    const data = [
        { name: 'Seg', value: 400 },
        { name: 'Ter', value: 300 },
        { name: 'Qua', value: 600 },
        { name: 'Qui', value: 800 },
        { name: 'Sex', value: 500 },
        { name: 'Sab', value: 900 },
        { name: 'Dom', value: 700 },
    ];

    return (
        <AdminContainer>
            <header className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Visão Geral</p>
                    <h1 className="text-3xl font-bold text-slate-900">Bom dia, Admin</h1>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold text-sm">Vendas Hoje</span>
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">$</div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">R$ 1.482</span>
                        <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-bold text-sm">Pedidos Pendentes</span>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">#</div>
                    </div>
                    <span className="text-3xl font-bold text-slate-900">24</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 h-80">
                <h3 className="font-bold text-slate-800 mb-6">Vendas da Semana</h3>
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={data}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="value" stroke="#4ca99d" strokeWidth={4} dot={{ r: 4, fill: '#4ca99d' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </AdminContainer>
    );
};
