
import React, { useState } from 'react';
import { Shield, Lock, ChevronLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const SettingsScreen = ({ onBack }: { onBack: () => void }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpdatePassword = async () => {
        if (!newPassword || !confirmPassword) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        if (newPassword.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        setLoading(false);

        if (error) {
            alert('Erro ao atualizar senha: ' + error.message);
        } else {
            setSuccess(true);
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setSuccess(false), 5000);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background-cream">
            {/* Header */}
            <div className="px-6 py-4 flex items-center gap-4 border-b border-accent-sage/10 bg-white/50 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors text-dark-green">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-dark-green">Configurações</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Security Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <Shield size={20} />
                        <h3 className="font-bold uppercase tracking-widest text-sm">Segurança</h3>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-accent-sage/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-green">Alterar Senha</h4>
                                <p className="text-xs text-accent-sage">Mantenha sua conta protegida</p>
                            </div>
                        </div>

                        {success && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                                <CheckCircle size={20} />
                                <span className="font-medium text-sm">Senha atualizada com sucesso!</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-dark-green/60 ml-1">Nova Senha</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-gray-50 border-gray-100 border rounded-xl py-3 px-4 text-dark-green focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-dark-green/60 ml-1">Repetir Senha</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-gray-50 border-gray-100 border rounded-xl py-3 px-4 text-dark-green focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Confirme sua nova senha"
                                />
                            </div>

                            <button
                                onClick={handleUpdatePassword}
                                disabled={loading}
                                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-70 mt-2"
                            >
                                {loading ? 'Atualizando...' : 'Confirmar Alteração'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-10">
                    <p className="text-xs text-accent-sage italic">Chá das Cinco &copy; Proteção de Dados 2026</p>
                </div>
            </div>
        </div>
    );
};
