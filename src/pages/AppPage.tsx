import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Plane, LogOut } from "lucide-react";

import { useAuth } from "@/auth/AuthProvider";
import { Airliner, Cloud, Luggage, Sparkle } from "@/components/SkyDecor";
import { supabase } from "@/integrations/supabase/client";
import { useDocumentMeta } from "@/lib/use-document-meta";

export default function AppPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useDocumentMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "Your Flight Price Notifier dashboard.",
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  }

  // RequireAuth guarantees a user before this renders.
  if (!user) return null;

  return (
    <div className="sky-scene flex min-h-screen flex-col text-foreground">
      <header className="border-b-[2.5px] border-ink bg-cream/90">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
            <span className="ink-badge size-9 bg-sun">
              <Plane className="size-[18px] -rotate-12 text-ink" aria-hidden />
            </span>
            <span>Flight Price Notifier</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-semibold text-muted-foreground sm:inline">
              Hi {user.email}
            </span>
            <button type="button" onClick={handleSignOut} className="btn-paper px-4 py-1.5 text-sm">
              <LogOut className="size-4" aria-hidden />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 pb-28 pt-12">
        <Cloud className="anim-drift absolute left-[5%] top-10 w-28 sm:w-36" />
        <Cloud className="anim-drift absolute right-[8%] top-[38%] hidden w-28 [animation-delay:-4s] md:block" />
        <Sparkle className="absolute left-[20%] top-[46%] hidden size-5 sm:block" />
        <Sparkle className="absolute right-[22%] top-12 size-4" />
        <Airliner className="anim-bob absolute right-[6%] top-8 hidden w-36 sm:block" />
        <div className="runway absolute inset-x-0 bottom-0 h-14" aria-hidden />
        <Luggage className="absolute bottom-5 right-[8%] w-20 sm:w-28" />

        <div className="ink-card relative w-full max-w-lg p-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Hi {user.email}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
