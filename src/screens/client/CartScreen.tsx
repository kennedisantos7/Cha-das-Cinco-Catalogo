import React from 'react';
import { ShoppingBag, ChevronLeft, Edit3, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types/types';

export const CartScreen = ({ cart, onBack, onClear }: { cart: CartItem[], onBack: () => void, onClear: () => void }) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        // Simulate WhatsApp checkout
        const message = `Olá, gostaria de fazer um pedido:\n\n${cart.map(i => `${i.quantity}x ${i.name}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;
        alert(`Redirecionando para WhatsApp com a mensagem:\n\n${message}`);
    };

    return (
        <div className="flex flex-col h-full bg-background-cream md:bg-gray-50 items-center justify-center md:py-10">
            <div className="w-full h-full md:max-w-4xl md:h-auto md:bg-white md:rounded-3xl md:shadow-xl md:overflow-hidden flex flex-col md:flex-row">

                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <header className="sticky top-0 z-10 bg-background-cream/95 md:bg-white/95 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <button onClick={onBack} className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors md:hidden"><ChevronLeft size={24} /></button>
                            <h1 className="text-2xl font-bold text-dark-green">Sua Cesta</h1>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{cart.length} itens</span>
                        </div>
                        {cart.length > 0 && <button onClick={onClear} className="text-sm font-bold text-bordeaux hover:bg-bordeaux/10 px-3 py-1.5 rounded-lg transition-colors">Limpar</button>}
                    </header>

                    <main className="flex-grow px-6 py-4 space-y-4 overflow-y-auto pb-64 md:pb-6 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 md:h-96 opacity-50">
                                <ShoppingBag size={64} className="mb-4 text-dark-green" />
                                <p className="text-lg font-medium text-dark-green">Sua cesta está vazia</p>
                                <button onClick={onBack} className="mt-4 text-primary font-bold hover:underline">Continuar comprando</button>
                            </div>
                        ) : (
                            cart.map((item, idx) => (
                                <div key={`${item.id}-${idx}`} className="bg-white p-4 rounded-2xl flex items-center gap-5 shadow-sm border border-gray-100 hover:border-primary/20 transition-colors">
                                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg text-dark-green leading-tight truncate pr-4">{item.name}</h3>
                                            <span className="font-bold text-primary whitespace-nowrap">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-accent-sage font-medium mb-3">{item.category}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                                R$ {item.price.toFixed(2)} un.
                                            </div>
                                            <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                                <span className="text-sm font-bold text-dark-green px-3">Qtd: {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {cart.length > 0 && (
                            <div className="mt-8 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                <label className="flex items-center gap-2 text-sm font-bold text-dark-green mb-3 px-1">
                                    <Edit3 size={16} className="text-primary" />
                                    Observações do Pedido
                                </label>
                                <textarea className="w-full bg-gray-50 border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 transition-all" placeholder="Ex: Entregar na portaria, campainha não funciona..." rows={2}></textarea>
                            </div>
                        )}
                    </main>
                </div>

                {/* Checkout Sidebar/Footer */}
                {cart.length > 0 && (
                    <div className="md:w-[350px] bg-white md:border-l border-gray-100 md:bg-gray-50/50 p-8 flex flex-col justify-center shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">
                        <div className="space-y-4 mb-8">
                            <h3 className="text-lg font-bold text-dark-green mb-4 hidden md:block">Resumo</h3>
                            <div className="flex justify-between text-dark-green/70 text-sm"><span>Subtotal</span><span>R$ {total.toFixed(2)}</span></div>
                            <div className="flex justify-between text-dark-green/70 text-sm"><span>Taxa de Entrega</span><span className="text-primary font-bold">Grátis</span></div>
                            <div className="h-px bg-gray-200 my-2"></div>
                            <div className="flex justify-between text-dark-green pt-2"><span className="text-lg font-bold">Total</span><span className="text-2xl font-extrabold text-primary">R$ {total.toFixed(2)}</span></div>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 text-white font-bold text-lg">
                            <span>Finalizar no WhatsApp</span>
                            <ArrowRight size={20} />
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4 px-4 leading-relaxed">
                            Ao clicar, você será redirecionado para o WhatsApp da loja com os detalhes do seu pedido preenchidos.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
