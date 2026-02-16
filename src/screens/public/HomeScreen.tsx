import React, { useMemo } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product, ProductCategory } from '../../types/types';

export const HomeScreen = ({ products, onItemClick, onSeeAll, onFavoriteToggle, favorites, onAddToCart, onCategoryClick }: {
    products: Product[],
    onItemClick: (p: Product) => void,
    onSeeAll: () => void,
    onFavoriteToggle: (id: string) => void,
    favorites: string[],
    onAddToCart: (p: Product, q: number) => void,
    onCategoryClick: (cat: ProductCategory) => void
}) => {
    const featuredProduct = useMemo(() => {
        if (!products || products.length === 0) return null;
        return products[Math.floor(Math.random() * products.length)];
    }, [products]);

    if (!featuredProduct) return null;

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto md:px-6 py-6 pb-32">
            <div className="relative w-full md:h-[400px] h-[300px] bg-accent-pink rounded-3xl overflow-hidden mb-8 group cursor-pointer shadow-lg" onClick={() => onItemClick(featuredProduct)}>
                <div className="absolute inset-0 flex items-center p-8 md:p-12 z-10 bg-gradient-to-r from-accent-pink/90 to-transparent">
                    <div className="max-w-[80%] md:max-w-[50%] animate-slide-up">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3 block">Padaria Artesanal</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-dark-green leading-tight mb-4 drop-shadow-sm">{featuredProduct.name}</h2>
                        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/20 transition-all transform hover:scale-105">
                            Ver Coleção
                        </button>
                    </div>
                </div>
                <img src={featuredProduct.image} className="absolute right-0 top-0 h-full w-full md:w-2/3 object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" alt="Hero" />
            </div>

            <div className="mb-10">
                <div className="flex items-center justify-between mb-6 px-4 md:px-0">
                    <h3 className="font-bold text-xl md:text-2xl text-dark-green">Categorias</h3>
                    <button className="text-primary text-sm font-bold hover:underline" onClick={onSeeAll}>Ver Todas</button>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-4 md:px-0">
                    {(['PÃES TRADICIONAIS', 'PÃES SEM GLÚTEN', 'DOCES', 'SALGADOS'] as ProductCategory[]).map((cat, i) => (
                        <button key={cat} onClick={() => onCategoryClick(cat)} className="flex flex-col items-center gap-3 min-w-[90px] group transition-all">
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${i === 0 ? 'bg-primary text-white shadow-lg scale-105' : 'bg-white border border-accent-sage/20 text-accent-sage group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-md'}`}>
                                <span className="text-2xl md:text-3xl">{i === 0 ? '🥖' : i === 1 ? '🌾' : i === 2 ? '🍰' : '🥟'}</span>
                            </div>
                            <span className={`text-sm font-bold text-center leading-tight ${i === 0 ? 'text-dark-green' : 'text-accent-sage group-hover:text-dark-green'}`}>{cat}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 md:px-0">
                <h3 className="font-bold text-xl md:text-2xl mb-6 text-dark-green">Recomendados para Você</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map(product => {
                        const isFav = favorites.includes(product.id);
                        return (
                            <div key={product.id} className="bg-white border border-accent-sage/10 rounded-2xl p-3 md:p-4 shadow-sm flex flex-col group hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer">
                                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4" onClick={() => onItemClick(product)}>
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onFavoriteToggle(product.id); }}
                                        className={`absolute top-2 right-2 w-11 h-11 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${isFav ? 'bg-accent-pink text-bordeaux' : 'bg-white/80 text-primary'}`}
                                    >
                                        <Heart size={22} fill={isFav ? "currentColor" : "none"} />
                                    </button>
                                </div>
                                <h4 className="font-bold text-sm md:text-base mb-1 text-dark-green leading-snug truncate" onClick={() => onItemClick(product)}>{product.name}</h4>
                                <p className="text-xs text-accent-sage mb-3">{product.category}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-primary font-bold text-lg">R$ {product.price.toFixed(2)}</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); }}
                                        className="w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark shadow-md transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
