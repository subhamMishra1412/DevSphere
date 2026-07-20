import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  User, 
  KeyRound, 
  LogOut, 
  Loader2, 
  Save, 
  ShieldAlert, 
  Sparkles, 
  Camera, 
  Lock, 
  Bell, 
  Palette, 
  CheckCircle2,
  FolderKanban,
  Users,
  HardDrive
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { updateProfile, changePassword } from "@/services/authService";
import { profileSchema, changePasswordSchema } from "@/utils/validationSchemas";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50";

export default function SettingPage() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // State to toggle the interactive password change form
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    values: { name: user?.name || "", email: user?.email || "" },
  });

  const passwordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  async function onProfileSubmit(data) {
    try {
      const updated = await updateProfile(data);
      updateUser(updated);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  }

  async function onPasswordSubmit(data) {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully.");
      passwordForm.reset();
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : "SM";
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" })
    : "Active Workspace";

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl pb-16 select-none">
        <PageHeader
          title="Workspace Settings"
          subtitle="Manage personal engineering identity, security credentials, and workspace preferences."
        />

        <div className="mt-8 grid gap-8 xl:grid-cols-3">
          
          {/* LEFT COLUMN: IDENTITY & QUICK ACTIONS */}
          <div className="space-y-6">
            
            {/* PROFILE CARD */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 shadow-2xl backdrop-blur-xl">
              <div className="h-28 bg-gradient-to-r from-violet-700 via-indigo-600 to-blue-600 relative">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
              </div>

              <div className="-mt-14 px-6 pb-6 sm:px-8 sm:pb-8">
                <div className="relative inline-block">
                  <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl border-4 border-zinc-950 bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl sm:text-4xl font-black text-white shadow-xl">
                    {initials}
                  </div>
                  <button 
                    onClick={() => toast.info("Avatar upload coming in v2.5")}
                    className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-xl border border-white/10 bg-zinc-900/90 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-zinc-800 hover:border-white/20"
                  >
                    <Camera className="h-3 w-3 text-indigo-400" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
                      {user?.name || "Subham Mishra"}
                    </h2>
                    <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-400">
                      PRO
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-0.5 truncate">
                    {user?.email || "engineer@devsphere.io"}
                  </p>
                </div>

                {/* Mini Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
                      Projects
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-white">
                      24
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
                      Workspace Role
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-indigo-400">
                      Owner
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                Quick Actions
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all ${
                    showPasswordForm 
                      ? "border-indigo-500/50 bg-indigo-500/10 text-white" 
                      : "border-white/5 bg-white/[0.02] text-zinc-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <KeyRound className="h-4 w-4 text-indigo-400" />
                    <span>Change Account Password</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{showPasswordForm ? "Close" : "Open"}</span>
                </button>

                <button
                  onClick={() => toast.info("Theme customization is currently locked to Obsidian Dark.")}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-xs font-semibold text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                >
                  <Palette className="h-4 w-4 text-purple-400" />
                  <span>Appearance & Themes</span>
                </button>

                <button
                  onClick={() => toast.info("Email digest alerts are enabled for Sprint Cycle 4.")}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-xs font-semibold text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                >
                  <Bell className="h-4 w-4 text-emerald-400" />
                  <span>Notification Preferences</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORMS & CONFIGURATIONS */}
          <div className="space-y-6 xl:col-span-2">

            {/* 1. PERSONAL INFORMATION FORM */}
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Personal Information
                  </h2>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    Update your professional identity and workspace contact details.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={profileForm.formState.isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-600 hover:to-purple-700 active:scale-95 disabled:opacity-50 border border-white/10 shrink-0"
                >
                  {profileForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Full Name
                  </label>
                  <input
                    className={fieldClass}
                    placeholder="e.g. Subham Mishra"
                    {...profileForm.register("name")}
                  />
                  {profileForm.formState.errors.name && (
                    <p className="mt-1.5 text-[11px] font-medium text-rose-400 animate-in fade-in-50">
                      {profileForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Email Address
                  </label>
                  <input
                    className={fieldClass}
                    placeholder="name@devsphere.io"
                    {...profileForm.register("email")}
                  />
                  {profileForm.formState.errors.email && (
                    <p className="mt-1.5 text-[11px] font-medium text-rose-400 animate-in fade-in-50">
                      {profileForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </form>

            {/* 2. INTERACTIVE PASSWORD CHANGE FORM (Toggled via Quick Actions or Button) */}
            {showPasswordForm && (
              <form 
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} 
                className="rounded-3xl border border-indigo-500/30 bg-indigo-950/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Lock className="h-5 w-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Update Security Credentials</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="text-xs font-mono text-zinc-400 hover:text-white transition"
                  >
                    [Cancel]
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className={fieldClass}
                      placeholder="••••••••"
                      {...passwordForm.register("currentPassword")}
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="mt-1.5 text-[11px] font-medium text-rose-400">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
                        New Password
                      </label>
                      <input
                        type="password"
                        className={fieldClass}
                        placeholder="••••••••"
                        {...passwordForm.register("newPassword")}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="mt-1.5 text-[11px] font-medium text-rose-400">
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className={fieldClass}
                        placeholder="••••••••"
                        {...passwordForm.register("confirmNewPassword")}
                      />
                      {passwordForm.formState.errors.confirmNewPassword && (
                        <p className="mt-1.5 text-[11px] font-medium text-rose-400">
                          {passwordForm.formState.errors.confirmNewPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={passwordForm.formState.isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 active:scale-95 disabled:opacity-50 transition"
                  >
                    {passwordForm.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            )}

            {/* 3. WORKSPACE METRICS */}
            <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/10 pb-4 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Workspace Allocation
                </h2>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Real-time resource utilization across your active DevSphere instance.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <FolderKanban className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-semibold">Active Sprints</span>
                  </div>
                  <p className="font-mono text-2xl font-black text-white">24</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-1">Nominal Velocity</p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-semibold">Team Members</span>
                  </div>
                  <p className="font-mono text-2xl font-black text-white">1</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">Pro Plan Limit: 5</p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <HardDrive className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-semibold">Cloud Storage</span>
                  </div>
                  <p className="font-mono text-2xl font-black text-white">2.4 MB</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">0.1% of 5 GB</p>
                </div>
              </div>
            </div>

            {/* 4. SECURITY & SESSION TERMINATION */}
            <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Security & Active Sessions
                  </h2>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    Monitor device authentication and manage account credentials.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 shrink-0"
                >
                  {showPasswordForm ? "Close Password Form" : "Change Password"}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">Two-Factor Authentication (2FA)</h4>
                      <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 text-[9px] font-mono font-bold text-amber-300">
                        SOON
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Add hardware key or authenticator app protection to your workspace.
                    </p>
                  </div>
                  <button disabled className="text-xs font-semibold text-zinc-600 cursor-not-allowed">
                    Configure
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-4">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0" />
                      <span>Terminate Workspace Session</span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Revoke all active JWT tokens on this device and return to the login portal.
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="shrink-0 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-2 text-xs font-bold text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-100 active:scale-95"
                  >
                    Sign Out Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageContainer>
  );
}