"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, User, Briefcase } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 20;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  const dashboardPath = session?.user && (session.user as any).role === "WORKER" 
    ? "/dashboard/worker" 
    : "/dashboard/hirer";

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left"
        style={{ scaleX }}
      />
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled ? "py-3 md:py-5" : "py-6 md:py-10"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className={`glass rounded-2xl md:rounded-3xl transition-all duration-500 overflow-hidden ${
            isScrolled ? "bg-surface/90 shadow-premium border-white/40" : "bg-surface/40 backdrop-blur-md border-white/20"
          }`}>
            <div className="flex justify-between items-center px-6 md:px-10 h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 md:gap-3 group relative z-[110]">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  className="transition-transform duration-500 rounded-lg overflow-hidden flex items-center justify-center bg-white"
                >
                  <Image src="/logoimage.png" alt="Worko Logo" width={48} height={48} className="object-cover" />
                </motion.div>
                <span className="text-xl md:text-2xl font-display font-extrabold tracking-tighter uppercase text-heading">
                  Wor<span className="text-primary">ko</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-10">
                <NavLink href="/workers" label="Find Pros" />
                <NavLink href="/jobs" label="Browse Jobs" />
                <div className="flex items-center gap-6 ml-6 pl-6 border-l border-muted/20">
                  {status === "loading" ? (
                    <div className="w-20 h-4 bg-muted/20 animate-pulse rounded"></div>
                  ) : session ? (
                    <>
                      <Link href={dashboardPath} className="text-xs font-black uppercase tracking-widest text-heading hover:text-primary transition-colors flex items-center gap-2">
                        <User size={14} className="text-primary" />
                        {session.user?.name?.split(' ')[0] || "Dashboard"}
                      </Link>
                      <button 
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-xs font-black uppercase tracking-widest text-muted hover:text-red-500 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="text-xs font-black uppercase tracking-widest text-heading hover:text-primary transition-colors">
                        Login
                      </Link>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/onboarding" className="group relative bg-secondary text-white px-8 py-3 text-[10px] font-display font-black uppercase tracking-widest overflow-hidden rounded-xl">
                          <span className="relative z-10">JOIN NOW</span>
                          <motion.div 
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-primary" 
                          />
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden p-2 text-heading relative z-[110] hover:scale-110 active:scale-95 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[101] lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-surface z-[105] shadow-2xl flex flex-col p-10 pt-32"
              >
                <div className="flex flex-col gap-8">
                  {session && (
                    <div className="pb-8 border-b border-muted/10">
                       <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Welcome back</p>
                       <p className="text-3xl font-display font-black text-heading uppercase">{session.user?.name}</p>
                    </div>
                  )}
                  <MobileNavLink 
                    href="/workers" 
                    label="Find Professionals" 
                    icon={User} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                  />
                  <MobileNavLink 
                    href="/jobs" 
                    label="Browse Gigs" 
                    icon={Briefcase} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                  />
                  
                  <div className="mt-8 space-y-6 pt-8 border-t border-muted/10">
                    {session ? (
                      <>
                        <Link 
                          href={dashboardPath}
                          onClick={() => setIsMobileMenuOpen(false)} 
                          className="flex justify-between items-center text-2xl font-display font-black uppercase text-heading group"
                        >
                          My Dashboard <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <button 
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                          className="w-full bg-surface border-2 border-red-500/20 text-red-500 text-center py-5 text-lg font-display font-black uppercase block rounded-2xl"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          href="/login" 
                          onClick={() => setIsMobileMenuOpen(false)} 
                          className="flex justify-between items-center text-2xl font-display font-black uppercase text-heading group"
                        >
                          Login <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link 
                          href="/onboarding" 
                          onClick={() => setIsMobileMenuOpen(false)} 
                          className="w-full bg-primary text-white text-center py-6 text-xl font-display font-black uppercase shadow-glow block rounded-2xl"
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-auto pb-10">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest">© 2026 WORKO</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative text-xs font-black uppercase tracking-widest text-heading hover:text-primary transition-colors group">
      {label}
      <motion.span 
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
        whileHover={{ width: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </Link>
  );
}

function MobileNavLink({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: any; onClick: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href} onClick={onClick} className="flex items-center gap-4 text-3xl font-display font-black uppercase text-heading hover:text-primary transition-all group">
        <div className="w-12 h-12 bg-secondary/5 flex items-center justify-center rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon size={24} />
        </div>
        {label}
      </Link>
    </motion.div>
  );
}


