import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, X, Heart } from 'lucide-react';
import { Product } from '../../types/types';

export const SearchScreen = ({
    onBack,
    onItemClick,
    favorites = [],
    onFavoriteToggle,
    products
}: {
    onBack: () => void,
    onItemClick: (p: Product) => void,
    favorites?: string[],
    onFavoriteToggle?: (id: string) => void,
    products: Product[]
}) => {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="h-full bg-background-cream md:bg-gray-50 flex flex-col pt-20 md:pt-24 pb-20">
            <div className="w-full max-w-7xl mx-auto px-6 h-full flex flex-col">
                <header className="mb-6 flex items-center gap-4">
                    <div className="relative flex-grow max-w-2xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search size={22} className="text-accent-sage" /></div>
                        <input autoFocus className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent focus:border-primary focus:ring-0 rounded-2xl text-dark-green placeholder-accent-sage/70 transition-all shadow-sm text-lg" placeholder="O que você procura hoje?" type="text" />
                    </div>
                    <button onClick={() => setShowFilter(true)} className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-dark-green"><SlidersHorizontal size={24} /></button>
                </header>

                <section className="mb-8 overflow-x-auto hide-scrollbar">
                    <div className="flex space-x-3 pb-2">
                        <button className="flex-shrink-0 px-6 py-2.5 bg-primary text-white rounded-full font-bold shadow-md shadow-primary/20 text-sm hover:scale-105 transition-transform">Todos</button>
                        <button className="flex-shrink-0 px-6 py-2.5 bg-white text-dark-green font-bold rounded-full shadow-sm text-sm hover:bg-gray-50 border border-gray-100">Pães Tradicionais</button>
                        <button className="flex-shrink-0 px-6 py-2.5 bg-white text-dark-green font-bold rounded-full shadow-sm text-sm hover:bg-gray-50 border border-gray-100">Pães Sem Glúten</button>
                        <button className="flex-shrink-0 px-6 py-2.5 bg-white text-dark-green font-bold rounded-full shadow-sm text-sm hover:bg-gray-50 border border-gray-100">Doces</button>
                        <button className="flex-shrink-0 px-6 py-2.5 bg-white text-dark-green font-bold rounded-full shadow-sm text-sm hover:bg-gray-50 border border-gray-100">Salgados</button>
                    </div>
                </section>

                <main className="flex-1 overflow-y-auto hide-scrollbar md:pr-2 custom-scrollbar">
                    <h2 className="text-xl font-bold text-dark-green mb-6">Resultados</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map(p => {
                            const isFav = favorites.includes(p.id);
                            return (
                                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer group transition-all duration-300 flex flex-col">
                                    <div className="relative aspect-square overflow-hidden" onClick={() => onItemClick(p)}>
                                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                                        {onFavoriteToggle && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onFavoriteToggle(p.id); }}
                                                className={`absolute top-2 right-2 w-8 h-8 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 ${isFav ? 'bg-accent-pink text-bordeaux' : 'bg-white/80 text-primary'}`}
                                            >
                                                <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-dark-green text-sm md:text-base mb-1 truncate" onClick={() => onItemClick(p)}>{p.name}</h3>
                                        <p className="text-xs text-accent-sage font-medium mb-3">{p.category}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="font-bold text-primary text-lg">R$ {p.price.toFixed(2)}</span>
                                            <button className="w-8 h-8 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors text-dark-green"><Plus size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {showFilter && (
                <div className="fixed inset-0 z-[60] flex flex-col justify-end md:justify-center md:items-center bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-background-cream w-full md:w-[500px] md:rounded-3xl rounded-t-[3rem] flex flex-col max-h-[90%] md:max-h-[80vh] shadow-2xl animate-slide-up">
                        <div className="md:hidden w-10 h-1 bg-gray-300 rounded-full mx-auto my-3"></div>
                        <div className="px-8 pt-4 pb-6 flex justify-between items-center border-b border-accent-sage/20">
                            <h2 className="text-2xl font-bold text-dark-green tracking-tight">Filtros</h2>
                            <button onClick={() => setShowFilter(false)} className="w-8 h-8 rounded-full bg-accent-sage/10 flex items-center justify-center text-dark-green hover:bg-accent-sage/20"><X size={20} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                            <section>
                                <h3 className="text-dark-green font-bold text-lg mb-4">Categorias</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-2 rounded-full bg-primary text-white font-bold text-sm shadow-md">Pães Tradicionais</span>
                                    <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-dark-green font-medium text-sm hover:bg-gray-50 cursor-pointer">Pães Sem Glúten</span>
                                    <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-dark-green font-medium text-sm hover:bg-gray-50 cursor-pointer">Doces</span>
                                    <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-dark-green font-medium text-sm hover:bg-gray-50 cursor-pointer">Salgados</span>
                                </div>
                            </section>
                            <div className="h-px bg-accent-sage/20"></div>
                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-dark-green font-bold text-lg">Faixa de Preço</h3>
                                    <span className="text-dark-green font-bold bg-white px-3 py-1 rounded-lg text-sm shadow-sm border border-gray-100">R$ 15 — R$ 85</span>
                                </div>
                                <input type="range" className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </section>
                        </div>
                        <div className="p-8 border-t border-accent-sage/20 bg-white/50 flex items-center gap-6">
                            <button onClick={() => setShowFilter(false)} className="text-bordeaux font-bold text-sm tracking-wide shrink-0 hover:underline">Limpar</button>
                            <button onClick={() => setShowFilter(false)} className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition-all">Ver Resultados</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
