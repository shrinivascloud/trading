import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, BarChart3, Radio, SignalHigh } from "lucide-react";
import LastRefresh from "@/components/common/LastRefresh";

 type Signal = { timestamp: string; symbol: string; side: "Buy" | "Sell" };

 const signals: Signal[] = [
  { timestamp: new Date().toISOString(), symbol: "NIFTY24AUGFUT", side: "Buy" },
  { timestamp: new Date().toISOString(), symbol: "BANKNIFTY24AUGFUT", side: "Sell" },
  { timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), symbol: "NIFTY24AUG24000CE", side: "Buy" },
  { timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), symbol: "BANKNIFTY24AUG50000PE", side: "Sell" },
  { timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), symbol: "NIFTY24AUG23900PE", side: "Buy" },
];

 function isToday(iso: string) {
  const d = new Date(iso);
  const t = new Date();
  return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}

 const totalSignals = signals.length;
 const todaySignals = signals.filter((s) => isToday(s.timestamp)).length;
 const niftyTotal = signals.filter((s) => s.symbol.toUpperCase().startsWith("NIFTY")).length;
 const bankniftyTotal = signals.filter((s) => s.symbol.toUpperCase().startsWith("BANKNIFTY")).length;

 export default function Signals() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Signals</h1>
          <p className="text-muted-foreground">Latest strategy signals and counts.</p>
        </div>
        <LastRefresh />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total signals</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSignals}</div>
            <p className="text-xs text-muted-foreground">All-time</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today signals</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySignals}</div>
            <p className="text-xs text-muted-foreground">Generated today</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nifty total signals</CardTitle>
            <SignalHigh className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{niftyTotal}</div>
            <p className="text-xs text-muted-foreground">Across NIFTY instruments</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Banknifty total signals</CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bankniftyTotal}</div>
            <p className="text-xs text-muted-foreground">Across BANKNIFTY instruments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Signals Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Side</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {signals.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{new Date(s.timestamp).toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-sm">{s.symbol}</TableCell>
                    <TableCell>{s.side}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
 }
