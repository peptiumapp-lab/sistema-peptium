import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_LINK } from '../constants';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl z-40"
    >
      <MessageCircle size={32} fill="currentColor" />
    </motion.a>
  );
}
