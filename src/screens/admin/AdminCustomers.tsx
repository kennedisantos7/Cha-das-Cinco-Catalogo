import React, { useEffect, useState } from 'react';
import { AdminContainer } from '../../components/layout/AdminContainer';
import { supabase } from '../../lib/supabase';

export const AdminCustomers = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            // Fetch profiles. detailed info like email is in auth.users which we can't fully list client-side easily 
            // without a secure edge function, but we can list profiles.
            // For this demo, we assume profiles has a trigger to copy email or we just show what we have.
            // Actually, let's just show profiles.
            const { data, error } = await supabase
                .from('profiles')
                .select('*');

            if (data) {
                setCustomers(data);
            }
            setLoading(false);
        };

        fetchCustomers();
    }, []);

    return (
        <AdminContainer>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Clientes Cadastrados</h1>
            </header>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Carregando clientes...</div>
                ) : customers.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">Nenhum cliente encontrado.</div>
                ) : (
                    customers.map((c, i) => (
                        <div key={c.id} className={`p-6 flex items-center gap-4 ${i !== customers.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl overflow-hidden">
                                {c.avatar_url ? (
                                    <img src={c.avatar_url} alt={c.full_name} className="w-full h-full object-cover" />
                                ) : (
                                    c.full_name?.charAt(0).toUpperCase() || 'U'
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900">{c.full_name || 'Usuário sem nome'}</h3>
                                <p className="text-sm text-slate-500">ID: {c.id}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                                {c.role === 'admin' ? 'Administrador' : 'Cliente'}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </AdminContainer>
    );
};
