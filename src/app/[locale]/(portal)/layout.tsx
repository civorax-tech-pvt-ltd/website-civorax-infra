import type { Metadata } from "next";
import { LayoutDashboard, FolderOpen, FileText, Package, LogOut } from "lucide-react";
import LocaleLink from "@/shared/ui/LocaleLink";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/projects", icon: FolderOpen, label: "Projects" },
  { href: "/dashboard/invoices", icon: FileText, label: "Invoices" },
  { href: "/dashboard/materials", icon: Package, label: "Materials" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#f9fafb]">
      <aside className="w-60 shrink-0 bg-white border-r border-[#e8f5f0] flex flex-col">
        <div className="px-6 py-5 border-b border-[#e8f5f0]">
          <LocaleLink href="/" className="text-[#006c4e] font-bold text-base">
            CivoraX Infra
          </LocaleLink>
          <p className="text-[10px] text-[#9ca3af] mt-0.5 uppercase tracking-wide">Client Portal</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <LocaleLink
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#e6f7f2] hover:text-[#006c4e] transition-colors"
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </LocaleLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#e8f5f0]">
          <LocaleLink
            href="/auth/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6b7280] hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </LocaleLink>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
