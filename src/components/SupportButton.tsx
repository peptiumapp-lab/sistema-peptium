import { Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { SUPPORT_LINK } from '../constants';

export default function SupportButton() {
  return (
    <motion.a
      href={SUPPORT_LINK}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 229, 255, 1)' }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 w-14 h-14 bg-accent/20 backdrop-blur-xl border border-accent/40 text-accent rounded-2xl flex items-center justify-center shadow-2xl z-[100] transition-colors"
    >
      <Mail size={24} />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,1)]" />
    </motion.a>
  );
}
