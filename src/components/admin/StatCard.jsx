'use client';

import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ label, value, sublabel }) {
  return (
    <Card className="border border-white/15 bg-white/5 backdrop-blur-2xl shadow-[0_20px_120px_rgba(15,23,42,0.45)] rounded-3xl">
      <CardContent className="p-6 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {label}
        </p>
        <p className="text-4xl font-light text-white">{value}</p>
        <p className="text-xs text-white/50">{sublabel}</p>
      </CardContent>
    </Card>
  );
}
