'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ROLES = [
  { value: "admin", label: "Administrátor" },
  { value: "manager", label: "Manager" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "admin",
  });
  const [passwordForm, setPasswordForm] = useState({ password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordUser, setPasswordUser] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Neznámá chyba");
      setUsers(json.users || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Nepodařilo se založit uživatele");
      setFormData({ email: "", password: "", name: "", role: "admin" });
      setShowCreateModal(false);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (user) => {
    await updateUser(user.id, { is_active: !user.is_active });
  };

  const resetPassword = (user) => {
    setPasswordUser(user);
    setPasswordForm({ password: "" });
    setShowPasswordModal(true);
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Opravdu chcete smazat ${user.email}?`)) return;
    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Nepodařilo se smazat uživatele");
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUser = async (id, payload) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Nastala chyba");
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordUser) return;
    setPasswordSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/users/${passwordUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: passwordUser.id,
          password: passwordForm.password,
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Nepodařilo se změnit heslo");
      setShowPasswordModal(false);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setPasswordSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Access control</p>
        <h2 className="text-3xl md:text-4xl font-semibold">Administrátoři</h2>
        <p className="text-white/60 text-sm">
          Spravujte účty, role a přístupy ve stejném liquid-glass stylu.
        </p>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-2xl backdrop-blur-xl">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white"
          onClick={() => setShowCreateModal(true)}
        >
          Nový administrátor
        </Button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-semibold">Seznam uživatelů</h3>
          <Button
            variant="ghost"
            onClick={loadUsers}
            className="rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
          >
            Obnovit
          </Button>
        </div>

        {loading ? (
          <p className="text-white/60">Načítám administrátory…</p>
        ) : users.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <GlassCard key={user.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">{user.role}</p>
                      <h4 className="text-2xl text-white font-semibold">{user.email}</h4>
                      <p className="text-white/60 text-sm">{user.name || "Bez jména"}</p>
                    </div>
                    <StatusBadge isActive={user.is_active} />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="ghost"
                      className="text-white rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
                      onClick={() => toggleActive(user)}
                    >
                      {user.is_active ? "Deaktivovat" : "Aktivovat"}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
                      onClick={() => resetPassword(user)}
                    >
                      Resetovat heslo
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-full border border-white/20 bg-red-500/10 hover:bg-red-500/20 text-red-200"
                      onClick={() => deleteUser(user)}
                    >
                      Smazat
                    </Button>
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        )}
      </section>
      <CreateUserModal
        open={showCreateModal}
        onOpenChange={(open) => {
          setShowCreateModal(open);
          if (!open) {
            setFormData({ email: "", password: "", name: "", role: "admin" });
          }
        }}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
        onSubmit={handleCreate}
      />

      <PasswordModal
        open={showPasswordModal}
        onOpenChange={(open) => {
          setShowPasswordModal(open);
          if (!open) setPasswordUser(null);
        }}
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        submitting={passwordSubmitting}
        onSubmit={submitPasswordChange}
        user={passwordUser}
      />
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

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </Label>
      {children}
    </div>
  );
}

function StatusBadge({ isActive }) {
  return (
    <span
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border",
        isActive
          ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
          : "border-red-400/40 bg-red-500/10 text-red-200"
      )}
    >
      {isActive ? "Aktivní" : "Deaktivovaný"}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-white/15 rounded-3xl p-10 text-center text-white/60 backdrop-blur-xl">
      <p className="text-lg">Zatím nejsou založeni žádní administrátoři.</p>
      <p className="text-sm mt-2">
        Použijte formulář výše a vytvořte první účet.
      </p>
    </div>
  );
}

function CreateUserModal({
  open,
  onOpenChange,
  formData,
  setFormData,
  submitting,
  onSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/80 border border-white/10 text-white max-w-xl">
        <DialogHeader>
          <DialogTitle>Nový administrátor</DialogTitle>
          <DialogDescription className="text-white/60">
            Vyplňte údaje a odešlete formulář pro vytvoření přístupů.
          </DialogDescription>
        </DialogHeader>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={onSubmit}>
          <Field label="E-mail">
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="admin@elegantniweb.cz"
            />
          </Field>
          <Field label="Jméno">
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="Jméno"
            />
          </Field>
          <Field label="Heslo">
            <Input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="Minimálně 8 znaků"
            />
          </Field>
          <Field label="Role">
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white"
            >
              {ROLES.map((role) => (
                <option key={role.value} value={role.value} className="bg-black text-white">
                  {role.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
              className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white"
            >
              {submitting ? "Přidávám…" : "Vytvořit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PasswordModal({
  open,
  onOpenChange,
  passwordForm,
  setPasswordForm,
  submitting,
  onSubmit,
  user,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/80 border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Změna hesla</DialogTitle>
          <DialogDescription className="text-white/60">
            Nové heslo pro {user?.email}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Field label="Nové heslo">
            <Input
              type="password"
              required
              minLength={8}
              value={passwordForm.password}
              onChange={(e) => setPasswordForm({ password: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="Minimálně 8 znaků"
            />
          </Field>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              Zrušit
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white"
            >
              {submitting ? "Ukládám…" : "Změnit heslo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
