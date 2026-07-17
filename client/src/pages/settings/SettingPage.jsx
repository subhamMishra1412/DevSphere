import React, { useState } from "react";
import { 
  User, 
  Shield, 
  Key, 
  Sliders, 
  Save, 
  Copy, 
  Check, 
  AlertTriangle, 
  RefreshCw,
  Sparkles,
  ArrowLeft,
  LogOut,
  Laptop,
  Smartphone,
  BadgeCheck,
  Camera,
  Layers
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PageContainer from "@/components/ui/PageContainer";

export default function SettingPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: user?.email ? user.email.split("@")[0] : "Subham Mishra",
    email: user?.email || "engineer@devsphere.io",
    role: "Lead Software Engineer",
    bio: "Full-stack developer focused on distributed systems, React architectures, and high-velocity sprint execution.",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyDigest: false,
    autoSaveSprints: true,
    highContrastMode: false,
  });

  const [apiKey, setApiKey] = useState("ds_live_9928347102938471029384");

  function handleProfileChange(e) {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile preferences updated successfully");
    }, 800);
  }

  function copyApiKey() {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("API Key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  function regenerateKey() {
    const newKey = "ds_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast.info("Generated new production API key");
  }

  function handleLogout() {
    logout();
    toast.info("Logged out of DevSphere workspace");
    navigate("/login");
  }

  const tabs = [
    { id: "profile", label: "General Profile", icon: User },
    { id: "preferences", label: "Workspace & UI", icon: Sliders },
    { id: "security", label: "API & Security", icon: Shield },
  ];

  return (
    <PageContainer>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Workspace Settings
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Manage personal engineer identity, API authentication tokens, and UI theme overrides.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4 pt-2">
          {/* Left Navigation Sidebar Pills */}
          <div className="space-y-1.5 lg:col-span-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-200 ${
                  activeTab === id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-white/10"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${activeTab === id ? "text-white" : "text-zinc-500"}`} />
                  <span>{label}</span>
                </div>
                {activeTab === id && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Visual Executive Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                  <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                    <div className="relative group shrink-0">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-2xl font-black text-white shadow-xl border border-white/20">
                        {profileForm.fullName.substring(0, 2).toUpperCase()}
                      </div>
                      <button 
                        onClick={() => toast.info("Avatar customizer coming soon")}
                        className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 transition shadow-lg"
                        title="Change Avatar"
                      >
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-center sm:text-left space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-xl font-bold text-white tracking-tight truncate">{profileForm.fullName}</h2>
                        <BadgeCheck className="h-4 w-4 text-indigo-400 shrink-0" title="Verified Workspace Engineer" />
                      </div>
                      <p className="text-xs text-zinc-400 font-mono">{profileForm.email}</p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-indigo-300">
                          <Sparkles className="h-2.5 w-2.5" /> Pro Plan
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-zinc-300">
                          <Layers className="h-2.5 w-2.5 text-purple-400" /> Lead Contributor
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Profile Form */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-bold text-white">Personal Information</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Update your engineer identity and workspace contact details</p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
                          Full Name
                        </label>
                        <input
                          name="fullName"
                          value={profileForm.fullName}
                          onChange={handleProfileChange}
                          className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
                          Work Email
                        </label>
                        <input
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
                        Engineering Role
                      </label>
                      <input
                        name="role"
                        value={profileForm.role}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
                        Bio / Specialties
                      </label>
                      <textarea
                        rows={3}
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner resize-y"
                      />
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 active:scale-95 disabled:opacity-50 border border-white/10"
                      >
                        {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                        <span>{loading ? "Saving..." : "Save Preferences"}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* DEDICATED SIGN OUT SECTION */}
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign Out of DevSphere
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                        You are currently signed in as <span className="text-zinc-200 font-mono font-semibold">{profileForm.email}</span>. Signing out will clear your active JWT session on this device.
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="shrink-0 rounded-xl border border-rose-500/30 bg-rose-500/10 px-6 py-3 text-xs font-bold text-rose-300 transition-all hover:border-rose-500/50 hover:bg-rose-500/20 hover:text-rose-100 active:scale-95 shadow-lg shadow-rose-500/5"
                    >
                      Sign Out Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-bold text-white">Workspace & UI Parameters</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Configure automated sprint tracking and visual theme overrides</p>
                  </div>

                  <div className="space-y-6 divide-y divide-white/5">
                    {/* Toggle 1 */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="space-y-0.5 pr-4">
                        <h4 className="text-xs font-bold text-zinc-200">Real-time Email Notifications</h4>
                        <p className="text-[11px] text-zinc-500">Receive alerts when team members update sprint progress</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          preferences.emailNotifications ? "bg-indigo-600" : "bg-zinc-800"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            preferences.emailNotifications ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 2 */}
                    <div className="flex items-center justify-between pt-6">
                      <div className="space-y-0.5 pr-4">
                        <h4 className="text-xs font-bold text-zinc-200">Auto-save Sprint Velocity</h4>
                        <p className="text-[11px] text-zinc-500">Automatically sync progress slider adjustments without manual confirmation</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreferences({ ...preferences, autoSaveSprints: !preferences.autoSaveSprints })}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          preferences.autoSaveSprints ? "bg-indigo-600" : "bg-zinc-800"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            preferences.autoSaveSprints ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 3 */}
                    <div className="flex items-center justify-between pt-6">
                      <div className="space-y-0.5 pr-4">
                        <h4 className="text-xs font-bold text-zinc-200">High Contrast Obsidian Mode</h4>
                        <p className="text-[11px] text-zinc-500">Increase border opacities and disable background radial blurs for lower GPU usage</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreferences({ ...preferences, highContrastMode: !preferences.highContrastMode })}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          preferences.highContrastMode ? "bg-indigo-600" : "bg-zinc-800"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            preferences.highContrastMode ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual Theme Selector Preview */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-bold text-white">Workspace Theme</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Select your preferred syntax highlighting and ambient lighting contrast</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="cursor-pointer rounded-xl border-2 border-indigo-500 bg-zinc-950 p-3.5 shadow-lg shadow-indigo-500/10 space-y-2.5">
                      <div className="h-12 rounded-lg bg-gradient-to-br from-zinc-900 to-indigo-950 border border-white/10 flex items-center justify-center">
                        <span className="h-2 w-8 rounded-full bg-indigo-500/50" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Obsidian Dark</span>
                        <Check className="h-4 w-4 text-indigo-400" />
                      </div>
                    </div>

                    <div onClick={() => toast.info("Midnight theme preview")} className="cursor-pointer rounded-xl border border-white/10 bg-zinc-950/60 p-3.5 hover:border-white/20 transition space-y-2.5 opacity-60">
                      <div className="h-12 rounded-lg bg-gradient-to-br from-blue-950 to-slate-900 border border-white/5 flex items-center justify-center">
                        <span className="h-2 w-8 rounded-full bg-blue-500/50" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-400 block">Midnight Blue</span>
                    </div>

                    <div onClick={() => toast.info("High contrast preview")} className="cursor-pointer rounded-xl border border-white/10 bg-zinc-950/60 p-3.5 hover:border-white/20 transition space-y-2.5 opacity-60">
                      <div className="h-12 rounded-lg bg-black border border-white/30 flex items-center justify-center">
                        <span className="h-2 w-8 rounded-full bg-white/50" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-400 block">Pure OLED</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY & API TAB */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* API Keys */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-bold text-white">Production API Key</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Use this Bearer token to authenticate external CI/CD pipelines with DevSphere</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950 p-3 shadow-inner">
                      <Key className="h-4 w-4 text-indigo-400 shrink-0 ml-1" />
                      <code className="flex-1 text-xs font-mono text-zinc-200 truncate">
                        {apiKey}
                      </code>
                      <button
                        onClick={copyApiKey}
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                      </button>
                      <button
                        onClick={regenerateKey}
                        className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition"
                        title="Regenerate Key"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-amber-400/90 flex items-center gap-1.5 font-medium">
                      <Sparkles className="h-3.5 w-3.5 shrink-0" /> Keep this token secret. Do not commit it to public GitHub repositories.
                    </p>
                  </div>
                </div>

                {/* Active Sessions Feed */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-bold text-white">Active Workspace Sessions</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Devices currently logged into this DevSphere account</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-3.5">
                        <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20">
                          <Laptop className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">MacBook Pro / Chrome</p>
                          <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Bengaluru, IN • Active Now</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-400">
                        Current Device
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] p-4 opacity-75">
                      <div className="flex items-center gap-3.5">
                        <div className="rounded-xl bg-white/5 p-2.5 text-zinc-400 border border-white/5">
                          <Smartphone className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-zinc-300">iPhone 16 / Mobile Safari</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Bengaluru, IN • 3 hours ago</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toast.success("Revoked mobile session")}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold hover:underline"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 sm:p-8 backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Revoke All Tokens
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                        Instantly invalidate all production API keys and terminate every remote session connected to this account.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        toast.error("Terminating all active sessions...");
                        setTimeout(logout, 1000);
                      }}
                      className="shrink-0 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-xs font-bold text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-200 active:scale-95 shadow-lg shadow-rose-500/5"
                    >
                      Revoke Everything
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}