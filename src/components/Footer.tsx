"use client";

import { Globe, MessageCircle, Share2, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-32 pb-12 overflow-hidden relative">
      {/* Large Decorative Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/5 whitespace-nowrap select-none pointer-events-none">
        WORKO WORKO
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          
          <div className="space-y-10 lg:col-span-2">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-white group-hover:rotate-12 transition-transform duration-500 rounded-lg flex items-center justify-center overflow-hidden">
                <Image src="/logoimage.png" alt="Worko Logo" width={56} height={56} className="object-cover" />
              </div>
              <span className="text-4xl font-display font-extrabold tracking-tighter uppercase">
                Wor<span className="text-primary">ko</span>
              </span>
            </Link>
            <p className="text-xl text-muted max-w-sm leading-relaxed font-medium">
              Revolutionizing the way India hires skilled tradespeople. Excellence in every trade, trust in every connection.
            </p>
            <div className="flex gap-6">
              {[Globe, MessageCircle, Share2, Mail].map((Icon, i) => (
                <Link key={i} href="#" className="w-14 h-14 bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300">
                  <Icon size={24} />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="text-xl font-display font-black tracking-widest uppercase text-primary">Company</h4>
            <ul className="space-y-6">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-xl font-display font-black tracking-widest uppercase text-primary">Services</h4>
            <ul className="space-y-6">
              <FooterLink href="/workers">Hire Professionals</FooterLink>
              <FooterLink href="/jobs">Post a Job</FooterLink>
              <FooterLink href="/onboarding?role=WORKER">Join as Worker</FooterLink>
              <FooterLink href="/verification">Get Verified</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm font-bold text-muted uppercase tracking-widest">
            © 2026 WORKO. MADE WITH PRIDE IN INDIA.
          </p>
          <div className="flex gap-12 text-sm font-bold text-muted uppercase tracking-widest">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-primary transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group flex items-center gap-2 text-lg font-medium text-muted hover:text-white transition-colors">
        {children}
        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </li>
  );
}
