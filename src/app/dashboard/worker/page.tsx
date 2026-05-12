"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Briefcase, Star, Eye, CheckCircle, XCircle, Bell, Settings, Award, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function WorkerDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard/worker");
        if (res.ok) {
          const json = await res.json();
          setData(json);
          setIsAvailable(json.worker?.isAvailable ?? true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </main>
    );
  }

  if (!data?.worker) {
    return (
      <main className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-black text-heading">PROFILE NOT FOUND</h1>
            <p className="text-muted">Please complete your onboarding to access the dashboard.</p>
            <Link href="/onboarding" className="inline-block bg-primary text-white px-8 py-3 font-black uppercase rounded-xl">Complete Profile</Link>
          </div>
        </div>
      </main>
    );
  }

  const { worker, user } = data;

  const stats = [
    { label: "Total Applications", value: worker.applications?.length || 0, icon: Briefcase, color: "text-orange-500" },
    { label: "Jobs Done", value: worker.totalJobs || 0, icon: CheckCircle, color: "text-green-500" },
    { label: "Avg Rating", value: worker.rating || "New", icon: Star, color: "text-accent" },
    { label: "Profile Views", value: "0", icon: Eye, color: "text-blue-500" }, // Mocked since we don't track views yet
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-surface p-8 border-2 border-secondary shadow-[8px_8px_0px_0px_#0F1C3F]">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-surface-dark border-4 border-primary overflow-hidden relative flex items-center justify-center text-3xl font-display font-black text-white">
                  {user.name?.[0] || "?"}
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black tracking-tight uppercase">{user.name}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted">{worker.trade} • {user.city}</p>
                </div>
                <div className="pt-4 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest">Profile Completion</span>
                    <span className="text-[10px] font-black">100%</span>
                  </div>
                  <div className="h-2 bg-surface border border-muted/10">
                    <div className="h-full bg-primary w-[100%]" />
                  </div>
                </div>
              </div>
            </div>

            <nav className="bg-surface border-2 border-muted/10 divide-y divide-muted/10">
              <Link href="/dashboard/worker" className="flex items-center gap-4 px-6 py-4 font-bold text-sm bg-primary text-white">
                <Briefcase size={18} /> DASHBOARD
              </Link>
              <Link href="#" className="flex items-center gap-4 px-6 py-4 font-bold text-sm hover:bg-surface transition-colors">
                <User size={18} /> MY PROFILE
              </Link>
              <Link href="#" className="flex items-center gap-4 px-6 py-4 font-bold text-sm hover:bg-surface transition-colors">
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
                <p className="text-muted font-medium">Welcome back, {user.name?.split(' ')[0]}! Check your recent activity.</p>
              </div>
              
              {/* Availability Toggle */}
              <div className="bg-surface p-4 border-2 border-secondary flex items-center gap-6 shadow-[8px_8px_0px_0px_#F5C518]">
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
                <div key={i} className="bg-surface p-8 border-2 border-muted/10 space-y-4 hover:border-secondary transition-colors">
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
              </div>
              
              <div className="bg-surface border-2 border-secondary overflow-hidden divide-y divide-muted/10">
                {worker.applications?.length === 0 ? (
                   <div className="p-10 text-center text-muted">
                      No applications yet. Start browsing jobs to apply!
                   </div>
                ) : worker.applications?.map((app: any) => (
                  <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-surface transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-secondary text-white flex items-center justify-center font-display font-black uppercase">
                        {app.job?.title[0] || "?"}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{app.job?.title}</h4>
                        <p className="text-xs font-medium text-muted">{app.job?.hirer?.user?.name} • {new Date(app.createdAt).toLocaleDateString()}</p>
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
                      <Link href={`/jobs/${app.jobId}`} className="p-2 border-2 border-muted/10 hover:border-primary transition-colors">
                        <ArrowUpRight size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Banner */}
            {!worker.isVerified && (
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
            )}

          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
