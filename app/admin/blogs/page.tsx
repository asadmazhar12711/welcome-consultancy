import React from "react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

export default function BlogsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Blog CMS</h1>
          <p className="mt-1 text-theme-secondary">Write and manage your authoritative EXIM content.</p>
        </div>
        <Button>Write New Post</Button>
      </div>

      <BentoCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-subtle bg-fill uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold text-theme-muted">Title</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Status</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Published Date</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              <tr className="transition-colors hover:bg-fill-hover">
                <td className="px-6 py-4 font-medium text-theme-primary">New RoDTEP Guidelines 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full border border-gold bg-gold-muted px-2.5 py-1 text-xs font-semibold text-gold-500">
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 text-theme-secondary">Aug 01, 2026</td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm">Edit</Button>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-fill-hover">
                <td className="px-6 py-4 font-medium text-theme-primary">How to optimize EPCG tracking</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full border border-subtle bg-fill px-2.5 py-1 text-xs font-semibold text-theme-muted">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 text-theme-faint">—</td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm">Edit</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BentoCard>
    </div>
  );
}
