"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Calendar, FileText, ArrowRight } from "lucide-react";
import { BentoCard } from "@/components/blocks/bento-card";

type Stats = {
  newLeads: number;
  totalLeads: number;
  upcomingMeetings: number;
  publishedPosts: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [leadsRes, slotsRes, blogsRes] = await Promise.all([
          fetch("/api/leads", { cache: "no-store" }),
          fetch("/api/slots", { cache: "no-store" }),
          fetch("/api/blogs?all=1", { cache: "no-store" }),
        ]);
        const leadsData = leadsRes.ok
          ? ((await leadsRes.json()) as { leads: { status: string; created_at: string }[] })
          : { leads: [] };
        const slotsData = slotsRes.ok
          ? ((await slotsRes.json()) as { bookings: { status: string; booking_date: string }[] })
          : { bookings: [] };
        const blogsData = blogsRes.ok
          ? ((await blogsRes.json()) as { posts: { status: string }[] })
          : { posts: [] };

        if (!active) return;

        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const newLeads = leadsData.leads.filter(
          (l) => new Date(l.created_at).getTime() >= thirtyDaysAgo,
        ).length;
        const today = new Date().toISOString().slice(0, 10);
        const upcomingMeetings = slotsData.bookings.filter(
          (b) => b.status !== "Cancelled" && b.booking_date >= today,
        ).length;
        const publishedPosts = blogsData.posts.filter((p) => p.status === "Published").length;

        setStats({
          newLeads,
          totalLeads: leadsData.leads.length,
          upcomingMeetings,
          publishedPosts,
        });
      } catch {
        if (active) setStats({ newLeads: 0, totalLeads: 0, upcomingMeetings: 0, publishedPosts: 0 });
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Overview</h1>
        <p className="mt-1 text-theme-secondary">Monitor your leads, bookings, and content performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/admin/leads" className="flex">
          <BentoCard className="flex h-full w-full flex-col transition-all hover:-translate-y-1 hover:border-gold">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-gold bg-gold-muted text-gold-500">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold leading-tight text-theme-primary">New Leads</h3>
                <p className="text-sm leading-tight text-theme-secondary">Last 30 days</p>
              </div>
            </div>
            <div className="mt-4 text-4xl font-black leading-none text-metric">
              {stats ? stats.newLeads : "—"}
            </div>
            <p className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-theme-faint">
              {stats ? `${stats.totalLeads} total` : "Loading…"}
              <ArrowRight className="h-3 w-3" />
            </p>
          </BentoCard>
        </Link>

        <Link href="/admin/meetings" className="flex">
          <BentoCard className="flex h-full w-full flex-col transition-all hover:-translate-y-1 hover:border-gold">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-gold bg-gold-muted text-gold-500">
                <Calendar className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold leading-tight text-theme-primary">Upcoming Meetings</h3>
                <p className="text-sm leading-tight text-theme-secondary">Confirmed &amp; not cancelled</p>
              </div>
            </div>
            <div className="mt-4 text-4xl font-black leading-none text-theme-primary">
              {stats ? stats.upcomingMeetings : "—"}
            </div>
            <p className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-theme-faint">
              Manage availability <ArrowRight className="h-3 w-3" />
            </p>
          </BentoCard>
        </Link>

        <Link href="/admin/blogs" className="flex">
          <BentoCard className="flex h-full w-full flex-col transition-all hover:-translate-y-1 hover:border-gold">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-gold bg-gold-muted text-gold-500">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold leading-tight text-theme-primary">Published Posts</h3>
                <p className="text-sm leading-tight text-theme-secondary">Live on /blogs</p>
              </div>
            </div>
            <div className="mt-4 text-4xl font-black leading-none text-success">
              {stats ? stats.publishedPosts : "—"}
            </div>
            <p className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-theme-faint">
              Write a new post <ArrowRight className="h-3 w-3" />
            </p>
          </BentoCard>
        </Link>
      </div>
    </div>
  );
}
