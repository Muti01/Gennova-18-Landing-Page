import React, { useState, useEffect } from 'react';
import { X, User, Key, Mail, Loader2, Fingerprint, AlertCircle } from 'lucide-react';
import { loginWithGoogle, loginWithEmail } from '../services/firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'selection' | 'email-form'>('selection');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
        setView('selection');
        setEmail('');
        setPassword('');
        setLoading(false);
        setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      if (user) onLogin(user);
    } catch (err: any) {
      console.error("Login Error:", err);
      setError("Error de autenticación. Intente con email.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithEmail(email, password);
      onLogin(user);
    } catch (err: any) {
      setError("Credenciales inválidas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderSelection = () => (
    <div className="w-full space-y-4 animate-fade-in">
        <p className="text-center text-white text-[10px] font-mono mb-6 leading-relaxed uppercase tracking-[0.2em] px-4">
           Acceso restringido para Miembros Certificados de la Cohorte Gennova.
        </p>

        <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-black h-12 flex items-center justify-center gap-3 hover:bg-gray-200 transition-all font-bold text-xs uppercase tracking-wider rounded-lg group"
        >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : (
            <>
                <div className="w-4 h-4 mr-1">
                    <svg viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </div>
                <span>Continuar con Google</span>
            </>
            )}
        </button>

        <button 
            onClick={() => setView('email-form')}
            disabled={loading}
            className="w-full bg-transparent border border-gennova-cyan text-gennova-cyan h-12 flex items-center justify-center gap-3 hover:bg-gennova-cyan/10 transition-all font-bold text-xs uppercase tracking-wider rounded-lg"
        >
            <Mail size={16} />
            Usar Email
        </button>
    </div>
  );

  const renderEmailForm = () => (
    <div className="w-full space-y-4 animate-fade-in">
        <button 
            onClick={() => setView('selection')}
            className="text-gray-500 hover:text-white text-xs flex items-center gap-1 mb-4 font-mono uppercase tracking-widest hover:underline"
        >
            <X size={12} className="rotate-45" /> Cancelar
        </button>
        
        <div className="space-y-3">
            <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-500" size={16} />
                <input 
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 text-white text-sm py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:border-gennova-gold transition-colors placeholder-gray-600"
                />
            </div>
            <div className="relative">
                <Key className="absolute left-3 top-3.5 text-gray-500" size={16} />
                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 text-white text-sm py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:border-gennova-gold transition-colors placeholder-gray-600"
                />
            </div>
        </div>

        <button 
            onClick={handleEmailLogin}
            disabled={loading || !email || !password}
            className="w-full bg-gennova-gold text-black h-12 flex items-center justify-center gap-3 hover:brightness-110 transition-all font-bold text-xs uppercase tracking-wider rounded-lg mt-4 disabled:opacity-50 shadow-lg"
        >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Acceder'}
        </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
       <div className="w-full max-w-sm relative overflow-hidden bg-gennova-surface border border-white/10 shadow-2xl rounded-2xl">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gennova-gold to-transparent opacity-50"></div>
          
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-white z-20 transition-colors">
             <X size={20} />
          </button>
          
          <div className="p-8 pt-12 flex flex-col items-center relative z-10">
             
             <div className="mb-8 relative">
                 <div className="w-20 h-20 border border-white/5 bg-black rounded-full flex items-center justify-center relative">
                    <Fingerprint className="text-gennova-gold w-10 h-10 animate-pulse" strokeWidth={1} />
                 </div>
                 <div className="absolute -bottom-8 w-full text-center">
                    <span className="text-[10px] text-white font-mono uppercase tracking-[0.2em]">Portal de Miembros</span>
                 </div>
             </div>
            
             {error && (
                <div className="w-full mb-6 p-3 bg-red-900/10 border border-red-900/30 rounded flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle size={14} />
                    {error}
                </div>
             )}

             {view === 'selection' ? renderSelection() : renderEmailForm()}
             
             <div className="mt-8 pt-4 w-full border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-gray-600 uppercase">
                 <span>Gennova ID</span>
                 <span>SSL Encrypted</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default LoginModal;