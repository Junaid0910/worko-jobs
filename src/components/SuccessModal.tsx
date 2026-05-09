"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, title, message }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white glass p-8 md:p-12 rounded-4xl shadow-2xl max-w-lg w-full text-center space-y-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-muted hover:text-secondary transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-primary/20 text-primary flex items-center justify-center rounded-3xl shadow-glow animate-bounce">
                <CheckCircle2 size={48} />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-display font-black uppercase text-secondary tracking-tight">
                {title}
              </h3>
              <p className="text-lg text-muted font-medium leading-relaxed">
                {message}
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="w-full bg-secondary text-white py-5 rounded-2xl font-display font-black uppercase tracking-widest hover:bg-primary transition-all shadow-premium"
            >
              Back to Browsing
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
