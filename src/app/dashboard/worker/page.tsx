"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Briefcase, Star, Eye, CheckCircle, XCircle, Bell, Settings, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function WorkerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = [
    { label: "Profile Views", value: "1,240", icon: Eye, color: "text-blue-500" },
    { label: "Applications", value: "12", icon: Briefcase, color: "text-orange-500" },
    { label: "Avg Rating", value: "4.9", icon: Star, color: "text-accent" },
    { label: "Jobs Done", value: "45", icon: CheckCircle, color: "text-green-500" },
  ];

  const applications = [
    { id: "1", title: "House Wiring", hirer: "Mr. Gupta", date: "2 days ago", status: "PENDING" },
    { id: "2", title: "AC Repair", hirer: "Skyline Apts", date: "4 days ago", status: "ACCEPTED" },
    { id: "3", title: "Switchboard Fix", hirer: "Cafe Coffee", date: "1 week ago", status: "REJECTED" },
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white p-8 border-2 border-secondary shadow-[8px_8px_0px_0px_#0F1C3F]">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-surface-dark border-4 border-primary overflow-hidden relative">
                  <User size={64} className="text-white absolute bottom-0 left-1/2 -translate-x-1/2" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black tracking-tight">RAJESH KUMAR</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted">Electrician • Mumbai</p>
                </div>
                <div className="pt-4 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest">Profile Completion</span>
                    <span className="text-[10px] font-black">85%</span>
                  </div>
                  <div className="h-2 bg-surface border border-muted/10">
                    <div className="h-full bg-primary w-[85%]" />
                  </div>
                </div>
              </div>
            </div>

            <nav className="bg-white border-2 border-muted/10 divide-y divide-muted/10">
              <Link href="/dashboard/worker" className="flex items-center gap-4 px-6 py-4 font-bold text-sm bg-primary text-white">
                <Briefcase size={18} /> DASHBOARD
              </Link>
              <Link href="/dashboard/worker/profile" className="flex items-center gap-4 px-6 py-4 font-bold text-sm hover:bg-surface transition-colors">
                <User size={18} /> MY PROFILE
              </Link>
              <Link href="/dashboard/worker/notifications" className="flex items-center gap-4 px-6 py-4 font-bold text-sm hover:bg-surface transition-colors">
                <Bell size={18} /> NOTIFICATIONS
              </Link>
              <Link href="/dashboard/worker/settings" className="flex items-center gap-4 px-6 py-4 font-bold text-sm hover:bg-surface transition-colors">
                <Settings size={18} /> SETTINGS
              </Link>
            </nav>

            <div className="bg-secondary p-8 text-white space-y-6">
              <div className="space-y-2">
                <h4 className="font-display font-black tracking-tight uppercase">GO PREMIUM</h4>
                <p className="text-xs text-muted leading-relaxed">Featured workers get 10x more visibility and job requests.</p>
              </div>
              <button className="w-full bg-accent text-primary-dark py-3 font-display font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-colors">
                UPGRADE NOW
              </button>
            </div>
          </aside>

          {/* Main Dashboard */}
          <section className="lg:col-span-3 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <h1 className="text-5xl font-display font-black tracking-tighter uppercase">WORKER DASHBOARD</h1>
                <p className="text-muted font-medium">Welcome back, Rajesh! Check your recent activity.</p>
              </div>
              
              {/* Availability Toggle */}
              <div className="bg-white p-4 border-2 border-secondary flex items-center gap-6 shadow-[8px_8px_0px_0px_#F5C518]">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-black uppercase tracking-widest">Availability</div>
                  <div className={`text-sm font-black ${isAvailable ? "text-green-500" : "text-muted"}`}>
                    {isAvailable ? "AVAILABLE NOW" : "OFF DUTY"}
                  </div>
                </div>
                <button 
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${isAvailable ? "bg-primary" : "bg-muted/20"}`}
                >
                  <motion.div 
                    animate={{ x: isAvailable ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md" 
                  />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 border-2 border-muted/10 space-y-4 hover:border-secondary transition-colors">
                  <div className={`w-10 h-10 ${stat.color} bg-current/10 flex items-center justify-center`}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <div className="text-3xl font-display font-black">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Applications */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-display font-black tracking-tighter uppercase">RECENT APPLICATIONS</h3>
                <Link href="/dashboard/worker/applications" className="text-xs font-black uppercase tracking-widest text-primary hover:underline">View All</Link>
              </div>
              
              <div className="bg-white border-2 border-secondary overflow-hidden divide-y divide-muted/10">
                {applications.map((app) => (
                  <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-surface transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-secondary text-white flex items-center justify-center font-display font-black">
                        {app.title[0]}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{app.title}</h4>
                        <p className="text-xs font-medium text-muted">{app.hirer} • {app.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 ${
                        app.status === "PENDING" ? "border-accent text-primary-dark" :
                        app.status === "ACCEPTED" ? "border-green-500 text-green-500" :
                        "border-red-500 text-red-500"
                      }`}>
                        {app.status}
                      </div>
                      <Link href={`/jobs/${app.id}`} className="p-2 border-2 border-muted/10 hover:border-primary transition-colors">
                        <ArrowUpRight size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Banner */}
            <div className="bg-primary p-10 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-[16px_16px_0px_0px_#0F1C3F]">
              <div className="space-y-2 relative z-10">
                <h3 className="text-4xl font-display font-black tracking-tighter uppercase">GET THE VERIFIED BADGE</h3>
                <p className="text-white/80 font-medium max-w-lg">Upload your ITI certificate and ID proof to build trust with hirers and get 5x more job offers.</p>
              </div>
              <button className="bg-white text-primary px-8 py-4 font-display font-black uppercase tracking-widest text-sm hover:bg-accent transition-colors relative z-10 shrink-0">
                UPLOAD DOCUMENTS
              </button>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            </div>

          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
