import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane } from "lucide-react";

import { Cloud, Sparkle } from "@/components/SkyDecor";
import { supabase } from "@/integrations/supabase/client";
import { useDocumentMeta } from "@/lib/use-document-meta";

type Mode = "signin" | "signup";

export default function AuthPage({ initialMode = "signin" }: { initialMode?: Mode }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useDocumentMeta({
    title: "Sign in — Flight Price Notifier",
    description: "Sign in or create an account to track flight prices from Taipei.",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
      }
      navigate("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="sky-scene flex min-h-screen flex-col text-foreground">
      <header className="border-b-[2.5px] border-ink bg-cream/90">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
          >
            <span className="ink-badge size-9 bg-sun">
              <Plane className="size-[18px] -rotate-12 text-ink" aria-hidden />
            </span>
            <span>Flight Price Notifier</span>
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-12">
        <Cloud className="anim-drift absolute left-[6%] top-12 w-28 sm:w-36" />
        <Cloud className="anim-drift absolute bottom-16 right-[6%] hidden w-32 [animation-delay:-4s] sm:block" />
        <Sparkle className="absolute right-[18%] top-14 size-5" />
        <Sparkle className="absolute bottom-24 left-[14%] hidden size-4 sm:block" />

        <div className="ink-card relative w-full max-w-sm p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Sign in / 登入" : "Sign up / 註冊"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Welcome back. Enter your email and password."
              : "Create an account with your email and password."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-ink w-full px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-ink w-full px-3 py-2.5 text-sm outline-none"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border-2 border-destructive bg-[#fbe4dc] px-3 py-2 text-sm font-semibold text-destructive"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn-sun w-full px-4 py-2.5 text-base"
            >
              {pending ? "Please wait…" : mode === "signin" ? "Sign in / 登入" : "Sign up / 註冊"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "No account yet?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
              }}
              className="font-bold text-primary underline decoration-2 underline-offset-4 hover:decoration-sun"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
