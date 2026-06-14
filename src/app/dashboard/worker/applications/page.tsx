"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Briefcase, MapPin, IndianRupee, Clock, ShieldAlert, Phone } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function WorkerApplicationsPage() {
  const { data: session } = useSession();
  
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user) return;

    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/dashboard/worker");
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to load dashboard data.");
        }

        setApplications(data.worker?.applications || []);
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [session]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface mesh-gradient">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh] pt-40">
          <div className="w-16 h-16 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-32 md:pt-40 pb-20 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="space-y-12">
          {/* Back button */}
          <Link href="/dashboard/worker" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>

          {/* Page Header */}
          <div className="space-y-2">
            <div className="inline-block bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-dark border border-accent/30">
              Worker Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              MY APPLICATIONS
            </h1>
            <p className="text-xl text-muted font-medium">Track the status of your submitted job applications</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 border border-red-500/20 text-center font-bold">
              {error === "Worker profile not found" 
                ? "Please complete your worker onboarding profile to view applications." 
                : error}
            </div>
          )}

          {/* Applications List */}
          <div className="space-y-8">
            {applications.length === 0 ? (
              <div className="text-center py-20 bg-surface/50 border-2 border-secondary/10 rounded-3xl space-y-4">
                <ShieldAlert className="mx-auto text-muted" size={48} />
                <h4 className="text-2xl font-display font-black text-heading uppercase">No Applications Sent</h4>
                <p className="text-muted max-w-md mx-auto">You haven't applied for any jobs yet. Go to the jobs listings page to find work.</p>
                <Link href="/jobs" className="inline-block bg-primary text-white px-8 py-4 font-display font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all">
                  Browse Available Gigs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {applications.map((app: any, idx: number) => {
                  const job = app.job;
                  const hirer = job?.hirer;
                  const hirerUser = hirer?.user;
                  
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-surface/80 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-secondary/5 text-secondary px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full">
                            {job?.trade}
                          </span>
                          <span className="text-xs text-muted font-semibold flex items-center gap-1">
                            <Clock size={12} /> Applied {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-heading uppercase">
                          {job?.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-muted uppercase tracking-widest">
                          <span className="flex items-center gap-1"><MapPin size={12} className="text-primary" /> {job?.locality}, {job?.city}</span>
                          <span className="flex items-center gap-1"><IndianRupee size={12} className="text-primary" /> ₹{job?.budgetPerDay}/day</span>
                          {hirerUser?.name && <span>Hirer: {hirerUser.name}</span>}
                        </div>
                      </div>

                      {/* Status Badge & Actions */}
                      <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-secondary/5">
                        <div className={`px-5 py-2 text-xs font-display font-black uppercase tracking-widest rounded-full ${
                          app.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : app.status === "ACCEPTED"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-600"
                        }`}>
                          {app.status}
                        </div>

                        {app.status === "ACCEPTED" && hirerUser?.phone && (
                          <a 
                            href={`tel:${hirerUser.phone}`}
                            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 text-xs font-display font-black uppercase tracking-widest flex items-center gap-2 rounded-xl transition-colors shadow-glow"
                          >
                            <Phone size={14} /> Call Hirer: {hirerUser.phone}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
