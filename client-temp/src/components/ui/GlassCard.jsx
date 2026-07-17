import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        rounded-3xl
        border
        border-slate-200/70
        bg-white/90
        backdrop-blur-xl
        shadow-sm
        hover:shadow-xl
        transition-all
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;