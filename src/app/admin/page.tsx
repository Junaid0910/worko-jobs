"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Briefcase, IndianRupee, Search, Check, X, Eye, FileText, TrendingUp } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("VERIFICATION");

  const pendingVerifications = [
    { id: "1", name: "Junaid Sheikh", trade: "ELECTRICIAN", city: "Mumbai", date: "1 hour ago" },
    { id: "2", name: "Suresh Raina", trade: "PLUMBER", city: "Chennai", date: "3 hours ago" },
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b-8 border-secondary pb-8">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none">ADMIN CONTROL</h1>
              <p className="text-xl text-muted font-bold tracking-widest uppercase">System Overview & Management</p>
            </div>
            
            <div className="flex bg-white border-4 border-secondary p-2">
              {["STATS", "VERIFICATION", "USERS", "JOBS"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? "bg-primary text-white" : "hover:bg-surface"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Total Users", value: "85,240", icon: Users, color: "text-blue-500" },
              { label: "Active Jobs", value: "1,420", icon: Briefcase, color: "text-orange-500" },
              { label: "Verification Req", value: "42", icon: Shield, color: "text-primary" },
              { label: "Revenue (MTD)", value: "₹4,20,000", icon: TrendingUp, color: "text-green-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 border-2 border-muted/10 space-y-4 shadow-xl">
                <stat.icon className={stat.color} size={32} />
                <div>
                  <div className="text-4xl font-display font-black">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="bg-white border-4 border-secondary shadow-[24px_24px_0px_0px_#0F1C3F] overflow-hidden">
            {activeTab === "VERIFICATION" && (
              <div className="divide-y-4 divide-secondary">
                <div className="p-8 bg-secondary text-white flex justify-between items-center">
                  <h3 className="text-2xl font-display font-black tracking-tighter uppercase">PENDING VERIFICATIONS</h3>
                  <div className="relative">
                    <input type="text" placeholder="Search by name..." className="bg-white/10 border border-white/20 px-4 py-2 text-xs outline-none focus:border-accent" />
                  </div>
                </div>

                {pendingVerifications.map((req) => (
                  <div key={req.id} className="p-8 flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-surface transition-colors">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-muted/10 flex items-center justify-center font-display font-black text-2xl text-secondary">
                        {req.name[0]}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-display font-black tracking-tight group-hover:text-primary transition-colors">{req.name}</h4>
                        <div className="flex gap-4 text-[10px] font-black text-muted uppercase tracking-widest">
                          <span>{req.trade}</span>
                          <span>{req.city}</span>
                          <span>Applied {req.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="bg-surface border-2 border-secondary px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-secondary hover:text-white transition-all">
                        <FileText size={16} /> VIEW DOCS
                      </button>
                      <button className="bg-primary text-white px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary-dark transition-all shadow-[4px_4px_0px_0px_#0F1C3F] hover:shadow-none translate-x-[-2px] translate-y-[-2px]">
                        <Check size={16} /> APPROVE
                      </button>
                      <button className="bg-red-500 text-white px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all">
                        <X size={16} /> REJECT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab !== "VERIFICATION" && (
              <div className="p-32 text-center space-y-4">
                <Search size={64} className="mx-auto text-muted opacity-20" />
                <h3 className="text-2xl font-display font-black text-muted">MODULE UNDER DEVELOPMENT</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
