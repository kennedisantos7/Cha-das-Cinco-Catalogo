import React from 'react';
import { 
  Home, Search, ShoppingBag, User, Heart, Use
} from 'lucide-react';
import { ScreenName } from '../../types/types';

export const TopNav = ({ active, onChange, cartCount, isLoggedIn, onLoginClick }: { 
  active: ScreenName, 
  onChange: (s: ScreenName) => void, 
  cartCount: number,
  isLoggedIn: boolean,
  onLoginClick: () => void 
}) => (
  <nav className="hidden md:flex fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-accent-sage/20 z-50 px-8 py-4 justify-between items-center transition-all duration-300">
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onChange('home')}>
       <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
         <span className="text-2xl">☕</span>
       </div>
       <div>
         <h1 className="text-xl font-bold text-dark-green tracking-tight leading-none">Chá das Cinco</h1>
         <p className="text-[10px] text-accent-sage font-bold uppercase tracking-widest">Artesanal</p>
       </div>
    </div>
    
    <div className="flex items-center gap-8 font-medium text-accent-sage bg-white/50 px-6 py-2 rounded-full border border-accent-sage/10">
        <button onClick={() => onChange('home')} className={`hover:text-primary transition-colors ${active === 'home' ? 'text-primary font-bold' : ''}`}>Início</button>
        <button onClick={() => onChange('search')} className={`hover:text-primary transition-colors ${active === 'search' ? 'text-primary font-bold' : ''}`}>Cardápio</button>
        <button onClick={() => onChange('favorites')} className={`hover:text-primary transition-colors ${active === 'favorites' ? 'text-primary font-bold' : ''}`}>Favoritos</button>
    </div>

    <div className="flex items-center gap-4">
        <button onClick={() => onChange('cart')} className="relative p-2.5 hover:bg-primary/10 rounded-full transition-colors text-dark-green group">
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform"/>
            {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">{cartCount}</span>}
        </button>
        {isLoggedIn ? (
            <button onClick={() => onChange('profile')} className="p-2.5 hover:bg-primary/10 rounded-full transition-colors text-dark-green">
                <User size={22} />
            </button>
        ) : (
            <button onClick={onLoginClick} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-95 transition-all text-sm flex items-center gap-2">
                <User size={18} />
                Entrar
            </button>
        )}
    </div>
  </nav>
);
