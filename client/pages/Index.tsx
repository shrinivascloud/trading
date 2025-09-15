import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, BarChart3, DollarSign, Gauge, PieChart, TrendingUp, Users, Wallet } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import LastRefresh from "@/components/common/LastRefresh";

const kpis = [
  { title: "Total Profit & Loss", value: "+$5,420", change: "+2.4%", up: true, icon: DollarSign },
  { title: "Day P/L", value: "+$1,245", change: "+1.01%", up: true, icon: DollarSign },
  { title: "Open Positions", value: "14", change: "-1", up: false, icon: Gauge },
  { title: "Win Rate", value: "61.3%", change: "+0.7%", up: true, icon: TrendingUp },
  { title: "Total trades", value: "$142", change: "+$3", up: true, icon: BarChart3 },
  { title: "Total Target hit", value: "12", change: "+2", up: true, icon: TrendingUp },
  { title: "Total stop loss hit", value: "3", change: "0", up: false, icon: ArrowDownRight },
  { title: "Total win rate", value: "32", change: "+4", up: true, icon: Users },
  { title: "Nifty trades", value: "9", change: "+1", up: true, icon: TrendingUp },
  { title: "Nifty Target hit", value: "5", change: "-1", up: false, icon: ArrowDownRight },
  { title: "Nifty stop loss hit", value: "$58,200", change: "+$800", up: true, icon: Wallet },
  { title: "Nifty win rate", value: "$124", change: "+$12", up: true, icon: DollarSign },
];

const equity = Array.from({ length: 24 }, (_, i) => ({
  t: i,
  v: 100 + Math.sin(i / 2) * 5 + (Math.random() - 0.5) * 2,
}));

const SETTINGS_KEY = "tradedesk.settings";

function ModeWidget() {
  const [mode, setMode] = useState<"live" | "simulation">("simulation");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { mode?: "live" | "simulation" };
        if (parsed?.mode) setMode(parsed.mode);
      }
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (e.key === SETTINGS_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as { mode?: "live" | "simulation" };
          if (parsed?.mode) setMode(parsed.mode);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const live = mode === "live";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"text-2xl font-bold " + (live ? "text-emerald-600" : "text-rose-600")}>{live ? "Live" : "Simulation"}</div>
        <p className="text-xs text-muted-foreground">Current environment</p>
      </CardContent>
    </Card>
  );
}

export default function Index() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your trading performance and account activity.</p>
        </div>
        <LastRefresh />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpis.map((k, i) => (
          i === 2 ? (
            <ModeWidget key="mode-widget" />
          ) : (
            <Card key={k.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{k.title}</CardTitle>
                <k.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{k.value}</div>
                <p className={"text-xs flex items-center gap-1 " + (k.up ? "text-emerald-600" : "text-rose-600") }>
                  {k.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />} {k.change} from last period
                </p>
              </CardContent>
            </Card>
          )
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ equity: { label: "Equity", color: "hsl(var(--primary))" } }}
              className="w-full h-[260px]"
            >
              <LineChart data={equity}>
                <XAxis dataKey="t" hide tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="v" stroke="var(--color-equity)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm list-disc pl-4 space-y-2 text-muted-foreground">
              <li>Risk per trade capped at 1.0%.</li>
              <li>Focus list: AAPL, NVDA, MSFT, TSLA.</li>
              <li>Monitor spread during open; avoid slippage.</li>
              <li>Review losers and tighten stops.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
