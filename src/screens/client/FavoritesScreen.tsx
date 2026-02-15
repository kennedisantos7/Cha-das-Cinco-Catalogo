import React from 'react';
import { Heart, ArrowLeft, Plus } from 'lucide-react';
import { Product } from '../../types/types';

export const FavoritesScreen = ({
    favorites,
    products,
    onItemClick,
    onBack,
    onFavoriteToggle
}: {
    favorites: string[],
    products: Product[],
    onItemClick: (p: Product) => void,
    onBack: () => void,
    onFavoriteToggle: (id: string) => void
}) => {
    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    return (
        <div className="h-full bg-background-cream md:bg-gray-50 flex flex-col pt-20 md:pt-24 pb-20">
            <div className="w-full max-w-7xl mx-auto px-6 h-full flex flex-col">
                <header className="mb-6 flex items-center gap-4">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-dark-green hover:bg-dark-green/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-dark-green">Favoritos</h1>
                </header>

                <main className="flex-1 overflow-y-auto hide-scrollbar md:pr-2 custom-scrollbar">
                    {favoriteProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
                                <Heart size={40} />
                            </div>
                            <h2 className="text-xl font-bold text-dark-green mb-2">Sua lista está vazia</h2>
                            <p className="text-accent-sage max-w-xs">
                                Favorite um produto para lembrar de comprar depois
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {favoriteProducts.map(p => (
                                <div key={p.id} onClick={() => onItemClick(p)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer group transition-all duration-300">
                                    <div className="relative aspect-square overflow-hidden">
                                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onFavoriteToggle(p.id); }}
                                            className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-accent-pink text-bordeaux backdrop-blur-md rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110"
                                        >
                                            <Heart size={18} fill="currentColor" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-dark-green text-sm md:text-base truncate mb-1">{p.name}</h3>
                                        <p className="text-xs text-accent-sage font-medium mb-3">{p.category}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-primary text-lg">R$ {p.price.toFixed(2)}</span>
                                            <button className="w-8 h-8 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors text-dark-green"><Plus size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
