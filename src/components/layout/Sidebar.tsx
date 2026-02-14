import React from 'react';
import { Home, ShoppingBag, User, LogOut } from 'lucide-react';
import { ScreenName } from '../../types/types';

export const Sidebar = ({ active, onChange }: { active: ScreenName, onChange: (s: ScreenName) => void }) => (
    <div className="fixed bottom-0 w-full md:w-64 md:left-0 md:top-0 md:h-full md:border-r md:flex-col md:justify-start md:items-stretch md:bg-white md:p-6 bg-white/95 backdrop-blur-xl border-t md:border-t-0 border-accent-sage/20 pb-8 pt-3 px-6 md:px-0 flex justify-between md:gap-4 items-center z-50 rounded-t-[2rem] md:rounded-none">

        <div className="hidden md:flex items-center gap-3 mb-8 px-2">
            <span className="text-2xl">☕</span>
            <h1 className="text-xl font-bold text-dark-green">Admin</h1>
        </div>

        <button onClick={() => onChange('admin-dashboard')} className={`flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full transition-colors ${active === 'admin-dashboard' ? 'md:bg-primary/10 text-primary' : 'text-accent-sage hover:bg-gray-50'}`}>
            <Home size={24} />
            <span className="text-[10px] md:text-sm font-bold">Início</span>
        </button>
        <button onClick={() => onChange('admin-inventory')} className={`flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full transition-colors ${active === 'admin-inventory' ? 'md:bg-primary/10 text-primary' : 'text-accent-sage hover:bg-gray-50'}`}>
            <ShoppingBag size={24} />
            <span className="text-[10px] md:text-sm font-medium">Itens</span>
        </button>
        <button onClick={() => onChange('admin-customers')} className={`flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full transition-colors ${active === 'admin-customers' ? 'md:bg-primary/10 text-primary' : 'text-accent-sage hover:bg-gray-50'}`}>
            <User size={24} />
            <span className="text-[10px] md:text-sm font-medium">Usuários</span>
        </button>

        <div className="md:mt-auto">
            <button onClick={() => onChange('home')} className="flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full text-accent-sage hover:bg-red-50 hover:text-bordeaux transition-colors">
                <LogOut size={24} />
                <span className="text-[10px] md:text-sm font-medium">Sair</span>
            </button>
        </div>
    </div>
);
