"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, User, Hammer, Calendar, IndianRupee, FileText, CheckCircle2, Globe, Plus, X, GraduationCap, Briefcase } from "lucide-react";
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

  const [trade, setTrade] = useState("ELECTRICIAN");
  const [customTrade, setCustomTrade] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [dailyWage, setDailyWage] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [education, setEducation] = useState("");
  const [certification, setCertification] = useState("");
  const [availabilityHours, setAvailabilityHours] = useState("Full-time (40 hrs/week)");
  const [isAvailable, setIsAvailable] = useState(true);
  const [portfolio, setPortfolio] = useState<string[]>([]);

  // Input states for tags
  const [skillInput, setSkillInput] = useState("");
  const [langInput, setLangInput] = useState("");
  const [portfolioInput, setPortfolioInput] = useState("");

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
          setTrade(worker.trade || "ELECTRICIAN");
          setCustomTrade(worker.customTrade || "");
          setTitle(worker.title || "");
          setExperience(worker.experience?.toString() || "0");
          setDailyWage(worker.dailyWage?.toString() || "500");
          setBio(worker.bio || "");
          setLanguages(worker.languages || []);
          setSkills(worker.skills || []);
          setEducation(worker.education || "");
          setCertification(worker.certification || "");
          setAvailabilityHours(worker.availabilityHours || "Full-time (40 hrs/week)");
          setIsAvailable(worker.isAvailable !== undefined ? worker.isAvailable : true);
          setPortfolio(worker.portfolio || []);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim()) {
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddLang = (e: React.FormEvent) => {
    e.preventDefault();
    if (langInput.trim()) {
      if (!languages.includes(langInput.trim())) {
        setLanguages([...languages, langInput.trim()]);
      }
      setLangInput("");
    }
  };

  const handleRemoveLang = (langToRemove: string) => {
    setLanguages(languages.filter(l => l !== langToRemove));
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (portfolioInput.trim()) {
      if (!portfolio.includes(portfolioInput.trim())) {
        setPortfolio([...portfolio, portfolioInput.trim()]);
      }
      setPortfolioInput("");
    }
  };

  const handleRemovePortfolio = (itemToRemove: string) => {
    setPortfolio(portfolio.filter(p => p !== itemToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      setSaveLoading(true);
      setError("");
      setSuccess("");

      const userId = (session.user as any).id;

      const res = await fetch("/api/workers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          trade,
          customTrade: trade === "OTHER" ? customTrade : "",
          title,
          experience: parseInt(experience) || 0,
          dailyWage: parseInt(dailyWage) || 500,
          bio,
          languages,
          skills,
          education,
          certification,
          availabilityHours,
          isAvailable,
          portfolio,
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
            <p className="text-xl text-muted font-medium font-display uppercase tracking-tight">Fiverr & Upwork style professional settings</p>
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
            
            {/* Title / Tagline */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                <User size={16} className="text-primary" /> Professional Title / Tagline
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Expert Residential Electrician & AC Technician" 
                className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl"
              />
            </div>

            {/* Category / Custom Trade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <Hammer size={16} className="text-primary" /> Primary Trade Category
                </label>
                <select 
                  name="trade" 
                  value={trade} 
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl appearance-none"
                >
                  <option value="ELECTRICIAN">ELECTRICIAN</option>
                  <option value="PLUMBER">PLUMBER</option>
                  <option value="CARPENTER">CARPENTER</option>
                  <option value="PAINTER">PAINTER</option>
                  <option value="MASON">MASON</option>
                  <option value="WELDER">WELDER</option>
                  <option value="OTHER">OTHER (CUSTOM WORK)</option>
                </select>
              </div>

              {trade === "OTHER" && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                    <Plus size={16} className="text-primary" /> Specify Custom Trade / Service
                  </label>
                  <input 
                    type="text" 
                    value={customTrade}
                    onChange={(e) => setCustomTrade(e.target.value)}
                    required={trade === "OTHER"}
                    placeholder="e.g. CCTV Installer, Pest Control, Tile Fitter" 
                    className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl"
                  />
                </div>
              )}
            </div>

            {/* Experience, Wage and Availability */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <Calendar size={16} className="text-primary" /> Experience (Years)
                </label>
                <input 
                  type="number" 
                  value={experience} 
                  onChange={(e) => setExperience(e.target.value)}
                  required 
                  min="0"
                  max="50"
                  placeholder="e.g. 5" 
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <IndianRupee size={16} className="text-primary" /> Daily Wage Rate (₹)
                </label>
                <input 
                  type="number" 
                  value={dailyWage} 
                  onChange={(e) => setDailyWage(e.target.value)}
                  required 
                  min="100"
                  placeholder="e.g. 700" 
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <Briefcase size={16} className="text-primary" /> Availability Hours
                </label>
                <select 
                  value={availabilityHours}
                  onChange={(e) => setAvailabilityHours(e.target.value)}
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl appearance-none"
                >
                  <option value="Full-time (40 hrs/week)">Full-time (40 hrs/week)</option>
                  <option value="Part-time (20 hrs/week)">Part-time (20 hrs/week)</option>
                  <option value="Flexible / Hourly Gigs">Flexible / Hourly Gigs</option>
                  <option value="Weekends only">Weekends only</option>
                </select>
              </div>
            </div>

            {/* Active Status */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-secondary/10 rounded-xl hover:border-primary/40 transition-colors">
                <input 
                  type="checkbox" 
                  checked={isAvailable} 
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="w-6 h-6 rounded-md accent-primary" 
                />
                <span className="text-sm font-bold text-heading">Show Profile in Search Directory (Available Now)</span>
              </label>
            </div>

            {/* Bio / Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                <FileText size={16} className="text-primary" /> Professional Bio / Service Description
              </label>
              <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                required
                placeholder="Describe your expertise, standard working procedure, tool kits you own, and guarantee details..." 
                className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl resize-none"
              />
            </div>

            {/* Skills Tag Input */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                <Plus size={16} className="text-primary" /> Skills & Tools Tags (Upwork style)
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={skillInput} 
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g. Copper Piping, MCB Wiring, AutoCAD" 
                  className="flex-1 bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl"
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
                />
                <button 
                  type="button" 
                  onClick={handleAddSkill} 
                  className="bg-primary text-white px-6 font-display font-black rounded-xl"
                >
                  ADD
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.length === 0 ? (
                  <span className="text-xs text-muted italic">No skills listed yet. Add tags to stand out in searches.</span>
                ) : (
                  skills.map((skill) => (
                    <span key={skill} className="bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                      {skill}
                      <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500"><X size={12} /></button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Languages Tag Input */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                <Globe size={16} className="text-primary" /> Languages (e.g. English (Fluent), Hindi (Native))
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={langInput} 
                  onChange={(e) => setLangInput(e.target.value)}
                  placeholder="e.g. English (Conversational)" 
                  className="flex-1 bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl"
                  onKeyDown={(e) => e.key === "Enter" && handleAddLang(e)}
                />
                <button 
                  type="button" 
                  onClick={handleAddLang} 
                  className="bg-primary text-white px-6 font-display font-black rounded-xl"
                >
                  ADD
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {languages.length === 0 ? (
                  <span className="text-xs text-muted italic">No languages added.</span>
                ) : (
                  languages.map((lang) => (
                    <span key={lang} className="bg-secondary/5 text-heading border border-secondary/15 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                      {lang}
                      <button type="button" onClick={() => handleRemoveLang(lang)} className="hover:text-red-500"><X size={12} /></button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Education & Certification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <GraduationCap size={16} className="text-primary" /> Education (Upwork style)
                </label>
                <input 
                  type="text" 
                  value={education} 
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. ITI Electrician Trade Certificate" 
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> Certifications
                </label>
                <input 
                  type="text" 
                  value={certification} 
                  onChange={(e) => setCertification(e.target.value)}
                  placeholder="e.g. National Safety Council Electrical License" 
                  className="w-full bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl" 
                />
              </div>
            </div>

            {/* Portfolio Links */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-heading flex items-center gap-2">
                <Plus size={16} className="text-primary" /> Portfolio Project Image Links
              </label>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  value={portfolioInput} 
                  onChange={(e) => setPortfolioInput(e.target.value)}
                  placeholder="e.g. https://images.unsplash.com/photo-..." 
                  className="flex-1 bg-surface border-2 border-secondary/10 px-6 py-4 font-bold outline-none focus:border-primary rounded-xl"
                  onKeyDown={(e) => e.key === "Enter" && handleAddPortfolio(e)}
                />
                <button 
                  type="button" 
                  onClick={handleAddPortfolio} 
                  className="bg-primary text-white px-6 font-display font-black rounded-xl"
                >
                  ADD
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {portfolio.length === 0 ? (
                  <div className="col-span-full text-xs text-muted italic text-center py-4 border border-dashed border-secondary/20 rounded-xl">No portfolio projects added yet. Link image URLs to show off your quality of work!</div>
                ) : (
                  portfolio.map((img) => (
                    <div key={img} className="relative h-24 border border-secondary/20 rounded-xl overflow-hidden group">
                      <img src={img} alt="Portfolio Work" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => handleRemovePortfolio(img)} 
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
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
