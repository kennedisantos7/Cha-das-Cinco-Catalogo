import React, { useEffect, useState } from 'react';
import { ArrowLeft, Package, Clock, XCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface Order {
    id: string;
    created_at: string;
    status: string;
    total: number;
    items: any[]; // JSON array of items
}

export const OrdersScreen = ({ onBack, onAddToCart }: { onBack: () => void, onAddToCart: (p: any, q: number) => void }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id) // Assuming user_id is the foreign key
                .order('created_at', { ascending: false });

            if (data) {
                setOrders(data);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    const getStatusInfo = (status: string) => {
        switch (status.toLowerCase()) {
            case 'entregue': return { color: 'text-green-600 bg-green-100', icon: <CheckCircle size={16} />, label: 'Entregue' };
            case 'cancelado': return { color: 'text-red-600 bg-red-100', icon: <XCircle size={16} />, label: 'Cancelado' };
            default: return { color: 'text-yellow-600 bg-yellow-100', icon: <Clock size={16} />, label: 'Em Preparo' };
        }
    };

    return (
        <div className="h-full bg-background-cream md:bg-gray-50 flex flex-col pt-20 md:pt-24 pb-20">
            <div className="w-full max-w-4xl mx-auto px-6 h-full flex flex-col">
                <header className="mb-8 flex items-center gap-4">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-dark-green hover:bg-dark-green/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-dark-green">Meus Pedidos</h1>
                </header>

                <main className="flex-1 overflow-y-auto hide-scrollbar custom-scrollbar space-y-4 pb-10">
                    {loading ? (
                        <div className="text-center p-10 text-accent-sage">Carregando pedidos...</div>
                    ) : orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
                                <Package size={40} />
                            </div>
                            <h2 className="text-xl font-bold text-dark-green mb-2">Nenhum pedido encontrado</h2>
                            <p className="text-accent-sage max-w-xs">
                                Você ainda não realizou nenhuma compra.
                            </p>
                        </div>
                    ) : (
                        orders.map(order => {
                            const statusInfo = getStatusInfo(order.status || 'preparando');
                            return (
                                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-xs font-bold text-accent-sage uppercase tracking-wider">Pedido #{order.id.slice(0, 8)}</span>
                                            <h3 className="text-lg font-bold text-dark-green mt-1">
                                                {new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                            </h3>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${statusInfo.color}`}>
                                            {statusInfo.icon}
                                            {statusInfo.label}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                                        <div className="space-y-1">
                                            <div className="text-sm text-slate-500">
                                                {order.items?.length || 0} Itens
                                            </div>
                                            <button
                                                onClick={() => {
                                                    order.items.forEach(item => onAddToCart(item, item.quantity));
                                                }}
                                                className="text-xs font-bold text-primary hover:bg-primary/5 px-2 py-1 rounded-md border border-primary/20 transition-all uppercase tracking-wider"
                                            >
                                                Comprar Novamente
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-accent-sage font-bold uppercase block mb-0.5">Total</span>
                                            <span className="text-xl font-bold text-primary">R$ {order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </main>
            </div>
        </div>
    );
};
