import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Shield, Plus, Trash2, Clock, Calendar, CheckCircle } from 'lucide-react';

interface ProGrant {
  email: string;
  expiresAt: number;
  createdAt: number;
  type: 'monthly' | 'annual';
}

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [grants, setGrants] = useState<ProGrant[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    // Auto-migrate hardcoded users to Firestore if they don't exist yet
    const seedInitialUsers = async () => {
      const tempUsers = {
        'peptideopro@gmail.com': new Date('2026-06-27T23:59:59Z').getTime(),
        'abraaoalvesdesa18@gmail.com': new Date('2026-06-27T23:59:59Z').getTime()
      };
      
      for (const [email, expiresAt] of Object.entries(tempUsers)) {
        try {
          const docRef = doc(db, 'pro_grants', email);
          const snap = await getDoc(docRef);
          if (!snap.exists()) {
            await setDoc(docRef, {
              email,
              expiresAt,
              createdAt: Date.now(),
              type: 'monthly'
            });
          }
        } catch (e) {
          console.error("Error seeding user:", e);
        }
      }
    };
    
    seedInitialUsers();

    const q = query(collection(db, 'pro_grants'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: ProGrant[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data() as ProGrant);
      });
      data.sort((a, b) => b.createdAt - a.createdAt);
      setGrants(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleAddGrant = async (type: 'monthly' | 'annual') => {
    if (!newEmail || !newEmail.includes('@')) {
      alert("Por favor insira um email válido.");
      return;
    }

    let normalizedEmail = newEmail.toLowerCase().trim();
    if (normalizedEmail.endsWith('@gmail.com')) {
      const [username, domain] = normalizedEmail.split('@');
      normalizedEmail = `${username.replace(/\./g, '')}@${domain}`;
    }

    const durationDays = type === 'monthly' ? 30 : 365;
    const expiresAt = Date.now() + durationDays * 24 * 60 * 60 * 1000;

    try {
      await setDoc(doc(db, 'pro_grants', normalizedEmail), {
        email: normalizedEmail,
        expiresAt,
        createdAt: Date.now(),
        type
      });
      setNewEmail('');
    } catch (e) {
      console.error(e);
      alert("Erro ao adicionar acesso.");
    }
  };

  const handleRemoveGrant = async (email: string) => {
    if (confirm(`Remover acesso de ${email}?`)) {
      try {
        await deleteDoc(doc(db, 'pro_grants', email));
      } catch (e) {
        console.error(e);
        alert("Erro ao remover acesso.");
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-24 px-4 max-w-7xl mx-auto flex justify-center items-center h-64">
        <p className="text-white">Acesso negado.</p>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-12 flex items-center gap-4">
        <Shield className="w-10 h-10 text-accent" />
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-widest">Painel Administrativo</h1>
          <p className="text-white/40 text-sm uppercase tracking-widest">Gerencie acessos temporários Pro</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-12">
        <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
          <Plus size={18} /> Conceder Acesso
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email do usuário"
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
          />
          <button 
            onClick={() => handleAddGrant('monthly')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
          >
            <Clock size={16} /> 30 Dias
          </button>
          <button 
            onClick={() => handleAddGrant('annual')}
            className="px-6 py-3 bg-accent hover:bg-accent/80 text-black rounded-xl font-bold text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
          >
            <Calendar size={16} /> 1 Ano
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
           Acessos Ativos ({grants.length})
          </h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center text-white/50">Carregando...</div>
        ) : grants.length === 0 ? (
          <div className="p-6 text-center text-white/50">Nenhum acesso concedido.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-white/40 text-xs font-bold uppercase tracking-widest">
                  <th className="p-4">Email</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Expira em</th>
                  <th className="p-4 w-10">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {grants.map((grant) => {
                  const isExpired = Date.now() > grant.expiresAt;
                  return (
                    <tr key={grant.email} className={isExpired ? 'opacity-40' : ''}>
                      <td className="p-4 font-medium text-white">{grant.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${grant.type === 'annual' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-white'}`}>
                          {grant.type === 'annual' ? '1 Ano' : '30 Dias'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {isExpired ? (
                            <span className="text-red-500 font-bold">Expirado</span>
                          ) : (
                            <>
                              <CheckCircle size={14} className="text-green-500" />
                              <span className="text-white/80">{new Date(grant.expiresAt).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleRemoveGrant(grant.email)}
                          className="p-2 text-white/40 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
