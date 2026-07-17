import BrandPanel from "@/components/auth/BrandPanel";
import LoginCard from "@/components/auth/LoginCard";

function LoginPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <BrandPanel />

      <section className="flex items-center justify-center bg-slate-50 p-8">
        <LoginCard />
      </section>
    </main>
  );
}

export default LoginPage;