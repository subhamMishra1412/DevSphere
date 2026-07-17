import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

// Strict Zod Validation Schema for Registration
const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must contain at least 2 characters"),
  email: z.string().min(1, "Work email is required").email("Please enter a valid professional email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      
      toast.success("Workspace initialized!", {
        description: `Welcome to DevSphere Pro, ${data.fullName}. Redirecting to dashboard...`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed", {
        description: error?.message || "An error occurred while provisioning your engineering workspace.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider) => {
    toast.info(`Redirecting to ${provider} SSO...`, {
      description: "Enterprise identity verification initialized.",
    });
  };

  return (
    <div className="w-full space-y-6 select-none">
      {/* Header */}
      <div className="space-y-1.5 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-mono font-semibold text-indigo-300 mb-2">
          <Sparkles className="h-3 w-3" />
          <span>DevSphere Pro v2.4</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Create an engineering workspace
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Provision sprint tracking, velocity analytics, and team pipelines in seconds.
        </p>
      </div>

      {/* Main Glass Form Container */}
      <div className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none">
        {/* Ambient Radial Lighting */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Social SSO Triggers */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialAuth("GitHub")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
          >
            {/* Native GitHub SVG Icon */}
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialAuth("Google Workspace")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.3 8.9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
              <path fill="#FBBC05" d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.5.4-2.3L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.2L1.6 16C3.5 19.8 7.4 23 12 23z"/>
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative bg-zinc-950 px-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Or continue with email
          </span>
        </div>

        {/* Main Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block" htmlFor="fullName">
              Full Name
            </label>
            <input
              {...register("fullName")}
              id="fullName"
              type="text"
              disabled={isLoading}
              placeholder="Lead Engineer"
              aria-invalid={!!errors.fullName}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-inner"
            />
            {errors.fullName && (
              <p className="text-[11px] font-medium text-rose-400 animate-in fade-in-50">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block" htmlFor="email">
              Work Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              disabled={isLoading}
              placeholder="name@company.com"
              aria-invalid={!!errors.email}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-inner"
            />
            {errors.email && (
              <p className="text-[11px] font-medium text-rose-400 animate-in fade-in-50">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={isLoading}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/80 pl-3.5 pr-10 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] font-medium text-rose-400 animate-in fade-in-50">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="••••••••"
                aria-invalid={!!errors.confirmPassword}
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-inner"
              />
              {errors.confirmPassword && (
                <p className="text-[11px] font-medium text-rose-400 animate-in fade-in-50">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2 border border-white/10"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Provisioning workspace...</span>
              </>
            ) : (
              <>
                <span>Initialize Workspace</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Switcher */}
      <p className="text-center text-xs text-zinc-500">
        Already have an active workspace account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}