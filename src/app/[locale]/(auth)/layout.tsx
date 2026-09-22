import type { Metadata } from "next";
import LocaleLink from "@/shared/ui/LocaleLink";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0faf5] via-white to-[#f0faf5] flex flex-col">
      <header className="px-6 py-5">
        <LocaleLink href="/" className="inline-flex items-center gap-2 text-[#006c4e] font-bold text-lg">
          CivoraX Infra
        </LocaleLink>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        {children}
      </main>
      <footer className="px-6 py-5 text-center text-xs text-[#9ca3af]">
        &copy; {new Date().getFullYear()} CivoraX Infra Pvt. Ltd.
      </footer>
    </div>
  );
}
