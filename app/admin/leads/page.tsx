import React from "react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Leads Management</h1>
          <p className="mt-1 text-theme-secondary">Review and contact exporters who used your calculators.</p>
        </div>
        <Button>Export CSV</Button>
      </div>

      <BentoCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-subtle bg-fill uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold text-theme-muted">Name</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Company</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Service Interest</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Date</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              <tr className="transition-colors hover:bg-fill-hover">
                <td className="px-6 py-4 font-medium text-theme-primary">Rahul Sharma</td>
                <td className="px-6 py-4 text-theme-secondary">Sharma Exports Ltd.</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-none border border-gold bg-gold-muted px-2.5 py-1 text-xs font-semibold text-gold-500">
                    RoDTEP Claim
                  </span>
                </td>
                <td className="px-6 py-4 text-theme-secondary">Today, 10:45 AM</td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm">View Details</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BentoCard>
    </div>
  );
}
