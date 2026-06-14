"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, UserCheck, Star, IndianRupee, MapPin, Check, X, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function JobApplicantsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: jobId } = use(params);
  const { data: session } = useSession();
  const router = useRouter();
  
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/jobs/${jobId}`);
        if (!res.ok) throw new Error("Failed to load job details.");
        const data = await res.json();
        setJob(data);
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, session]);

  const handleStatusUpdate = async (applicationId: string, newStatus: "ACCEPTED" | "REJECTED") => {
    try {
      setActionLoading(applicationId);
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status: newStatus }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update application.");
      }

      // Update state locally
      setJob((prev: any) => ({
        ...prev,
        applications: prev.applications.map((app: any) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        ),
      }));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

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

  if (error || !job) {
    return (
      <main className="min-h-screen bg-surface mesh-gradient">
        <Navbar />
        <div className="pt-40 pb-20 max-w-3xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl font-display font-black text-heading uppercase">Error Loading Job</h1>
          <p className="text-muted">{error || "Job not found or unauthorized access."}</p>
          <Link href="/dashboard/hirer" className="inline-block bg-primary text-white px-8 py-4 font-display font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all">
            Back to Dashboard
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-32 md:pt-40 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-12">
          {/* Back button */}
          <Link href="/dashboard/hirer" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Listings
          </Link>

          {/* Job Info Header */}
          <div className="glass p-8 md:p-12 rounded-3xl border-white/60 shadow-premium space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="bg-secondary text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full inline-block">
                  {job.trade}
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-heading uppercase">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-muted uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> {job.locality}, {job.city}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><IndianRupee size={14} className="text-primary" /> Budget: ₹{job.budgetPerDay}/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Applicants Grid */}
          <div className="space-y-8">
            <h3 className="text-3xl font-display font-black tracking-tighter uppercase border-l-8 border-secondary pl-6 text-heading">
              APPLICANTS ({job.applications?.length || 0})
            </h3>

            {(!job.applications || job.applications.length === 0) ? (
              <div className="text-center py-20 bg-surface/50 border-2 border-secondary/10 rounded-3xl">
                <h4 className="text-2xl font-display font-black text-heading uppercase">No Applicants Yet</h4>
                <p className="text-muted mt-2">As soon as workers apply, their profiles will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {job.applications.map((app: any) => {
                  const worker = app.worker;
                  const workerUser = worker?.user;
                  return (
                    <motion.div
                      key={app.id}
                      whileHover={{ y: -4 }}
                      className="bg-surface/85 backdrop-blur-md border border-white/60 p-8 md:p-10 rounded-3xl shadow-premium flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center"
                    >
                      {/* Left side: Profile */}
                      <div className="flex gap-6 items-start">
                        <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-2xl text-2xl font-display font-black uppercase">
                          {workerUser?.name?.[0] || "?"}
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-2xl font-display font-black text-heading uppercase">{workerUser?.name || "Anonymous Worker"}</h4>
                            {worker?.isVerified && (
                              <span className="flex items-center gap-1 text-[9px] font-black text-green-600 bg-green-500/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                                <ShieldCheck size={12} /> Verified
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-muted font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Star size={14} className="text-accent fill-accent" /> {worker?.rating || "No reviews"} ({worker?.totalReviews || 0} reviews)</span>
                            <span>Exp: {worker?.experience || 0} Years</span>
                            <span>Daily Wage: ₹{worker?.dailyWage || 500}</span>
                          </div>
                          {worker?.bio && <p className="text-sm text-muted font-medium max-w-xl">{worker.bio}</p>}
                        </div>
                      </div>

                      {/* Right side: Actions/Status */}
                      <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 lg:border-l lg:border-secondary/10 lg:pl-8">
                        {app.status === "PENDING" ? (
                          <>
                            <button
                              disabled={actionLoading !== null}
                              onClick={() => handleStatusUpdate(app.id, "ACCEPTED")}
                              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xs font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl transition-colors disabled:opacity-50"
                            >
                              <Check size={16} /> Accept Request
                            </button>
                            <button
                              disabled={actionLoading !== null}
                              onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl transition-colors disabled:opacity-50"
                            >
                              <X size={16} /> Reject
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center sm:items-end gap-2 w-full lg:w-auto">
                            <div className={`px-5 py-2 text-xs font-display font-black uppercase tracking-widest rounded-full ${
                              app.status === "ACCEPTED" 
                                ? "bg-green-500/15 text-green-700" 
                                : "bg-red-500/15 text-red-700"
                            }`}>
                              {app.status}
                            </div>
                            {app.status === "ACCEPTED" && workerUser?.phone && (
                              <a 
                                href={`tel:${workerUser.phone}`} 
                                className="flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-widest hover:underline mt-2"
                              >
                                <Phone size={14} /> Call: {workerUser.phone}
                              </a>
                            )}
                          </div>
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
