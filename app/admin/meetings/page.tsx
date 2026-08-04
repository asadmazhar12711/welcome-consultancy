import React from "react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

export default function MeetingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Meeting Schedule</h1>
          <p className="mt-1 text-theme-secondary">Manage your availability slots and upcoming consultations.</p>
        </div>
        <Button>Add Availability Slot</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <BentoCard>
          <h3 className="mb-4 text-lg font-semibold text-theme-primary">Upcoming Consultations</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-subtle bg-fill p-4 transition-colors hover:border-elevated hover:bg-fill-hover">
              <div>
                <p className="font-medium text-theme-primary">Advisory on EPCG</p>
                <p className="text-sm text-theme-secondary">with Ramesh Singh</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-theme-primary">Aug 15, 2026</p>
                <p className="text-sm text-gold-500">11:00 AM</p>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard>
          <h3 className="mb-4 text-lg font-semibold text-theme-primary">Available Slots Config</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-subtle bg-fill p-4 transition-colors hover:border-elevated hover:bg-fill-hover">
              <div>
                <p className="font-medium text-theme-primary">Standard Slot</p>
                <p className="text-sm text-theme-secondary">Mon - Fri, 10am to 5pm</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
