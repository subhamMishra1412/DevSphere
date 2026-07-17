import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // 1. Imported your AuthContext

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid work email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Grabbed your login function

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // 3. Call your actual backend/auth service via AuthContext
      if (login) {
        await login(data.email, data.password); // Or await login(data) depending on your context
      } else {
        // Fallback delay just in case login isn't async
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      
      toast.success("Welcome back to DevSphere!", {
        description: "Redirecting to your workspace...",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast.error("Authentication failed", {
        description: error?.message || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h2>
        <p className="text-sm text-zinc-400">
          Enter your credentials to access your workspace.
        </p>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => toast.info("Google OAuth connecting...")}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => toast.info("GitHub OAuth connecting...")}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-50"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <span className="w-full border-t border-white/10" />
        <span className="absolute bg-zinc-950 px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          or continue with
        </span>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300" htmlFor="email">
            Work Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            disabled={isLoading}
            placeholder="name@company.com"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-inner"
          />
          {errors.email && (
            <p className="text-[11px] font-medium text-rose-400 animate-in fade-in-50">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-300" htmlFor="password">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-3.5 pr-10 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 focus:outline-none"
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

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <input
            {...register("rememberMe")}
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 rounded border-white/10 bg-white/[0.05] text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 accent-indigo-500 cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-xs text-zinc-400 select-none cursor-pointer hover:text-zinc-300 transition-colors">
            Remember this device for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2 border border-white/10"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Footer Switcher */}
      <p className="text-center text-xs text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
        >
          Create a workspace
        </Link>
      </p>
    </div>
  );
}