'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 20;

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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
      setPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, inquiries.length]);

  const filteredInquiries = useMemo(() => {
    if (!search) return inquiries;
    const query = search.toLowerCase();
    return inquiries.filter((item) => {
      return [item.name, item.email, item.phone, item.service_interest, item.message]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [inquiries, search]);

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const stats = useMemo(() => {
    const total = filteredInquiries.length;
    const processed = filteredInquiries.filter((item) => item.processed).length;
    const pending = total - processed;
    return { total, processed, pending };
  }, [filteredInquiries]);

  const handlePageChange = (direction) => {
    setPage((prev) => {
      const next = direction === "next" ? prev + 1 : prev - 1;
      return Math.min(Math.max(1, next), totalPages);
    });
  };

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

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-1 min-w-[220px] max-w-xl gap-3">
            <Input
              placeholder="Filtrovat podle jména, emailu nebo obsahu…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
            <span>
              Stránka {currentPage} / {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Předchozí
              </Button>
              <Button
                variant="ghost"
                className="rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Další
              </Button>
            </div>
          </div>
        </div>
        <div className="text-white/50 text-sm">
          {loading
            ? "Načítám dotazy…"
            : `${stats.pending} z ${stats.total} čeká na zpracování`}
        </div>

        {loading ? (
          <p className="text-white/60">Načítám dotazy…</p>
        ) : paginatedInquiries.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {paginatedInquiries.map((inquiry) => (
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
    <Link href={`/admin/inquiries/${inquiry.id}`} className="block">
      <Card className="border border-white/12 bg-white/5 backdrop-blur-2xl rounded-2xl hover:border-white/40 transition">
        <CardContent className="p-5 space-y-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                {inquiry.service_interest || "nezadáno"}
              </p>
              <h4 className="text-xl text-white font-semibold">{inquiry.name}</h4>
              <p className="text-sm text-white/60">{inquiry.email}</p>
            </div>
            <StatusBadge processed={inquiry.processed} />
          </div>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
            {inquiry.message}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
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
