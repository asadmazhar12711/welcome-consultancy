import React from "react";
import { BentoCard } from "@/components/blocks/bento-card";
import { Users, Calendar, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Overview</h1>
        <p className="mt-1 text-theme-secondary">Monitor your leads, bookings, and content performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <BentoCard>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-none border border-gold bg-gold-muted text-gold-500">
              <Users className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-theme-primary">New Leads</h3>
              <p className="text-sm text-theme-secondary">Last 30 days</p>
            </div>
          </div>
          <div className="text-4xl font-black text-metric">142</div>
        </BentoCard>

        <BentoCard>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-none border border-gold bg-gold-muted text-gold-500">
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-theme-primary">Upcoming Meetings</h3>
              <p className="text-sm text-theme-secondary">Next 7 days</p>
            </div>
          </div>
          <div className="text-4xl font-black text-theme-primary">12</div>
        </BentoCard>

        <BentoCard>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-none border border-gold bg-gold-muted text-gold-500">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-theme-primary">Blog Views</h3>
              <p className="text-sm text-theme-secondary">Last 30 days</p>
            </div>
          </div>
          <div className="text-4xl font-black text-success">14.2k</div>
        </BentoCard>
      </div>
    </div>
  );
}
