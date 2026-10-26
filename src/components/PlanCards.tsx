import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellRing, Check } from "lucide-react";

const API_URL: string =
  (import.meta.env["VITE_API_URL"] as string | undefined) ??
  "https://o4auovkfo6.execute-api.us-east-1.amazonaws.com";

type Plan = {
  plan_name: "tokyo" | "seoul";
  label: string;
  route: string;
  hint: number;
};

const PLANS: Plan[] = [
  { plan_name: "tokyo", label: "台北 ✈ 東京", route: "TPE-TYO", hint: 7368 },
  { plan_name: "seoul", label: "台北 ✈ 首爾", route: "TPE-SEL", hint: 7071 },
];

type Subscription = { route: string; target_price: number };

async function fetchSubscriptions(email: string): Promise<Subscription[]> {
  const res = await fetch(`${API_URL}/subscriptions?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("無法載入訂閱");
  const data = (await res.json()) as { subscriptions: Subscription[] };
  return data.subscriptions;
}

async function saveSubscription(input: {
  email: string;
  plan_name: Plan["plan_name"];
  target_price: number;
}) {
  const res = await fetch(`${API_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("訂閱失敗，請稍後再試");
  return res.json();
}

function PlanCard({
  plan,
  email,
  current,
}: {
  plan: Plan;
  email: string;
  current?: Subscription | undefined;
}) {
  const queryClient = useQueryClient();
  const [price, setPrice] = useState<string>(current ? String(current.target_price) : "");
  const [editing, setEditing] = useState(false);

  const mutation = useMutation({
    mutationFn: saveSubscription,
    onSuccess: () => {
      setEditing(false);
      return queryClient.invalidateQueries({ queryKey: ["subscriptions", email] });
    },
  });

  const subscribed = Boolean(current);
  const showForm = !subscribed || editing;
  const target = Number(price);
  const valid = Number.isFinite(target) && target > 0;

  return (
    <div className="ink-card relative flex flex-col gap-4 p-6 text-left">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">{plan.label}</h2>
        {subscribed && (
          <span className="ink-badge inline-flex items-center gap-1 bg-sun px-2.5 py-0.5 text-xs font-semibold">
            <Check className="size-3.5" aria-hidden />
            已訂閱
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        目前最低約 NT${plan.hint.toLocaleString()}，設定你的目標價，降到就寄信通知你。
      </p>

      {subscribed && !editing && current && (
        <p className="text-base font-semibold">
          目標價：NT${current.target_price.toLocaleString()}
        </p>
      )}

      {showForm && (
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          目標價（TWD）
          <input
            type="number"
            min={1}
            inputMode="numeric"
            className="input-ink px-3 py-2"
            placeholder={`例如 ${Math.round(plan.hint * 1.1)}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      )}

      {mutation.isError && (
        <p role="alert" className="text-sm font-semibold text-destructive">
          {(mutation.error as Error).message}
        </p>
      )}

      <div className="mt-auto flex gap-3">
        {showForm ? (
          <button
            type="button"
            className="btn-sun flex-1 px-4 py-2 text-base"
            disabled={!valid || mutation.isPending}
            onClick={() =>
              mutation.mutate({ email, plan_name: plan.plan_name, target_price: target })
            }
          >
            <BellRing className="size-4" aria-hidden />
            {mutation.isPending ? "儲存中…" : subscribed ? "儲存" : "開始追蹤"}
          </button>
        ) : (
          <button
            type="button"
            className="btn-paper flex-1 px-4 py-2 text-base"
            onClick={() => {
              setPrice(String(current?.target_price ?? ""));
              setEditing(true);
            }}
          >
            更新目標價
          </button>
        )}
        {subscribed && editing && (
          <button
            type="button"
            className="btn-paper px-4 py-2 text-base"
            onClick={() => setEditing(false)}
          >
            取消
          </button>
        )}
      </div>
    </div>
  );
}

export function PlanCards({ email }: { email: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subscriptions", email],
    queryFn: () => fetchSubscriptions(email),
  });

  return (
    <div className="w-full max-w-3xl">
      {isError && (
        <p role="alert" className="mb-4 text-center text-sm font-semibold text-destructive">
          無法載入你的訂閱狀態，請重新整理再試一次。
        </p>
      )}
      <div className={`grid gap-6 sm:grid-cols-2 ${isLoading ? "opacity-60" : ""}`}>
        {PLANS.map((plan) => (
          <PlanCard
            key={`${plan.route}-${data?.find((s) => s.route === plan.route)?.target_price ?? "none"}`}
            plan={plan}
            email={email}
            current={data?.find((s) => s.route === plan.route)}
          />
        ))}
      </div>
    </div>
  );
}
