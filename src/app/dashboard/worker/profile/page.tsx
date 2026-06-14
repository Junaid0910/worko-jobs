"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, User, Hammer, Calendar, IndianRupee, FileText, CheckCircle2, Globe } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WorkerProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    trade: "ELECTRICIAN",
    experience: "",
    dailyWage: "",
    bio: "",
    languages: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (!session?.user) return;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/dashboard/worker");
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to load profile details.");
        }

        const worker = data.worker;
        if (worker) {
          setFormData({
            trade: worker.trade || "ELECTRICIAN",
            experience: worker.experience?.toString() || "0",
            dailyWage: worker.dailyWage?.toString() || "500",
            bio: worker.bio || "",
            languages: worker.languages?.join(", ") || "English, Hindi",
            isAvailable: worker.isAvailable !== undefined ? worker.isAvailable : true,
          });
        }
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      setSaveLoading(true);
      setError("");
      setSuccess("");

      const userId = (session.user as any).id;
      const parsedLanguages = formData.languages
        .split(",")
        .map(l => l.trim())
        .filter(l => l.length > 0);

      const res = await fetch("/api/workers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          trade: formData.trade,
          experience: formData.experience,
          dailyWage: formData.dailyWage,
          bio: formData.bio,
          languages: parsedLanguages,
          isAvailable: formData.isAvailable,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save profile.");
      }

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save profile.");
    } finally {
      setSaveLoading(false);
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
              Worker Profile
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              EDIT PROFILE
            </h1>
            <p className="text-xl text-muted font-medium">Keep your trade details, bio, and rates up to date</p>
          </div>

          {success && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 border border-green-500/20 text-green-700 p-4 rounded-xl text-center font-bold">
              {success}
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center font-bold">
              {error}
            </motion.div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSave} className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-14 rounded-3xl shadow-premium space-y-8">
            {/* Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <Hammer size={16} className="text-primary" /> Category / Trade
                </label>
                <select 
                  name="trade" 
                  value={formData.trade} 
                  onChange={handleChange}
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl appearance-none"
                >
                  <option value="ELECTRICIAN">ELECTRICIAN</option>
                  <option value="PLUMBER">PLUMBER</option>
                  <option value="CARPENTER">CARPENTER</option>
                  <option value="PAINTER">PAINTER</option>
                  <option value="MASON">MASON</option>
                  <option value="WELDER">WELDER</option>
                </select>
              </div>

              {/* Availability */}
              <div className="space-y-2 flex flex-col justify-end">
                <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-secondary/10 rounded-xl hover:border-primary/40 transition-colors">
                  <input 
                    type="checkbox" 
                    name="isAvailable"
                    checked={formData.isAvailable} 
                    onChange={handleChange}
                    className="w-6 h-6 rounded-md accent-primary" 
                  />
                  <span className="text-sm font-bold text-heading">Available to Work Immediately</span>
                </label>
              </div>
            </div>

            {/* Experience and Wage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <Calendar size={16} className="text-primary" /> Experience (Years)
                </label>
                <input 
                  type="number" 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange}
                  required 
                  min="0"
                  max="50"
                  placeholder="e.g. 5" 
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <IndianRupee size={16} className="text-primary" /> Daily Wage (₹)
                </label>
                <input 
                  type="number" 
                  name="dailyWage" 
                  value={formData.dailyWage} 
                  onChange={handleChange}
                  required 
                  min="100"
                  placeholder="e.g. 700" 
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                />
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                <Globe size={16} className="text-primary" /> Languages Spoken (Comma separated)
              </label>
              <input 
                type="text" 
                name="languages" 
                value={formData.languages} 
                onChange={handleChange}
                placeholder="e.g. English, Spanish" 
                className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                <FileText size={16} className="text-primary" /> Professional Bio / Description
              </label>
              <textarea 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange}
                rows={5}
                placeholder="Describe your expertise, typical jobs you do, and service standards..." 
                className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={saveLoading}
              className="w-full bg-secondary text-white py-5 mt-4 text-xs font-display font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50 rounded-xl shadow-glow"
            >
              {saveLoading ? "SAVING..." : "SAVE PROFILE DETAILS"}
              <CheckCircle2 size={16} />
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
