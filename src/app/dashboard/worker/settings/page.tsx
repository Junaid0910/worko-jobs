"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, User, MapPin, ShieldAlert, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function WorkerSettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user) return;
    
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/dashboard/worker");
        const data = await res.json();
        if (res.ok) {
          setName(session.user.name || "");
          setEmail(session.user.email || "");
          setCity(data.user?.city || "");
        }
      } catch (err) {
        console.error("Failed to load user settings", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaveLoading(true);
      setMessage("");
      setError("");

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "WORKER",
          name,
          city,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update settings.");

      setMessage("Account settings updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save settings.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm("WARNING: Are you absolutely sure you want to permanently delete your account? This action is irreversible and all your profile data, applications, and reviews will be deleted.");
    if (!confirmDelete) return;

    try {
      setSaveLoading(true);
      setError("");
      setMessage("");
      
      const res = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete account.");
      }

      // Successfully deleted. Sign out to clean up session
      signOut({ callbackUrl: "/" });
    } catch (err: any) {
      setError(err.message || "Failed to delete account.");
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
              Account Settings
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              SETTINGS
            </h1>
            <p className="text-xl text-muted font-medium">Manage your personal account profile and preferences</p>
          </div>

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-700 p-4 rounded-xl text-center font-bold">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="bg-white/80 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm h-fit space-y-4">
              <div className="px-4 py-3 text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <User size={16} className="text-primary" /> Settings Menu
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted hover:bg-secondary/5 transition-colors flex items-center gap-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>

            {/* Content Area */}
            <div className="md:col-span-2 space-y-8">
              {/* Account Info Card */}
              <form onSubmit={handleUpdate} className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-12 rounded-3xl shadow-premium space-y-6">
                <h3 className="text-2xl font-display font-black text-heading uppercase border-b border-muted/10 pb-4">Profile Information</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                    <User size={16} className="text-primary" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="John Doe" 
                    className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                    <MapPin size={16} className="text-primary" /> City / Location
                  </label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    required 
                    placeholder="Mumbai" 
                    className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                    Email Address (Read-only)
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    disabled
                    className="w-full bg-surface-dark/5 border-2 border-secondary/5 px-6 py-4 font-bold outline-none text-muted rounded-xl cursor-not-allowed" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={saveLoading}
                  className="w-full bg-secondary text-white py-5 mt-4 text-xs font-display font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50 rounded-xl shadow-glow"
                >
                  {saveLoading ? "SAVING..." : "SAVE SETTINGS"}
                </button>
              </form>

              {/* Delete Account Card */}
              <div className="bg-white/80 backdrop-blur-md border-2 border-red-500/20 p-8 md:p-12 rounded-3xl shadow-premium space-y-6">
                <h3 className="text-2xl font-display font-black text-red-600 uppercase flex items-center gap-2">
                  <ShieldAlert size={24} /> Danger Zone: Delete Account
                </h3>
                <p className="text-sm text-muted leading-relaxed font-semibold">
                  Deleting your account will permanently remove all your profile data, trade details, applications, and reviews. This action cannot be undone.
                </p>
                <button 
                  onClick={handleDeleteAccount}
                  disabled={saveLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-5 text-xs font-display font-black uppercase tracking-widest transition-all rounded-xl shadow-glow disabled:opacity-50"
                >
                  {saveLoading ? "DELETING..." : "PERMANENTLY DELETE MY ACCOUNT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
