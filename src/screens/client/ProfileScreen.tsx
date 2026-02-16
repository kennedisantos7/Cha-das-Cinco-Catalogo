import React from 'react';
import { User, Receipt, Compass, Heart, Settings, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileScreen = ({ isLoggedIn, onLoginClick, onLogout, onOrdersClick, onSettingsClick, onFavoritesClick }: {
    isLoggedIn: boolean,
    onLoginClick: () => void,
    onLogout: () => void,
    onOrdersClick: () => void,
    onSettingsClick: () => void,
    onFavoritesClick: () => void
}) => {
    const { user } = useAuth();

    if (!isLoggedIn || !user) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background-cream">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-primary animate-bounce">
                    <User size={40} />
                </div>
                <h2 className="text-2xl font-bold text-dark-green mb-2">Faça Login</h2>
                <p className="text-accent-sage mb-8 max-w-xs">Acesse seu perfil para ver seus pedidos anteriores e itens favoritos.</p>
                <button onClick={onLoginClick} className="bg-primary text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:brightness-105 transition-all">
                    Entrar ou Cadastrar
                </button>
            </div>
        )
    }

    return (
        <div className="bg-background-cream md:bg-gray-50 h-full overflow-y-auto pb-32">
            <div className="w-full max-w-4xl mx-auto md:py-10">
                <div className="bg-white md:rounded-3xl shadow-sm md:shadow-xl overflow-hidden">
                    <div className="h-32 bg-primary/10 w-full relative">
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                                <img src="https://i.imgur.com/7IWm3ih.png" alt="Logo" className="w-full h-full object-contain p-4" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-8 px-6 text-center md:text-left md:flex md:justify-between md:items-end md:px-10">
                        <div>
                            <h1 className="text-2xl font-bold text-dark-green">{user.user_metadata?.full_name || 'Usuário'}</h1>
                            <p className="text-accent-sage text-sm font-medium">{user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border-t border-gray-100">
                        {['Meus Pedidos', 'Favoritos', 'Configurações'].map((item, i) => (
                            <div
                                key={item}
                                onClick={() => {
                                    if (i === 0) onOrdersClick();
                                    if (i === 1) onFavoritesClick();
                                    if (i === 2) onSettingsClick();
                                }}
                                className="bg-white p-6 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-white group-hover:shadow-sm flex items-center justify-center text-primary transition-all">
                                        {i === 0 ? <Receipt size={22} /> : i === 1 ? <Heart size={22} /> : <Settings size={22} />}
                                    </div>
                                    <span className="font-bold text-dark-green text-lg">{item}</span>
                                </div>
                                <div className="text-gray-300 group-hover:text-primary transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-gray-50">
                        <button onClick={onLogout} className="flex items-center gap-2 text-bordeaux font-bold hover:underline">
                            <LogOut size={20} />
                            Sair da conta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
