import React from 'react';
import { Home, Compass, ShoppingBag, User } from 'lucide-react';
import { ScreenName } from '../../types/types';

export const BottomNav = ({ active, onChange, cartCount }: { active: ScreenName, onChange: (s: ScreenName) => void, cartCount: number }) => (
    <div className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-accent-sage/20 pb-8 pt-3 px-6 flex justify-between items-center z-50 rounded-t-[2rem] shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
        <button onClick={() => onChange('home')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'home' ? 'text-primary' : 'text-accent-sage'}`}>
            <Home size={24} />
            <span className="text-[10px] font-bold">Início</span>
        </button>
        <button onClick={() => onChange('search')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'search' ? 'text-primary' : 'text-accent-sage'}`}>
            <Compass size={24} />
            <span className="text-[10px] font-medium">Explorar</span>
        </button>
        <button onClick={() => onChange('cart')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'cart' ? 'text-primary' : 'text-accent-sage'} relative`}>
            <div className="relative">
                <ShoppingBag size={24} />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-bordeaux text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </div>
            <span className="text-[10px] font-medium">Cesta</span>
        </button>
        <button onClick={() => onChange('profile')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'profile' ? 'text-primary' : 'text-accent-sage'}`}>
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
        </button>
    </div>
);
