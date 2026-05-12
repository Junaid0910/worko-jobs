"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hammer, ArrowLeft, Construction } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UnderConstruction({ pageName }: { pageName: string }) {
  return (
    <main className="min-h-screen bg-surface mesh-gradient flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center space-y-12"
        >
          <div className="relative inline-block group">
            <motion.div 
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="bg-primary/20 text-primary p-8 rounded-4xl shadow-glow inline-flex relative z-10"
            >
              <Construction size={80} />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
          </div>

          <div className="space-y-6">
            <div className="inline-block bg-accent/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary-dark border border-accent/30 rounded-full">
              Work In Progress
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              {pageName} <span className="text-primary block mt-2">COMING SOON</span>
            </h1>
            <p className="text-xl text-muted font-medium max-w-lg mx-auto">
              Our master craftsmen are still working on this page. We're building something extraordinary, just for you.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link 
              href="/" 
              className="group bg-secondary text-white px-10 py-5 rounded-2xl text-sm font-display font-black uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-surface-dark hover:shadow-premium"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} /> 
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
