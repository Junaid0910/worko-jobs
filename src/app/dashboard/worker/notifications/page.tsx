"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Bell, Calendar, Briefcase, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function WorkerNotificationsPage() {
  const { data: session } = sessionData();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Custom helper because of double useSession destructuring in NextAuth types sometimes
  function sessionData() {
    return useSession();
  }

  useEffect(() => {
    if (!session?.user) return;

    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/dashboard/worker");
        const data = await res.json();
        
        const workerTrade = data.worker?.trade || "ELECTRICIAN";
        const workerCity = data.user?.city || "Mumbai";

        // Mock realistic notifications dynamically using user data
        const list = [
          {
            id: "1",
            title: "Identity Verification Status",
            desc: "Your identity verification request is under review. You will receive the Verified badge shortly.",
            type: "INFO",
            date: "Today",
            icon: Info,
            color: "text-blue-500 bg-blue-500/10",
          },
          {
            id: "2",
            title: `New gig matches your trade in ${workerCity}!`,
            desc: `A hirer posted a new job for an expert ${workerTrade.toLowerCase()} in ${workerCity} locality.`,
            type: "MATCH",
            date: "1 day ago",
            icon: Briefcase,
            color: "text-primary bg-primary/10",
          },
          {
            id: "3",
            title: "Welcome to Worko",
            desc: "Thank you for joining India's most advanced digital trade network. Complete your profile details and start bidding!",
            type: "WELCOME",
            date: "3 days ago",
            icon: CheckCircle2,
            color: "text-green-500 bg-green-500/10",
          }
        ];

        setNotifications(list);
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
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

      <div className="pt-32 md:pt-40 pb-20 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="space-y-12">
          {/* Back button */}
          <Link href="/dashboard/worker" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <div className="inline-block bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-dark border border-accent/30">
              Alerts & Updates
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              NOTIFICATIONS
            </h1>
            <p className="text-xl text-muted font-medium">Keep track of job match alerts, updates, and profile milestones</p>
          </div>

          {/* Notifications List */}
          <div className="space-y-6">
            {notifications.length === 0 ? (
              <div className="text-center py-20 bg-white/80 border border-white/60 rounded-3xl">
                <Bell className="mx-auto text-muted mb-4 animate-bounce" size={48} />
                <h4 className="text-2xl font-display font-black text-heading uppercase">No Notifications Yet</h4>
                <p className="text-muted mt-2">We will notify you here when you get new job matches or status updates.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {notifications.map((notif: any, idx: number) => {
                  const IconComponent = notif.icon;
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm flex gap-6 items-start hover:border-primary/20 transition-all"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
                        <IconComponent size={24} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h4 className="text-xl font-display font-black text-heading uppercase">{notif.title}</h4>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{notif.date}</span>
                        </div>
                        <p className="text-sm text-muted font-medium leading-relaxed">{notif.desc}</p>
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
