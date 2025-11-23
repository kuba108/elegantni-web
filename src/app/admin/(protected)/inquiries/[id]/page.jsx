'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InquiryDetailPage() {
  const params = useParams();
  const inquiryId = params?.id;

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadInquiry = async () => {
    if (!inquiryId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/contact-forms/${inquiryId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Nepodařilo se načíst dotaz.");
      }
      setInquiry(data.inquiry);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiry();
  }, [inquiryId]);

  const toggleProcessed = async () => {
    if (!inquiry) return;
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/contact-forms/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ processed: !inquiry.processed }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Nepodařilo se upravit dotaz.");
      }
      setInquiry(data.inquiry);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const processedInfo = inquiry?.processed_at
    ? new Date(inquiry.processed_at).toLocaleString("cs-CZ")
    : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Detail dotazu</p>
          <h2 className="text-3xl md:text-4xl font-semibold">
            {inquiry?.name || "Načítám..."}
          </h2>
          <p className="text-white/60 text-sm mt-2">{inquiry?.email}</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20"
            asChild
          >
            <Link href="/admin/inquiries">Zpět na seznam</Link>
          </Button>
          <Button
            onClick={toggleProcessed}
            disabled={!inquiry || saving}
            className={`rounded-full border ${inquiry?.processed ? "border-white/20 bg-white/10 hover:bg-white/20" : "border-emerald-400/40 bg-emerald-500/20 hover:bg-emerald-500/30"} text-white`}
          >
            {saving
              ? "Ukládám…"
              : inquiry?.processed
              ? "Označit jako nevyřízené"
              : "Označit jako zpracované"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-2xl backdrop-blur-xl">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-white/60">Načítám detail dotazu…</p>
      ) : !inquiry ? (
        <div className="text-white/70">
          Dotaz se nepodařilo načíst nebo byl odstraněn.
        </div>
      ) : (
        <Card className="border border-white/15 bg-white/5 backdrop-blur-2xl rounded-3xl">
          <CardContent className="p-6 space-y-6">
            <InfoGrid inquiry={inquiry} processedInfo={processedInfo} />
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                Zpráva
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-white/80 whitespace-pre-wrap leading-relaxed">
                {inquiry.message}
              </div>
            </section>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function InfoGrid({ inquiry, processedInfo }) {
  const created = new Date(inquiry.created_at).toLocaleString("cs-CZ");

  const items = [
    { label: "Email", value: inquiry.email },
    { label: "Telefon", value: inquiry.phone || "neuvedeno" },
    { label: "Služba", value: inquiry.service_interest || "neuvedeno" },
    { label: "Vytvořeno", value: created },
    {
      label: "Stav",
      value: inquiry.processed ? "Zpracováno" : "Čeká na zpracování",
    },
    {
      label: "Zpracováno",
      value: inquiry.processed ? processedInfo : "zatím ne",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item) => (
        <div key={item.label} className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            {item.label}
          </p>
          <p className="text-white text-lg">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
