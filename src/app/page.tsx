"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hammer, Droplets, Zap, Paintbrush, HardHat, Settings, Briefcase, ArrowRight, Star, MapPin, Shield, Search, ChevronDown, Award, Smartphone, TrendingUp, MessageSquare, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const trades = [
  { name: "Electrician", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { name: "Plumber", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Carpenter", icon: Hammer, color: "text-orange-800", bg: "bg-orange-800/10" },
  { name: "Painter", icon: Paintbrush, color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "Mason", icon: HardHat, color: "text-gray-600", bg: "bg-gray-600/10" },
  { name: "HVAC", icon: Settings, color: "text-cyan-500", bg: "bg-cyan-500/10" },
];

const stats = [
  { label: "Verified Pros", value: "10k+", icon: Shield },
  { label: "Jobs Completed", value: "25k+", icon: Briefcase },
  { label: "Rating", value: "4.9/5", icon: Star },
  { label: "Indian Cities", value: "50+", icon: MapPin },
];

export default function Home() {
  const containerRef = useRef(null);
  const titleWords = "Bharat ke Kaarigar, Ab Digital".split(" ");

  return (
    <main className="min-h-screen bg-surface mesh-gradient selection:bg-primary selection:text-white" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 md:pt-64 pb-20 md:pb-40 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-7 space-y-8 md:space-y-12 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full border border-primary/20 text-primary font-bold text-[10px] tracking-widest uppercase shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Bharat's Most Trusted Trade Network
              </motion.div>
              
              <h1 className="text-fluid-h1 font-display font-black tracking-tighter leading-[0.85] break-words">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 100, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      delay: i * 0.1, 
                      duration: 1, 
                      ease: [0.215, 0.61, 0.355, 1.0] 
                    }}
                    className="inline-block mr-[0.2em] last:mr-0 perspective-1000"
                  >
                    {word === "Digital" ? (
                      <span className="text-primary italic inline-block hover:scale-110 transition-transform duration-500">Digital</span>
                    ) : word}
                  </motion.span>
                ))}
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-lg md:text-2xl text-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                The digital destination for India's skilled workforce. Find verified electricians, plumbers, painters, and more within minutes.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-6 justify-center lg:justify-start"
              >
                <Link href="/workers" className="group relative bg-secondary text-white px-10 md:px-14 py-5 md:py-6 text-lg font-display font-black overflow-hidden transition-all hover:shadow-glow text-center rounded-xl md:rounded-2xl">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    HIRE PROS <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                  </span>
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-primary" 
                  />
                </Link>
                <Link href="/jobs" className="group glass border-secondary/10 px-10 md:px-14 py-5 md:py-6 text-lg font-display font-black hover:border-primary transition-all text-center rounded-xl md:rounded-2xl flex items-center justify-center">
                  BROWSE JOBS
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex items-center gap-6 pt-10 justify-center lg:justify-start"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-surface-dark flex items-center justify-center overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-accent">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xs font-black text-heading uppercase tracking-widest">10,000+ Happy Users</p>
                </div>
              </motion.div>
            </div>

            {/* Visual Element */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative z-10 grid grid-cols-2 gap-4 md:gap-8"
              >
                {trades.slice(0, 4).map((trade, i) => (
                  <motion.div
                    key={trade.name}
                    initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                    animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                    transition={{ delay: 1 + i * 0.1, duration: 1 }}
                    whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
                    className={`glass p-6 md:p-10 space-y-6 md:space-y-8 border-white/60 shadow-premium rounded-2xl md:rounded-3xl shine-effect ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}
                  >
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${trade.bg} flex items-center justify-center rounded-xl md:rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <trade.icon size={28} className={trade.color} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-3xl font-display font-black tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">{trade.name}</h3>
                      <p className="text-[10px] font-black text-muted uppercase tracking-widest">Verified Expert</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15 
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-surface/80 backdrop-blur-sm p-8 md:p-12 shadow-premium text-center lg:text-left space-y-6 rounded-2xl md:rounded-3xl border-white/50 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <stat.icon size={80} />
                </div>
                <stat.icon className="text-primary mx-auto lg:mx-0 group-hover:scale-125 transition-transform duration-500" size={32} />
                <div className="space-y-2">
                  <h4 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-heading group-hover:text-primary transition-colors">{stat.value}</h4>
                  <p className="text-[10px] md:text-xs font-black text-muted uppercase tracking-widest leading-none">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="py-32 md:py-60 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-24 md:space-y-40">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-primary/10 text-primary px-6 py-2 rounded-full inline-block text-[10px] font-black uppercase tracking-widest"
            >
              The Roadmap
            </motion.div>
            <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              HOW IT <span className="text-primary">WORKS</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted font-medium">Simple, secure, and lightning fast for everyone.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
            {/* For Hirers */}
            <div className="space-y-16">
              <h3 className="text-3xl md:text-5xl font-display font-black uppercase text-heading flex items-center gap-4">
                <span className="w-12 h-12 bg-secondary text-white flex items-center justify-center rounded-xl text-2xl">H</span>
                FOR HIRERS
              </h3>
              <div className="space-y-12">
                <StepItem number="01" title="Post Your Job" desc="Fill in the details, set your budget, and post your requirement in minutes." icon={Briefcase} />
                <StepItem number="02" title="Review & Select" desc="Compare profiles, check verified ratings, and chat directly with experts." icon={Search} />
                <StepItem number="03" title="Pay Securely" desc="Pay safely through our integrated gateway only after the work is done." icon={Shield} />
              </div>
            </div>

            {/* For Workers */}
            <div className="space-y-16">
              <h3 className="text-3xl md:text-5xl font-display font-black uppercase text-primary flex items-center gap-4">
                <span className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-xl text-2xl">W</span>
                FOR WORKERS
              </h3>
              <div className="space-y-12">
                <StepItem number="01" title="Create Profile" desc="Showcase your skills, set your daily wage, and get your identity verified." icon={Award} />
                <StepItem number="02" title="Find Local Jobs" desc="Get real-time alerts for opportunities in your neighborhood." icon={Smartphone} />
                <StepItem number="03" title="Build Reputation" desc="Complete jobs, earn high ratings, and unlock featured status." icon={TrendingUp} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-32 md:py-60 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow" style={{ background: "radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 50%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="flex-1 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85]">
                  YOUR <span className="text-primary">SAFETY</span> <br /> IS OUR MISSION
                </h2>
                <p className="text-xl md:text-2xl text-white/70 font-medium">We've built Worko with trust at its core, ensuring a secure environment for every transaction.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <TrustFeature 
                  icon={Shield} 
                  title="Verified Pros" 
                  desc="Every worker undergoes mandatory identity and skill verification." 
                />
                <TrustFeature 
                  icon={Lock} 
                  title="Secure Payments" 
                  desc="Your money is held securely and only released when you're satisfied." 
                />
                <TrustFeature 
                  icon={Award} 
                  title="Quality Guarantee" 
                  desc="Dedicated support team to ensure all work meets high standards." 
                />
                <TrustFeature 
                  icon={MessageSquare} 
                  title="24/7 Support" 
                  desc="Need help? Our team is always available via chat or phone." 
                />
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <motion.div 
                whileHover={{ rotate: -2, scale: 1.02 }}
                className="glass border-white/20 p-12 space-y-10 rounded-4xl shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity" />
                <div className="w-24 h-24 bg-primary flex items-center justify-center rounded-3xl mb-8">
                  <Shield size={48} className="text-white" />
                </div>
                <h3 className="text-3xl font-display font-black uppercase text-white">WORKO PROMISE</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-white/80 font-medium">
                    <CheckCircle2 className="text-primary shrink-0" size={24} />
                    <span>No upfront payments for any task.</span>
                  </li>
                  <li className="flex items-start gap-4 text-white/80 font-medium">
                    <CheckCircle2 className="text-primary shrink-0" size={24} />
                    <span>Direct contact with experts without middlemen.</span>
                  </li>
                  <li className="flex items-start gap-4 text-white/80 font-medium">
                    <CheckCircle2 className="text-primary shrink-0" size={24} />
                    <span>Zero commission for workers on initial jobs.</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trades */}
      <section className="py-32 md:py-48 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 text-[30vw] font-display font-black whitespace-nowrap">EXPERTS</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 md:space-y-32 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="space-y-6">
              <h2 className="text-fluid-h2 font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
                FIND YOUR<br />
                <span className="text-primary">MAESTRO</span>
              </h2>
              <p className="text-xl text-muted max-w-sm font-medium">Browse specialized categories of verified pros in your city.</p>
            </div>
            <Link href="/workers" className="group flex items-center gap-3 text-sm font-display font-black uppercase tracking-widest hover:text-primary transition-colors bg-white/5 px-8 py-4 rounded-full">
              VIEW ALL <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {trades.map((trade, i) => (
              <motion.div
                key={trade.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="perspective-1000"
              >
                <Link href="/workers" className="group relative h-[350px] md:h-[450px] bg-white/5 border border-white/10 p-10 md:p-14 flex flex-col justify-between overflow-hidden rounded-3xl md:rounded-4xl transition-all hover:bg-white/10 hover:border-primary/50 shadow-2xl shine-effect">
                  <div className={`w-20 h-20 md:w-24 md:h-24 ${trade.bg} flex items-center justify-center rounded-2xl md:rounded-3xl transition-transform group-hover:scale-110 duration-500 group-hover:rotate-6`}>
                    <trade.icon size={40} className={trade.color} />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase relative z-10 leading-none group-hover:text-primary transition-colors">{trade.name}</h3>
                  <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-10">
                    <ArrowRight size={40} className="text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 md:py-60 bg-surface/60 backdrop-blur-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase text-heading">WORDS FROM OUR <span className="text-primary">USERS</span></h2>
            <p className="text-xl md:text-2xl text-muted font-medium max-w-2xl mx-auto">Real people, real experiences, and real success stories.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TestimonialCard 
              name="Vikram Mehta" 
              role="Homeowner, Mumbai" 
              text="Worko saved my renovation project. I found a verified plumber in 10 minutes when local options failed me." 
              avatar="https://i.pravatar.cc/100?u=v"
            />
            <TestimonialCard 
              name="Rajesh Kumar" 
              role="Electrician, Delhi" 
              text="My business has grown by 40% since I joined as a verified pro. No more waiting for calls; the jobs find me now." 
              avatar="https://i.pravatar.cc/100?u=r"
            />
            <TestimonialCard 
              name="Anjali Shah" 
              role="Interior Designer" 
              text="The quality of carpenters I find here is top-notch. The verification badge really makes a difference in reliability." 
              avatar="https://i.pravatar.cc/100?u=a"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 md:py-60 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase text-heading">FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span></h2>
            <p className="text-xl text-muted font-medium">Everything you need to know about the platform.</p>
          </div>

          <div className="space-y-4">
            <FAQItem question="Is Worko free to use?" answer="Worko is free for hirers to browse and post jobs. For workers, we have a freemium model where basic listings are free, and premium verified status requires a small annual fee." />
            <FAQItem question="How do you verify professionals?" answer="We conduct identity verification using Aadhar/PAN, check physical documents for ITI certifications, and perform randomized skill assessments for 'Pro' verified experts." />
            <FAQItem question="How do payments work?" answer="We use a secure escrow system. Hirers deposit the amount once a job is accepted, and the funds are released to the worker immediately upon project completion and approval." />
            <FAQItem question="Can I hire for long-term projects?" answer="Yes! While many use us for urgent repairs, you can post requirements for weekly or full-time roles for construction or maintenance projects." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-12 md:p-32 lg:p-40 space-y-12 md:space-y-20 text-center relative overflow-hidden rounded-3xl md:rounded-5xl shadow-premium border-white/60 group"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 rounded-full blur-[120px]" 
            />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
            
            <div className="space-y-8 relative z-10">
              <h2 className="text-fluid-h1 font-display font-black tracking-tighter uppercase leading-[0.85]">
                READY TO <span className="text-primary italic inline-block hover:scale-110 transition-transform">JOIN US?</span>
              </h2>
              <p className="text-xl md:text-3xl text-muted font-medium max-w-3xl mx-auto leading-relaxed">
                Be a part of Bharat's most advanced and trusted trade network. Experience the future of skilled work.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10 relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link href="/onboarding?role=WORKER" className="block bg-primary text-white px-12 md:px-16 py-6 md:py-8 text-xl font-display font-black tracking-widest transition-all shadow-glow rounded-2xl md:rounded-3xl hover:bg-primary-dark">
                  I'M A WORKER
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link href="/onboarding?role=HIRER" className="block bg-secondary text-white px-12 md:px-16 py-6 md:py-8 text-xl font-display font-black tracking-widest transition-all shadow-premium rounded-2xl md:rounded-3xl hover:bg-secondary-dark">
                  I'M A HIRER
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StepItem({ number, title, desc, icon: Icon }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-8 group"
    >
      <div className="space-y-4 shrink-0">
        <div className="text-6xl md:text-7xl font-display font-black text-heading/5 group-hover:text-primary/10 transition-colors">{number}</div>
        <div className="w-12 h-12 bg-surface-dark flex items-center justify-center rounded-xl group-hover:bg-primary transition-all group-hover:text-white">
          <Icon size={24} />
        </div>
      </div>
      <div className="space-y-3 pt-6 md:pt-10">
        <h4 className="text-2xl md:text-3xl font-display font-black uppercase text-heading group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-lg text-muted font-medium leading-relaxed max-w-sm">{desc}</p>
      </div>
    </motion.div>
  );
}

function TrustFeature({ icon: Icon, title, desc }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors"
    >
      <div className="w-14 h-14 bg-primary/20 text-primary flex items-center justify-center rounded-2xl shadow-glow">
        <Icon size={28} />
      </div>
      <h4 className="text-xl font-display font-black uppercase tracking-tight">{title}</h4>
      <p className="text-white/60 font-medium leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ name, role, text, avatar }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass p-10 md:p-14 space-y-8 rounded-4xl shadow-premium border-white/60"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-sm">
          <img src={avatar} alt={name} />
        </div>
        <div>
          <h4 className="text-xl font-display font-black text-heading uppercase tracking-tight">{name}</h4>
          <p className="text-xs font-black text-muted uppercase tracking-widest">{role}</p>
        </div>
      </div>
      <p className="text-lg md:text-xl text-muted font-medium leading-relaxed italic">"{text}"</p>
      <div className="flex gap-1 text-accent">
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-secondary/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 md:py-10 flex justify-between items-center text-left group"
      >
        <span className="text-xl md:text-3xl font-display font-black uppercase text-heading group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown className={`text-primary transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} size={32} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-10 text-lg md:text-xl text-muted font-medium leading-relaxed max-w-4xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TradeCard({ icon: Icon, trade, delay, color, float }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -15, scale: 1.05 }}
      className={`glass p-8 md:p-12 space-y-6 md:space-y-8 shadow-premium border-white/50 group transition-all duration-500 rounded-3xl md:rounded-5xl shine-effect ${float ? "animate-float" : "animate-float-delayed"}`}
    >
      <div className={`${color} w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl md:rounded-3xl shadow-glow group-hover:scale-110 transition-transform`}>
        <Icon className="text-white" size={32} />
      </div>
      <div>
        <div className="text-xs font-black text-muted uppercase tracking-widest mb-2">Verified Expert</div>
        <h3 className="text-xl md:text-2xl font-display font-black text-heading tracking-tight group-hover:text-primary transition-colors">{trade}</h3>
      </div>
    </motion.div>
  );
}



