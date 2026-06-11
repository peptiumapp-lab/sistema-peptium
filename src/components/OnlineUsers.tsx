import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function OnlineUsers() {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const calculateUsers = () => {
      const now = new Date();
      const hour = now.getHours();
      
      let baseUsers = 0;
      let variation = 0;

      if (hour >= 8 && hour < 12) {
        baseUsers = 350;
        variation = Math.floor(Math.random() * 200); // 350 to 550
      } else if (hour >= 12 && hour < 14) {
        baseUsers = 250;
        variation = Math.floor(Math.random() * 100); // 250 to 350
      } else if (hour >= 14 && hour < 18) {
        baseUsers = 350;
        variation = Math.floor(Math.random() * 200); // 350 to 550
      } else if (hour >= 18 && hour < 24) {
        baseUsers = 200;
        variation = Math.floor(Math.random() * 80); // 200 to 280
      } else {
        // 0 to 8 AM
        baseUsers = 70;
        variation = Math.floor(Math.random() * 20); // 70 to 90
      }

      return baseUsers + variation;
    };

    setUsers(calculateUsers());

    const interval = setInterval(() => {
      // Simulate small fluctuations every few seconds
      setUsers(prev => {
        const changeRate = Math.random() > 0.5 ? 1 : -1;
        const change = Math.floor(Math.random() * 5);
        return Math.max(70, prev + (change * changeRate));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 bg-black/80 backdrop-blur-md border border-white/20 p-3 rounded-xl flex items-center gap-3 shadow-lg shadow-black/50" style={{ clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)' }}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
        <div className="bg-accent/20 p-2 rounded-full relative z-10">
          <Users size={14} className="text-accent" />
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-muted">Acessos Agora</div>
        <div className="text-white font-mono text-sm font-medium">
          <span className="text-accent">{users.toLocaleString('pt-BR')}</span> <span className="opacity-50">ativos</span>
        </div>
      </div>
    </div>
  );
}
