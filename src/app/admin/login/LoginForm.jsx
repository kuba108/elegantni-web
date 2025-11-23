'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Přihlášení se nezdařilo");
      }
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_25px_120px_rgba(15,23,42,0.6)]">
      <CardContent className="p-8 space-y-6">
        {error && (
          <div className="text-sm text-red-200 bg-red-500/10 border border-red-500/40 rounded-2xl px-4 py-3">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs tracking-[0.3em] text-white/50 uppercase">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="admin@blixo.cz"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs tracking-[0.3em] text-white/50 uppercase">
              Heslo
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="********"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white"
          >
            {loading ? "Přihlašuji…" : "Přihlásit se"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
