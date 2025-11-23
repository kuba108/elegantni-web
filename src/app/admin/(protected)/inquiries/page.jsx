'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/contact-forms", {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Nepodařilo se načíst dotazy.");
      }
      setInquiries(data.inquiries || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const processed = inquiries.filter((item) => item.processed).length;
    const pending = total - processed;
    return { total, processed, pending };
  }, [inquiries]);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.4em] text-white/60">
            Dotazy
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-4 justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold">Zákaznické dotazy</h2>
            <p className="text-white/60 text-sm mt-2">
              Všechny poptávky z kontaktního formuláře na jednom místě.
            </p>
          </div>
          <Button
            onClick={loadInquiries}
            variant="ghost"
            className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white"
          >
            Obnovit
          </Button>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-2xl backdrop-blur-xl">
          {error}
        </div>
      )}

      <section className="grid md:grid-cols-3 gap-6">
        <StatCard
          label="Celkem"
          value={stats.total}
          sublabel="Všechny přijaté dotazy"
        />
        <StatCard
          label="Čeká na zpracování"
          value={stats.pending}
          sublabel="Důležité vyřídit jako první"
        />
        <StatCard
          label="Vyřízeno"
          value={stats.processed}
          sublabel="Uzavřené poptávky"
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-semibold">Seznam dotazů</h3>
          <p className="text-white/50 text-sm">
            {loading ? "Načítám…" : `${stats.pending} čeká na zpracování`}
          </p>
        </div>

        {loading ? (
          <p className="text-white/60">Načítám dotazy…</p>
        ) : inquiries.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function InquiryCard({ inquiry }) {
  const created = new Date(inquiry.created_at);
  const formattedDate = created.toLocaleString("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link href={`/admin/inquiries/${inquiry.id}`}>
      <Card className="border border-white/15 bg-white/5 backdrop-blur-2xl rounded-3xl hover:border-white/40 transition">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {inquiry.service_interest || "nezadáno"}
              </p>
              <h4 className="text-2xl text-white font-semibold">{inquiry.name}</h4>
            </div>
            <StatusBadge processed={inquiry.processed} />
          </div>
          <p className="text-white/70 text-sm line-clamp-2">{inquiry.message}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span>{inquiry.email}</span>
            {inquiry.phone && <span>{inquiry.phone}</span>}
            <span>{formattedDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function StatusBadge({ processed }) {
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${
        processed
          ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
          : "border-yellow-400/40 bg-yellow-500/15 text-yellow-100"
      }`}
    >
      {processed ? "Zpracováno" : "Čeká"}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-white/15 rounded-3xl p-10 text-center text-white/60 backdrop-blur-xl">
      <p className="text-lg">Zatím nepřišly žádné dotazy.</p>
      <p className="text-sm mt-2">Jakmile někdo vyplní formulář, objeví se zde.</p>
    </div>
  );
}
