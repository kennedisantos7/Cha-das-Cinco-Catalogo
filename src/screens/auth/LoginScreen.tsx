
import React, { useState } from 'react';
import { User, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export const LoginScreen = ({ onLogin, onRegister }: { onLogin: () => void, onRegister: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { session } = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            onLogin();
        }
    };

    return (
        <div className="flex flex-col min-h-full items-center justify-center bg-background-cream p-8 relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-soft-pink opacity-20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary opacity-10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="w-full max-w-md z-10">
                <div className="mb-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/60 shadow-xl">
                        <span className="text-5xl">☕</span>
                    </div>
                    <h1 className="text-4xl font-bold text-dark-green tracking-tight mb-2">Chá das Cinco</h1>
                    <p className="text-accent-sage font-medium uppercase tracking-widest text-xs bg-white/50 px-4 py-1 rounded-full">Artesanal & Delicado</p>
                </div>

                <div className="bg-white/40 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-dark-green/60 ml-1">E-mail</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/70 border-white border rounded-xl py-3.5 px-5 text-dark-green placeholder-accent-sage/70 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="exemplo@email.com"
                            type="email"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-dark-green/60 ml-1">Senha</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/70 border-white border rounded-xl py-3.5 px-5 text-dark-green placeholder-accent-sage/70 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </div>

                <p className="text-center text-sm text-dark-green/70 mt-8 cursor-pointer hover:text-primary transition-colors" onClick={onRegister}>
                    Não tem uma conta? <span className="text-primary font-bold">Cadastre-se</span>
                </p>
            </div>
        </div>
    );
};
