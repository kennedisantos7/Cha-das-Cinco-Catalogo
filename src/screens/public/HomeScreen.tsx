import React, { useMemo, useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product, ProductCategory } from '../../types/types';

const CATEGORY_CONFIG: Record<string, { emoji: string; color: string; bg: string }> = {
    'SEM GLÚTEN': { emoji: '🌾', color: '#5a8a5a', bg: '#e8f5e8' },
    'TRADICIONAIS': { emoji: '🥖', color: '#a05030', bg: '#fdeee8' },
    'PÃO DE QUEIJO': { emoji: '🧀', color: '#9a7a20', bg: '#fdf8e0' },
    'LANCHINHOS': { emoji: '🥯', color: '#2a7a8a', bg: '#e0f4f8' },
    'SONHOS': { emoji: '🍩', color: '#8a3a6a', bg: '#fce8f4' },
    'PAMONHAS': { emoji: '🌽', color: '#7a8a2a', bg: '#f4f8e0' },
    'ESFIHAS': { emoji: '🥟', color: '#6a5a8a', bg: '#ede8f8' },
    'KIT': { emoji: '🎁', color: '#c03060', bg: '#fce8ee' },
};



export const HomeScreen = ({ products, featuredProduct, onItemClick, onSeeAll, onFavoriteToggle, favorites, onAddToCart, onCategoryClick }: {
    products: Product[],
    featuredProduct: Product,
    onItemClick: (p: Product) => void,
    onSeeAll: () => void,
    onFavoriteToggle: (id: string) => void,
    favorites: string[],
    onAddToCart: (p: Product, q: number) => void,
    onCategoryClick: (cat: ProductCategory) => void
}) => {
    const [localCategory, setLocalCategory] = useState<ProductCategory | 'Todos'>('Todos');
    const [imageLoaded, setImageLoaded] = useState(false);

    const filteredProducts = useMemo(() => {
        if (localCategory === 'Todos') return products;
        return products.filter(p => p.category === localCategory);
    }, [products, localCategory]);

    // Randomize category order once on mount
    const categories: ProductCategory[] = ['SEM GLÚTEN', 'TRADICIONAIS', 'PÃO DE QUEIJO', 'LANCHINHOS', 'SONHOS', 'PAMONHAS', 'ESFIHAS', 'KIT'];

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto md:px-6 pt-2 md:pt-6 pb-32">
            <div className="relative w-full md:h-[450px] h-[280px] bg-dark-green rounded-3xl overflow-hidden mb-10 group cursor-pointer shadow-2xl" onClick={() => onItemClick(featuredProduct)}>
                <div className="absolute inset-0 flex items-center p-8 md:p-16 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-dark-green md:via-dark-green/40 md:to-transparent">
                    <div className="max-w-full md:max-w-[60%] animate-slide-up">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent-pink mb-3 block drop-shadow-md">Padaria Artesanal Congelada</span>
                        <h2 className="text-2xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-2xl">{featuredProduct.name}</h2>
                        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-primary/40 transition-all transform hover:scale-105 active:scale-95">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
                <img
                    src={featuredProduct.image}
                    onLoad={() => setImageLoaded(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-70 md:opacity-90 blur-0' : 'opacity-0 blur-lg'}`}
                    alt="Hero"
                />
            </div>

            <div className="mb-10">
                <div className="flex items-center justify-between mb-4 px-4 md:px-0">
                    <h3 className="font-bold text-xl md:text-2xl text-dark-green">Categorias</h3>
                    <button className="text-primary text-sm font-bold hover:underline" onClick={() => { setLocalCategory('Todos'); onSeeAll(); }}>Ver Todas</button>
                </div>

                {/* Mobile: 2-row scrollable grid */}
                <div className="md:hidden overflow-x-auto hide-scrollbar pb-3 px-4">
                    <div className="flex flex-col gap-2" style={{ width: 'max-content' }}>
                        {[categories.slice(0, Math.ceil(categories.length / 2)), categories.slice(Math.ceil(categories.length / 2))].map((row, rowIdx) => (
                            <div key={rowIdx} className="flex gap-2">
                                {row.map((cat) => {
                                    const isActive = localCategory === cat;
                                    const cfg = CATEGORY_CONFIG[cat] ?? { emoji: '🎁', color: '#888', bg: '#f0f0f0' };
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setLocalCategory(isActive ? 'Todos' : cat)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-300 active:scale-95 whitespace-nowrap"
                                            style={{
                                                background: isActive ? cfg.color : cfg.bg,
                                                boxShadow: isActive ? `0 4px 14px ${cfg.color}55` : '0 1px 4px rgba(0,0,0,0.06)',
                                                border: `1.5px solid ${isActive ? cfg.color : 'transparent'}`,
                                            }}
                                        >
                                            <span className="text-xl leading-none">{cfg.emoji}</span>
                                            <span
                                                className="text-[11px] font-bold uppercase tracking-wide leading-tight"
                                                style={{ color: isActive ? '#fff' : cfg.color }}
                                            >
                                                {cat}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: single-row scroll */}
                <div className="hidden md:flex gap-6 overflow-x-auto hide-scrollbar pb-4">
                    {categories.map((cat) => {
                        const isActive = localCategory === cat;
                        const cfg = CATEGORY_CONFIG[cat] ?? { emoji: '🎁', color: '#888', bg: '#f0f0f0' };
                        return (
                            <button
                                key={cat}
                                onClick={() => setLocalCategory(isActive ? 'Todos' : cat)}
                                className="flex flex-col items-center gap-3 min-w-[100px] group transition-all"
                            >
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
                                    style={{
                                        background: isActive ? cfg.color : cfg.bg,
                                        boxShadow: isActive ? `0 6px 20px ${cfg.color}55` : '0 2px 8px rgba(0,0,0,0.06)',
                                        transform: isActive ? 'scale(1.08)' : 'scale(1)',
                                        border: `2px solid ${isActive ? cfg.color : 'transparent'}`,
                                    }}
                                >
                                    <span className="text-3xl">{cfg.emoji}</span>
                                </div>
                                <span
                                    className="text-xs font-bold text-center leading-tight uppercase tracking-wider block w-full px-1 transition-colors"
                                    style={{ color: isActive ? cfg.color : '#7a9a7a' }}
                                >
                                    {cat}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="px-4 md:px-0">
                <h3 className="font-bold text-xl md:text-2xl mb-6 text-dark-green">
                    {localCategory === 'Todos' ? 'Recomendados para Você' : `Produtos em ${localCategory}`}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map(product => {
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
};
