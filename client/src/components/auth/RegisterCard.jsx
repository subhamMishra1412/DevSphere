import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";

import { registerSchema } from "@/utils/validationSchemas";
import { register as registerUser } from "@/services/authService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

const fieldClass =
  "border-white/10 bg-zinc-950/80 text-white placeholder:text-zinc-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500 h-11 rounded-xl";

function RegisterCard() {
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created!", {
        description: "Sign in with your new credentials to continue.",
      });
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/60 p-8 shadow-2xl backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15">
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative space-y-1.5 text-center sm:text-left">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-mono font-semibold text-indigo-300">
          <Sparkles className="h-3 w-3" />
          <span>DevSphere Pro v2.4</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Create your account
        </h1>
        <p className="text-sm text-zinc-400">
          Start tracking sprints and shipping faster.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-8 space-y-5"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300"
          >
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Ada Lovelace"
            disabled={isSubmitting}
            className={fieldClass}
            {...registerField("name")}
          />
          {errors.name && (
            <p className="text-[11px] font-medium text-rose-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={isSubmitting}
            className={fieldClass}
            {...registerField("email")}
          />
          {errors.email && (
            <p className="text-[11px] font-medium text-rose-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-300"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              disabled={isSubmitting}
              className={fieldClass}
              error={errors.password?.message}
              {...registerField("password")}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-300"
            >
              Confirm
            </label>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              disabled={isSubmitting}
              className={fieldClass}
              error={errors.confirmPassword?.message}
              {...registerField("confirmPassword")}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="group mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <p className="relative mt-6 text-center text-xs text-zinc-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default RegisterCard;