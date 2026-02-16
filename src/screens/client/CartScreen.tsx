import React, { useState } from 'react';
import { ShoppingBag, ChevronLeft, Edit3, ArrowRight, Heart, Plus, Search } from 'lucide-react';
import { CartItem, Product } from '../../types/types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const CartScreen = ({
    cart,
    onBack,
    onClear,
    products,
    favorites,
    onFavoriteToggle,
    onAddToCart
}: {
    cart: CartItem[],
    onBack: () => void,
    onClear: () => void,
    products: Product[],
    favorites: string[],
    onFavoriteToggle: (id: string) => void,
    onAddToCart: (p: Product, q: number) => void
}) => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [orderNotes, setOrderNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckout = async () => {
        if (!user) {
            alert("Por favor, faça login para finalizar o pedido.");
            return;
        }

        if (cart.length === 0) return;

        setLoading(true);

        // 1. Save to Supabase
        const { error } = await supabase.from('orders').insert({
            user_id: user.id,
            total: total,
            items: cart.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                image: i.image
            })),
            status: 'preparando'
        });

        setLoading(false);

        if (error) {
            console.error("Error saving order:", error);
            alert("Houve um erro ao salvar seu pedido. Tente novamente.");
            return;
        }

        // 2. Redirect to WhatsApp
        const phoneNumber = '554499784736';
        const orderSummary = cart.map(i => {
            return `• ${i.quantity}x ${i.name} (R$ ${i.price.toFixed(2)} un.)`;
        }).join('\n');

        let message = `Olá! Gostaria de fazer um pedido:\n\n${orderSummary}\n\n*Total: R$ ${total.toFixed(2)}*`;

        if (orderNotes.trim()) {
            message += `\n\n*Observações Gerais:*\n${orderNotes}`;
        }

        message += `\n\n_Pedido gerado pelo Catálogo Chá das Cinco_`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        onClear(); // Clear cart after successful checkout
    };

    return (
        <div className="h-full bg-background-cream md:bg-gray-50 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-5xl mx-auto pt-20 md:pt-24 pb-10 px-4 md:px-6">
                <div className="bg-white md:rounded-3xl shadow-sm md:shadow-xl overflow-hidden mb-10">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-gray-100">
                            <header className="px-6 py-6 flex items-center justify-between border-b border-gray-100 bg-white">
                                <div className="flex items-center gap-3">
                                    <button onClick={onBack} className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors md:hidden"><ChevronLeft size={24} /></button>
                                    <h1 className="text-2xl font-bold text-dark-green tracking-tight">Sua Cesta</h1>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{cart.length} itens</span>
                                </div>
                                {cart.length > 0 && <button onClick={onClear} className="text-sm font-bold text-bordeaux hover:bg-bordeaux/10 px-3 py-1.5 rounded-lg transition-colors">Limpar</button>}
                            </header>

                            <div className="px-6 py-6 space-y-4">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                        <ShoppingBag size={64} className="mb-4 text-dark-green" />
                                        <p className="text-lg font-medium text-dark-green">Sua cesta está vazia</p>
                                        <button onClick={onBack} className="mt-4 text-primary font-bold hover:underline">Continuar comprando</button>
                                    </div>
                                ) : (
                                    cart.map((item, idx) => (
                                        <div key={`${item.id}-${idx}`} className="bg-gray-50/50 p-4 rounded-2xl flex items-center gap-5 border border-gray-100 hover:border-primary/20 transition-all group">
                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-bold text-lg text-dark-green leading-tight truncate pr-4">{item.name}</h3>
                                                    <span className="font-bold text-primary whitespace-nowrap">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                                <p className="text-sm text-accent-sage font-medium mb-1">{item.category}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-xs text-gray-400 font-bold bg-white px-2 py-1 rounded border border-gray-100">
                                                        R$ {item.price.toFixed(2)} un.
                                                    </div>
                                                    <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-gray-100 shadow-sm">
                                                        <span className="text-sm font-bold text-dark-green">Quant: {item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {cart.length > 0 && (
                                    <div className="mt-8 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                                        <label className="flex items-center gap-2 text-sm font-bold text-dark-green mb-3 px-1">
                                            <Edit3 size={16} className="text-primary" />
                                            Observações do Pedido
                                        </label>
                                        <textarea
                                            value={orderNotes}
                                            onChange={(e) => setOrderNotes(e.target.value)}
                                            className="w-full bg-white border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 transition-all shadow-sm"
                                            placeholder="Ex: Entregar na portaria, campainha não funciona..."
                                            rows={2}
                                        ></textarea>
                                    </div>
                                )}
                            </div>
                        </div>

                        {cart.length > 0 && (
                            <div className="md:w-[380px] bg-gray-50/30 p-8 flex flex-col justify-center">
                                <div className="space-y-4 mb-8">
                                    <h3 className="text-lg font-bold text-dark-green mb-6 border-b border-gray-100 pb-2">Resumo do Pedido</h3>
                                    <div className="flex justify-between text-dark-green/70 text-sm"><span>Subtotal</span><span className="font-medium text-dark-green">R$ {total.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-dark-green/70 text-sm"><span>Taxa de Entrega</span><span className="text-primary font-bold">Consultar via WhatsApp</span></div>
                                    <div className="h-px bg-gray-200 my-4"></div>
                                    <div className="flex justify-between items-end"><span className="text-lg font-bold text-dark-green">Total</span><span className="text-3xl font-extrabold text-primary">R$ {total.toFixed(2)}</span></div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all py-5 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-600/20 text-white font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span>{loading ? 'Processando...' : 'Finalizar Pedido'}</span>
                                    {!loading && <ArrowRight size={22} />}
                                </button>
                                <p className="text-center text-[10px] text-gray-400 mt-6 px-4 leading-relaxed uppercase tracking-widest font-bold">
                                    Finalize sua compra pelo WhatsApp
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search and Catalog Section - BELOW Checkout */}
                <div className="w-full bg-white md:rounded-3xl shadow-sm md:shadow-xl p-6 md:p-10 mb-20 animate-slide-up">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h3 className="font-bold text-2xl text-dark-green tracking-tight mb-2">Adicione mais produtos</h3>
                            <p className="text-accent-sage font-medium">Não esqueça de levar um docinho para acompanhar seu pão!</p>
                        </div>

                        {/* NavBar-style Search Bar */}
                        <div className="relative w-full md:max-w-md group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                                <Search size={20} className="text-accent-sage" />
                            </div>
                            <input
                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:ring-0 rounded-2xl text-dark-green placeholder-accent-sage/60 transition-all shadow-inner text-sm md:text-base font-medium"
                                placeholder="Busque por nome ou categoria..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => {
                                const isFav = favorites.includes(product.id);
                                return (
                                    <div key={`cart-cat-${product.id}`} className="bg-white border border-accent-sage/5 rounded-3xl p-3 shadow-sm flex flex-col group hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-inner">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onFavoriteToggle(product.id); }}
                                                className={`absolute top-2 right-2 w-8 h-8 md:w-9 md:h-9 backdrop-blur-md rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-90 ${isFav ? 'bg-accent-pink text-bordeaux' : 'bg-white/90 text-primary'}`}
                                            >
                                                <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                                            </button>
                                        </div>
                                        <h4 className="font-bold text-sm mb-1 text-dark-green truncate px-1">{product.name}</h4>
                                        <p className="text-[10px] text-accent-sage font-bold uppercase tracking-widest px-1 mb-4">{product.category}</p>
                                        <div className="flex items-center justify-between mt-auto px-1 pb-1">
                                            <span className="text-primary font-extrabold text-base md:text-lg">R$ {product.price.toFixed(2)}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); }}
                                                className="w-9 h-9 md:w-11 md:h-11 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all transform hover:rotate-90 active:scale-95"
                                            >
                                                <Plus size={20} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="col-span-full py-10 text-center">
                                <p className="text-accent-sage font-bold italic">Nenhum produto encontrado para "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
