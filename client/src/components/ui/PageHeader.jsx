import React from "react";
import { motion } from "framer-motion";

export function PageHeader({
  title,
  subtitle,
  children,
  action,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {(children || action) && (
        <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
          {children || action}
        </div>
      )}
    </motion.div>
  );
}

export default PageHeader;