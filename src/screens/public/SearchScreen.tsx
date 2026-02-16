import React, { useState } from 'react';
import { Search, Plus, Heart } from 'lucide-react';
import { ProductCategory, Product } from '../../types/types';

export const SearchScreen = ({
    onBack,
    onItemClick,
    favorites = [],
    onFavoriteToggle,
    products,
    onAddToCart,
    initialCategory = 'Todos'
}: {
    onBack: () => void,
    onItemClick: (p: Product) => void,
    favorites?: string[],
    onFavoriteToggle?: (id: string) => void,
    products: Product[],
    onAddToCart: (p: Product, q: number) => void,
    initialCategory?: ProductCategory | 'Todos'
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Todos'>(initialCategory);

    const categories: (ProductCategory | 'Todos')[] = ['Todos', 'PÃES TRADICIONAIS', 'PÃES SEM GLÚTEN', 'DOCES', 'SALGADOS'];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="h-full bg-background-cream md:bg-gray-50 flex flex-col pt-20 md:pt-24 pb-20">
            <div className="w-full max-w-7xl mx-auto px-6 h-full flex flex-col">
                <header className="mb-6 flex justify-center">
                    <div className="relative w-full max-w-3xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search size={22} className="text-accent-sage" /></div>
                        <input
                            autoFocus
                            className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent focus:border-primary focus:ring-0 rounded-2xl text-dark-green placeholder-accent-sage/70 transition-all shadow-sm text-lg"
                            placeholder="O que você procura hoje?"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>

                <section className="mb-8 overflow-x-auto hide-scrollbar">
                    <div className="flex space-x-3 pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex-shrink-0 px-6 py-2.5 rounded-full font-bold shadow-sm text-sm transition-all border ${selectedCategory === cat
                                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105'
                                    : 'bg-white text-dark-green border-gray-100 hover:bg-gray-50'
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </section>

                <main className="flex-1 overflow-y-auto hide-scrollbar md:pr-2 custom-scrollbar">
                    <h2 className="text-xl font-bold text-dark-green mb-6">Resultados</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredProducts.map(p => {
                            const isFav = favorites.includes(p.id);
                            return (
                                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer group transition-all duration-300 flex flex-col">
                                    <div className="relative aspect-square overflow-hidden" onClick={() => onItemClick(p)}>
                                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                                        {onFavoriteToggle && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onFavoriteToggle(p.id); }}
                                                className={`absolute top-2 right-2 w-11 h-11 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all ${isFav ? 'bg-accent-pink text-bordeaux' : 'bg-white/80 text-primary'}`}
                                            >
                                                <Heart size={22} fill={isFav ? "currentColor" : "none"} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-dark-green text-sm md:text-base mb-1 truncate" onClick={() => onItemClick(p)}>{p.name}</h3>
                                        <p className="text-xs text-accent-sage font-medium mb-3">{p.category}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="font-bold text-primary text-lg">R$ {p.price.toFixed(2)}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onAddToCart(p, 1); }}
                                                className="w-8 h-8 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors text-dark-green"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
            );
};
