import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

function LoginForm() {
  return (
    <form className="mt-8 space-y-6">

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Email
        </label>

        <Input
          type="email"
          placeholder="you@example.com"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Password
        </label>

        <PasswordInput />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-sm">

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            className="rounded"
          />

          Remember me

        </label>

        <button
          type="button"
          className="font-medium text-indigo-600 hover:underline"
        >
          Forgot password?
        </button>

      </div>

      {/* Login Button */}

      <Button
        className="h-11 w-full text-base"
      >
        Sign In
      </Button>

      {/* Register */}

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <span className="cursor-pointer font-semibold text-indigo-600 hover:underline">
          Register
        </span>
      </p>

    </form>
  );
}

export default LoginForm;