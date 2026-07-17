import React from "react";
import { motion } from "framer-motion";

export function PageContainer({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="mx-auto w-full max-w-7xl space-y-6 px-1 sm:px-4"
    >
      {children}
    </motion.div>
  );
}

export default PageContainer;