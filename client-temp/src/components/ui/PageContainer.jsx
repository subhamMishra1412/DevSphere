import { motion } from "framer-motion";

function PageContainer({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="mx-auto w-full max-w-7xl space-y-8 px-2"
    >
      {children}
    </motion.div>
  );
}

export default PageContainer;