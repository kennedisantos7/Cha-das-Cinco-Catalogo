import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-dark-green text-white py-12 px-6 mt-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 overflow-hidden">
                        <img src="https://i.imgur.com/7IWm3ih.png" alt="Logo Chá das Cinco" className="w-12 h-12 object-contain" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Chá das Cinco</h2>
                    <p className="text-accent-sage text-sm mt-2 max-w-xs">
                        Artesanal, delicado e feito com amor. A melhor experiência em confeitaria e chás.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-accent-sage">Links Úteis</h3>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Sobre Nós</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Catálogo Completo</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Política de Privacidade</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Termos de Uso</a>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col gap-4 items-center md:items-start">
                    <h3 className="font-bold text-lg text-accent-sage">Contato</h3>
                    <p className="text-sm flex items-center gap-2">
                        <Mail size={16} />
                        contato@chadascinco.com
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-accent-sage/60 gap-4">
                <p>&copy; {new Date().getFullYear()} Chá das Cinco. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};
