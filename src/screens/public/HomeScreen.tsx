import React, { useMemo, useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product, ProductCategory } from '../../types/types';

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

    const categories: ProductCategory[] = ['SEM GLÚTEN', 'SEM GLÚTEN INTEGRAL', 'SEM GLÚTEN FOLHEADOS', 'TRADICIONAIS', 'LANCHINHOS', 'SONHOS', 'ESFIHA', 'PAMONHAS', 'KIT'];

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto md:px-6 pt-2 md:pt-6 pb-32">
            <div className="relative w-full md:h-[450px] h-[280px] bg-dark-green rounded-3xl overflow-hidden mb-10 group cursor-pointer shadow-2xl" onClick={() => onItemClick(featuredProduct)}>
                <div className="absolute inset-0 flex items-center p-8 md:p-16 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-dark-green md:via-dark-green/40 md:to-transparent">
                    <div className="max-w-full md:max-w-[60%] animate-slide-up">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent-pink mb-3 block drop-shadow-md">Padaria Artesanal</span>
                        <h2 className="text-2xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-2xl">{featuredProduct.name}</h2>
                        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-primary/40 transition-all transform hover:scale-105 active:scale-95">
                            Ver Catálogo
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
                <div className="flex items-center justify-between mb-6 px-4 md:px-0">
                    <h3 className="font-bold text-xl md:text-2xl text-dark-green">Categorias</h3>
                    <button className="text-primary text-sm font-bold hover:underline" onClick={() => { setLocalCategory('Todos'); onSeeAll(); }}>Ver Todas</button>
                </div>
                <div className="flex justify-between md:justify-start gap-2 md:gap-8 overflow-x-auto hide-scrollbar pb-4 px-4 md:px-0">
                    {categories.map((cat, i) => {
                        const isActive = localCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setLocalCategory(isActive ? 'Todos' : cat)}
                                className="flex flex-col items-center gap-3 min-w-[85px] md:min-w-[100px] group transition-all"
                            >
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg scale-105' : 'bg-white border border-accent-sage/20 text-accent-sage group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-md'}`}>
                                    <span className="text-2xl md:text-3xl">
                                        {cat === 'SEM GLÚTEN' ? '🌾' :
                                            cat === 'SEM GLÚTEN INTEGRAL' ? '🍞' :
                                                cat === 'SEM GLÚTEN FOLHEADOS' ? '🥐' :
                                                    cat === 'TRADICIONAIS' ? '🥖' :
                                                        cat === 'LANCHINHOS' ? '🥯' :
                                                            cat === 'SONHOS' ? '🍩' :
                                                                cat === 'ESFIHA' ? '🥟' :
                                                                    cat === 'PAMONHAS' ? '🌽' : '🎁'}
                                    </span>
                                </div>
                                <span className={`text-[10px] md:text-xs font-bold text-center leading-tight uppercase tracking-wider block w-full px-1 ${isActive ? 'text-dark-green' : 'text-accent-sage group-hover:text-dark-green'}`}>
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
