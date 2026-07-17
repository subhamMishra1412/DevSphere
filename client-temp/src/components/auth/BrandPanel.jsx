import {
  FolderKanban,
  ShieldCheck,
  Users,
} from "lucide-react";

function BrandPanel() {
  return (
    <section className="relative hidden overflow-hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-16 text-white">

      {/* Background Glow */}
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Logo */}
      <div className="relative z-10">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-lg">

            <FolderKanban className="h-7 w-7" />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              DevSphere
            </h1>

            <p className="text-white/70">
              Project Management Platform
            </p>

          </div>

        </div>

        <h2 className="max-w-xl text-5xl font-bold leading-tight">
          Build software.
          <br />
          Manage projects.
          <br />
          Ship faster.
        </h2>

        <p className="mt-8 max-w-lg text-lg leading-8 text-white/70">
          Organize your projects, collaborate with your team,
          track progress, and keep every task under control
          from one modern workspace.
        </p>

      </div>

      {/* Features */}
      <div className="relative z-10 space-y-6">

        <Feature
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Secure Authentication"
          text="JWT authentication with protected routes."
        />

        <Feature
          icon={<Users className="h-6 w-6" />}
          title="Team Collaboration"
          text="Work together across multiple projects."
        />

        <Feature
          icon={<FolderKanban className="h-6 w-6" />}
          title="Project Tracking"
          text="Monitor progress with a clean workflow."
        />

      </div>

    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">

      <div className="rounded-xl bg-white/10 p-3 backdrop-blur-lg">
        {icon}
      </div>

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-white/70">
          {text}
        </p>

      </div>

    </div>
  );
}

export default BrandPanel;