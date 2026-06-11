import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../lib/firebase';
import { PeptiumLogo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      onClose();
    } catch (error) {
      // Error is handled in firebase function with alert
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      // Error handled in firebase.ts
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0B0C10] p-6 lg:p-8 rounded-2xl w-full max-w-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_32px_rgba(0,229,255,0.02)] relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={16} />
          </button>

          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
              <PeptiumLogo className="w-12 h-12 relative z-10" glowing />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider text-center">
              {isLogin ? 'Acesso Neural' : 'Criar Conta Prime'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-bold text-secondary/70 uppercase tracking-wider ml-1 mb-2 block">
                  Nome Completo
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-secondary/70 uppercase tracking-wider ml-1 mb-2 block">
                E-mail
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-secondary/70 uppercase tracking-wider ml-1 mb-2 block">
                Senha
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all mt-6 flex justify-center items-center gap-2"
            >
              {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-bold text-white/50 uppercase tracking-wider">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent hover:text-white transition-colors"
            >
              {isLogin ? 'Cadastre-se' : 'Faça Login'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
