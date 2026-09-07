"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  FileText,
  Settings,
  LayoutDashboard,
  MessageSquareText,
  LogOut,
  Loader2,
  Search,
  ArrowLeftRight,
  Layers,
  Briefcase,
  Image as ImageIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/meetings", label: "Meeting Slots", icon: Calendar },
  { href: "/admin/pages", label: "Pages CMS", icon: Layers },
  { href: "/admin/services", label: "Services CMS", icon: Briefcase },
  { href: "/admin/blogs", label: "Blog CMS", icon: FileText },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/popups", label: "Popups", icon: MessageSquareText },
  { href: "/admin/redirects", label: "Redirects", icon: ArrowLeftRight },
  { href: "/admin/seo", label: "SEO & Analytics", icon: Search },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/admin/login";
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/auth", { cache: "no-store" })
      .then((res) =>
        res.ok ? (res.json() as Promise<{ authenticated?: boolean }>) : { authenticated: false },
      )
      .then((data) => {
        if (!active) return;
        if (!data.authenticated && !isLoginRoute) {
          router.replace("/admin/login");
          return;
        }
        if (data.authenticated && isLoginRoute) {
          router.replace("/admin");
          return;
        }
        setChecking(false);
      })
      .catch(() => {
        if (active && !isLoginRoute) router.replace("/admin/login");
        else setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [isLoginRoute, pathname, router]);

  async function onLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-page">
      <aside className="flex w-64 shrink-0 flex-col border-r border-subtle bg-surface shadow-theme-sm">
        <div className="flex h-16 items-center border-b border-subtle px-6">
          <span className="font-bold tracking-tight text-theme-primary">Admin Console</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-10 items-center gap-3 rounded-none px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                  active
                    ? "border border-gold bg-gold-muted text-gold-500 shadow-gold"
                    : "border border-transparent text-theme-secondary hover:bg-fill-hover hover:text-theme-primary"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-subtle p-4">
          <Link
            href="/"
            className="flex h-10 items-center gap-3 rounded-none border border-transparent px-3 text-sm font-medium text-theme-secondary transition-colors hover:bg-fill-hover hover:text-theme-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <Settings className="h-4 w-4 shrink-0" aria-hidden="true" />
            Back to Site
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="flex h-10 w-full items-center gap-3 rounded-none border border-transparent px-3 text-left text-sm font-medium text-theme-secondary transition-colors hover:bg-fill-hover hover:text-theme-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-end gap-4 border-b border-subtle bg-elevated px-4 shadow-theme-sm sm:px-6 lg:px-8">
          <ThemeToggle />
          <span className="text-sm font-medium text-theme-secondary">Super Admin</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-none border border-gold bg-gold-muted text-sm font-bold text-gold-500">
            A
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-page p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
