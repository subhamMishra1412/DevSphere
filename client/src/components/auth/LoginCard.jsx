import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema } from "@/utils/validationSchemas";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

function LoginCard() {
  const navigate = useNavigate();
  const { login: saveToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      saveToken(response.token);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );

      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white p-10 shadow-2xl">

      {/* Heading */}

      <h1 className="text-5xl font-bold tracking-tight">
        Welcome Back
      </h1>

      <p className="mt-3 text-slate-500">
        Sign in to continue to DevSphere.
      </p>

      {/* Form */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-6"
      >

        {/* Email */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

        </div>

        {/* Password */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Password
          </label>

          <PasswordInput
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

        </div>

        {/* Forgot Password */}

        <div className="flex justify-end">

          <button
            type="button"
            className="text-sm font-medium text-violet-600 hover:text-violet-700"
          >
            Forgot Password?
          </button>

        </div>

        {/* Submit */}

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-violet-600 text-base hover:bg-violet-700"
        >
          Sign In
        </Button>

      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-slate-200" />

        <span className="px-4 text-sm text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-200" />

      </div>

      {/* Register */}

      <p className="text-center text-sm text-slate-500">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="font-semibold text-violet-600 hover:text-violet-700"
        >
          Create Account
        </Link>

      </p>

    </div>
  );
}

export default LoginCard;