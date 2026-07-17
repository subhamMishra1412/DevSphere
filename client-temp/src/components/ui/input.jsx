import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full rounded-xl border border-input bg-input/20 px-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };