'use client';

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchOrders } from "@/api/orders";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const statCards = [
  { label: "Celkem objednávek", key: "total", accent: "text-white" },
  { label: "Čeká na schválení", key: "toApprove", accent: "text-yellow-300" },
  { label: "Schváleno", key: "approved", accent: "text-emerald-300" },
];

const motivationalQuotes = [
  { text: "Doufám, že se máš naprosto skvěle.", author: "Vašek Tomanec" },
  { text: "Každý úspěch začíná odvážným rozhodnutím udělat první krok.", author: "Vašek Tomanec" },
  { text: "Změna nezačíná plánem, ale závazkem, že to opravdu dotáhneš.", author: "Vašek Tomanec" },
  { text: "Business je maraton – vítězí ten, kdo se nebojí běžet každý den.", author: "Vašek Tomanec" },
  { text: "Čím dřív přijmeš odpovědnost, tím dřív přijde svoboda.", author: "Vašek Tomanec" },
  { text: "Lidé nekupují produkt, ale víru, že s tebou uspějí.", author: "Vašek Tomanec" },
  { text: "Neboj se odmítnutí – je to jen důkaz, že jdeš dopředu.", author: "Vašek Tomanec" },
  { text: "Budoucnost nečeká, buduješ ji tím, co děláš právě teď.", author: "Vašek Tomanec" },
  { text: "Když se nedaří, zrychli učení, ne výmluvy.", author: "Vašek Tomanec" },
  { text: "Silné značky vznikají z konzistence, ne z náhodných výstřelů.", author: "Vašek Tomanec" },
  { text: "Úspěch není cílová páska, ale zvyk vítězit každý den.", author: "Vašek Tomanec" },
  { text: "Odolnost je měna leadrů – vydržet, i když ostatní zpomalí.", author: "Vašek Tomanec" },
  { text: "Každý klient je partnerem, který ti pomáhá růst.", author: "Vašek Tomanec" },
  { text: "Nepřestávej, dokud se tvůj standard nestane inspirací pro ostatní.", author: "Vašek Tomanec" },
  { text: "Inovace není luxus, ale kyslík firmy.", author: "Vašek Tomanec" },
  { text: "Značku stavíš v momentech, kdy tě nikdo nevidí pracovat.", author: "Vašek Tomanec" },
  { text: "Cíle bez disciplíny jsou jen sny, které zlenivěly.", author: "Vašek Tomanec" },
  { text: "Nadšení vyhrává meeting, výsledky vyhrávají trh.", author: "Vašek Tomanec" },
  { text: "Každý tým potřebuje vizi, ale i jasné měřítko pokroku.", author: "Vašek Tomanec" },
  { text: "Kreativita bez exekuce je jen hezká myšlenka.", author: "Vašek Tomanec" },
  { text: "Vlastní firma je nejlepší škola leadershipu.", author: "Vašek Tomanec" },
  { text: "Budoucí trh patří těm, kteří dnes budují důvěru.", author: "Vašek Tomanec" },
  { text: "Úspěch se nedá outsourcovat – musíš ho odmakat.", author: "Vašek Tomanec" },
  { text: "Směr určuješ ty, čísla jen potvrzují, že jdeš správně.", author: "Vašek Tomanec" },
  { text: "Když dáš zákazníkovi jistotu, dá ti loajalitu.", author: "Vašek Tomanec" },
  { text: "Minimalismus v procesu, maximalismus v ambicích.", author: "Vašek Tomanec" },
  { text: "Každá obchodní příležitost je test, zda opravdu rozumíš lidem.", author: "Vašek Tomanec" },
  { text: "Nejúspěšnější firmy jsou ty, které umí převést hodnoty do každého e-mailu.", author: "Vašek Tomanec" },
  { text: "Když chceš růst, musíš být ochoten dočasně být nepochopen.", author: "Vašek Tomanec" },
  { text: "Cokoli si mysl dokáže představit a čemu dokáže uvěřit, toho může dosáhnout.", author: "Napoleon Hill" },
  { text: "Nečekej. Ten správný čas nikdy nepřijde.", author: "Napoleon Hill" },
  { text: "Disciplína je most mezi cíli a jejich naplněním.", author: "Jim Rohn" },
  { text: "Buď řídíš den ty, nebo den řídí tebe.", author: "Jim Rohn" },
  { text: "Nejlepší způsob, jak předpovědět budoucnost, je vytvořit ji.", author: "Peter Drucker" },
  { text: "Úspěch obvykle přichází k těm, kteří jsou příliš zaneprázdněni na to ho hledat.", author: "H. D. Thoreau" },
  { text: "Pokud nejsi ochotný riskovat obvyklé, musíš se spokojit s obyčejným.", author: "Jim Rohn" },
  { text: "Geniálnost je jedno procento inspirace a devadesát devět procent dřiny.", author: "Thomas Edison" },
  { text: "Nepřežívá nejsilnější druh, ale ten, který se dokáže nejlépe přizpůsobit změně.", author: "Charles Darwin" },
  { text: "Lidé nekupují produkty a služby. Kupují vztahy, příběhy a magii.", author: "Seth Godin" },
  { text: "Značku buduješ v tichu práce, ne na sociálních sítích.", author: "Podnikatelská moudrost" },
  { text: "Konzistence poráží intenzitu. Každý den vyhráváš o kousek.", author: "Podnikatelská moudrost" },
  { text: "Nejdražší ve firmě je stagnace. Růst stojí méně než přešlapování.", author: "Podnikatelská moudrost" },
  { text: "Firmu neškálují nápady, ale procesy a systémy.", author: "Podnikatelská moudrost" },
  { text: "Kvalita tvých rozhodnutí určuje rychlost růstu firmy.", author: "Podnikatelská moudrost" },
  { text: "Pokud neinvestuješ do vlastního růstu, investuješ do své stagnace.", author: "Podnikatelská moudrost" },
  { text: "Úspěch je vedlejší produkt disciplíny.", author: "Podnikatelská moudrost" },
  { text: "Cesta nahoru je jednoduchá, ale není snadná.", author: "Podnikatelská moudrost" },
  { text: "Všechno, co chceš, je na druhé straně nepohodlí.", author: "Podnikatelská moudrost" },
  { text: "Najímej podle hodnot, dovednosti se dají doučit.", author: "Podnikatelská moudrost" },
  { text: "Firma je odrazem energie svého zakladatele.", author: "Podnikatelská moudrost" },
  { text: "Čísla budují důkazy, konzistence buduje důvěru.", author: "Podnikatelská moudrost" },
];

export default function AdminDashboardPage() {
  const [orderStats, setOrderStats] = useState({
    total: 0,
    toApprove: 0,
    approved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteReady, setQuoteReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadOrders() {
      try {
        const data = await fetchOrders();
        if (!isMounted) return;
        const orders = data.orders || [];
        const toApprove = orders.filter((o) => o.status === "to_approve").length;
        const approved = orders.filter((o) => o.status === "approved").length;
        setOrderStats({
          total: orders.length,
          toApprove,
          approved,
        });
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadOrders();
    if (!quoteReady && motivationalQuotes.length > 0) {
      setQuoteIndex(Math.floor(Math.random() * motivationalQuotes.length));
      setQuoteReady(true);
    }
    return () => {
      isMounted = false;
    };
  }, [quoteReady]);

  const activeQuote = useMemo(
    () => motivationalQuotes[quoteIndex] || motivationalQuotes[0],
    [quoteIndex]
  );
  const handleShuffleQuote = () => {
    setQuoteIndex((prev) => {
      if (motivationalQuotes.length <= 1) return prev;
      let next = Math.floor(Math.random() * motivationalQuotes.length);
      while (next === prev) {
        next = Math.floor(Math.random() * motivationalQuotes.length);
      }
      return next;
    });
  };

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.4em] text-white/60">
            Elegantniweb Admin
          </div>
          {loading && (
            <span className="text-xs text-white/60 animate-pulse">
              Synchronizuji data…
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-4 justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold">Dashboard</h2>
            <p className="text-white/60 text-sm mt-2">
              Každý den se nám daří lépe a lépe.
            </p>
          </div>
          {/* <Button variant="ghost" className="border border-white/20 rounded-full">
            Export reportu <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button> */}
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-400/40 text-red-200 px-4 py-3 rounded-2xl backdrop-blur-xl">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <GlassCard key={card.key}>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {card.label}
              </p>
              <p className={`text-5xl font-light ${card.accent}`}>
                {orderStats[card.key]}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <p className="text-xs text-white/50">
                {card.key === "toApprove"
                  ? "Věnujte se těmto poptávkám jako prvním."
                  : card.key === "approved"
                  ? "Hotové objednávky připravené k realizaci."
                  : "Celkový objem přijatých požadavků."}
              </p>
            </CardContent>
          </GlassCard>
        ))}
      </div>

      <QuoteCard quote={activeQuote} onShuffle={handleShuffleQuote} />
    </div>
  );
}

function GlassCard({ children }) {
  return (
    <Card className="border border-white/15 bg-white/5 backdrop-blur-2xl shadow-[0_20px_120px_rgba(15,23,42,0.45)] rounded-3xl">
      {children}
    </Card>
  );
}

function QuoteCard({ quote, onShuffle }) {
  if (!quote) return null;
  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-semibold text-white mt-2">Citát dne</h3>
          </div>
          <Button
            variant="ghost"
            className="rounded-full border border-white/15 text-xs uppercase tracking-[0.3em]"
            onClick={onShuffle}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            další
          </Button>
        </div>
        <blockquote className="text-xl md:text-2xl text-white/90 italic leading-relaxed">
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <p className="text-sm text-white/60 uppercase tracking-[0.3em]">
          {quote.author || "Elegantniweb Crew"}
        </p>
      </CardContent>
    </Card>
  );
}
