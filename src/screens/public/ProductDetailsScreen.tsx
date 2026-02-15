import React, { useState } from 'react';
import { ChevronLeft, Heart, Share2, Edit3, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../../types/types';

export const ProductDetailsScreen = ({ product, onBack, onAddToCart, onFavoriteToggle, favorites }: {
    product: Product,
    onBack: () => void,
    onAddToCart: (p: Product, qty: number, notes?: string) => void,
    onFavoriteToggle: (id: string) => void,
    favorites: string[]
}) => {
    const [qty, setQty] = useState(1);
    const [notes, setNotes] = useState('');
    const [selectedImageIdx, setSelectedImageIdx] = useState(0);
    const isFav = favorites.includes(product.id);
    const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <div className="flex flex-col h-full bg-background-cream md:bg-gray-50/50 md:flex-row md:items-center md:justify-center md:p-10 animate-fade-in">
            {/* Mobile Layout Wrapper / Desktop Modal-like Card */}
            <div className="flex flex-col h-full md:h-auto md:max-h-[85vh] md:w-full md:max-w-6xl md:bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden md:flex-row relative">

                <div className="md:hidden absolute top-6 left-6 right-6 flex justify-between z-20">
                    <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg text-dark-green active:scale-90 transition-all">
                        <ChevronLeft size={28} />
                    </button>
                    <div className="flex gap-4">
                        <button onClick={() => onFavoriteToggle(product.id)} className={`w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg active:scale-90 transition-all ${isFav ? 'text-bordeaux' : 'text-accent-pink'}`}>
                            <Heart fill={isFav ? "currentColor" : "none"} size={26} />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg text-dark-green active:scale-90 transition-all">
                            <Share2 size={26} />
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative w-full md:w-1/2 flex flex-col bg-gray-100">
                    <div className="relative w-full aspect-square md:aspect-auto md:flex-1 overflow-hidden group">
                        <img
                            src={productImages[selectedImageIdx]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Desktop Back Button */}
                        <button onClick={onBack} className="hidden md:flex absolute top-6 left-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg text-dark-green transition-all transform hover:scale-105 z-10">
                            <ChevronLeft size={28} />
                        </button>

                        {/* Image Counter Overlay (Mobile) */}
                        {productImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                                {selectedImageIdx + 1} / {productImages.length}
                            </div>
                        )}
                    </div>

                    {/* Thumbnails Gallery */}
                    {productImages.length > 1 && (
                        <div className="flex gap-3 p-4 md:p-6 overflow-x-auto hide-scrollbar bg-white/50 border-t border-accent-sage/10">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIdx(idx)}
                                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all ${selectedImageIdx === idx ? 'ring-2 ring-primary ring-offset-2 scale-95' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                                >
                                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col bg-background-cream md:bg-white relative rounded-t-3xl md:rounded-none -mt-6 md:mt-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:shadow-none z-10">
                    <div className="flex-1 px-6 md:px-10 py-8 md:py-10 overflow-y-auto pb-32 md:pb-10 custom-scrollbar">

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary/80 bg-primary/10 px-2 py-1 rounded-md">{product.category}</span>
                                <span className="flex items-center gap-1 text-xs font-medium text-dark-green/60">
                                    <span className="text-yellow-500">★</span> {product.rating} ({product.reviews} avaliações)
                                </span>
                            </div>

                            {/* Desktop Actions */}
                            <div className="hidden md:flex gap-3">
                                <button onClick={() => onFavoriteToggle(product.id)} className={`w-12 h-12 flex items-center justify-center rounded-full border ${isFav ? 'bg-accent-pink border-accent-pink text-bordeaux' : 'border-gray-200 hover:bg-gray-50 text-gray-400'}`}>
                                    <Heart fill={isFav ? "currentColor" : "none"} size={22} />
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 text-dark-green">
                                    <Share2 size={22} />
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-2">{product.name}</h1>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-dark-green">R$ {product.price.toFixed(2)}</span>
                                <span className="text-sm text-dark-green/60 font-medium">/ {product.unit}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-dark-green/40 mb-3">Descrição</h3>
                            <p className="text-dark-green leading-relaxed font-medium text-lg opacity-90">{product.description}</p>
                        </div>

                        <div className="mb-8 md:mb-0">
                            <div className="flex items-center gap-2 mb-4">
                                <Edit3 size={18} className="text-primary" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-dark-green/40">Observações</h3>
                            </div>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full h-32 p-4 rounded-xl border border-accent-sage/20 bg-white md:bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-dark-green placeholder:text-dark-green/30 resize-none font-medium transition-all"
                                placeholder="Ex: Retirar azeitonas, caprichar no molho..."
                            ></textarea>
                        </div>

                    </div>

                    {/* Bottom Action Bar */}
                    <div className="md:relative fixed bottom-0 w-full p-6 bg-white/90 md:bg-white backdrop-blur border-t md:border-none border-dark-green/5 z-[60] md:z-auto">
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="flex items-center bg-gray-100 p-1.5 rounded-xl">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white text-dark-green shadow-sm hover:shadow-md transition-all"><Minus size={20} /></button>
                                <span className="w-12 text-center font-bold text-dark-green text-xl">{qty}</span>
                                <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-white shadow-sm hover:brightness-110 transition-all"><Plus size={20} /></button>
                            </div>
                            <button onClick={() => onAddToCart(product, qty, notes)} className="flex-1 h-14 md:h-16 bg-dark-green hover:bg-dark-green/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-dark-green/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                                <ShoppingBag size={22} />
                                <span>Adicionar à Cesta</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
