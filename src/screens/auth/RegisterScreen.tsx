import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const RegisterScreen = ({ onBack, onRegister }: { onBack: () => void, onRegister: () => void }) => (
    <div className="flex flex-col min-h-full items-center justify-center bg-background-cream p-8 relative w-full">
        <div className="w-full max-w-md">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-primary hover:bg-primary/10 rounded-full mb-6">
                <ChevronLeft size={28} />
            </button>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-green mb-2">Crie sua Conta</h1>
                <p className="text-accent-sage font-medium">Junte-se à nossa experiência artesanal</p>
            </div>
            <div className="bg-white/40 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl space-y-4">
                <input className="w-full bg-white/70 border-white rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-accent-sage/50" placeholder="Nome Completo" />
                <input className="w-full bg-white/70 border-white rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-accent-sage/50" placeholder="E-mail" />
                <input className="w-full bg-white/70 border-white rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-accent-sage/50" placeholder="Senha" type="password" />
                <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" className="text-primary rounded border-accent-sage focus:ring-primary w-4 h-4" />
                    <span className="text-sm text-dark-green/80">Aceito os termos e condições</span>
                </div>
                <button onClick={onRegister} className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl shadow-lg mt-4 hover:brightness-105 transition-all">
                    Cadastrar agora
                </button>
            </div>
        </div>
    </div>
);
