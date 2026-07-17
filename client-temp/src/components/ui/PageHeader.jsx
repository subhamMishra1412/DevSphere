import { motion } from "framer-motion";

function PageHeader({
  title,
  subtitle,
  children,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
    >
      <div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>

      </div>

      {children}

    </motion.div>
  );
}

export default PageHeader;