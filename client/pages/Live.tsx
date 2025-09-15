import { useEffect, useMemo, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LastRefresh from "@/components/common/LastRefresh";

export default function Live() {
  type Row = { id: string; symbol: string; side: "Buy" | "Sell"; qty: number; avg: number; last: number; pl: number; time: string };
  const [rows, setRows] = useState<Row[]>([
    { id: "TRD-20001", symbol: "AAPL", side: "Buy", qty: 120, avg: 185.2, last: 185.2, pl: 0, time: new Date().toLocaleTimeString() },
    { id: "TRD-20002", symbol: "TSLA", side: "Sell", qty: 60, avg: 245.8, last: 245.8, pl: 0, time: new Date().toLocaleTimeString() },
    { id: "TRD-20003", symbol: "MSFT", side: "Buy", qty: 80, avg: 410.4, last: 410.4, pl: 0, time: new Date().toLocaleTimeString() },
    { id: "TRD-20004", symbol: "NVDA", side: "Buy", qty: 25, avg: 127.8, last: 127.8, pl: 0, time: new Date().toLocaleTimeString() },
    { id: "TRD-20005", symbol: "AMZN", side: "Sell", qty: 45, avg: 171.2, last: 171.2, pl: 0, time: new Date().toLocaleTimeString() },
    { id: "TRD-20006", symbol: "META", side: "Buy", qty: 35, avg: 512.9, last: 512.9, pl: 0, time: new Date().toLocaleTimeString() },
  ]);

  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setRows((prev) =>
        prev.map((r) => {
          const delta = (Math.random() - 0.5) * 2; // +/- 1
          const last = parseFloat((r.last + delta).toFixed(2));
          const pl = parseFloat(((last - r.avg) * (r.side === "Buy" ? 1 : -1) * r.qty).toFixed(2));
          return { ...r, last, pl, time: new Date().toLocaleTimeString() };
        }),
      );
    }, 1500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const totalPL = useMemo(() => rows.reduce((acc, r) => acc + r.pl, 0), [rows]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Live Trades</h1>
          <p className="text-muted-foreground">Streaming trade updates in real-time.</p>
        </div>
        <div className="flex items-center gap-4">
          <LastRefresh />
          <Badge className="gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            LIVE
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Positions <span className={totalPL >= 0 ? "text-emerald-600" : "text-rose-600"}>({totalPL >= 0 ? "+" : ""}{totalPL.toFixed(2)} P/L)</span></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trade ID</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Avg Price</TableHead>
                  <TableHead>Last Price</TableHead>
                  <TableHead>P/L ($)</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell>{r.symbol}</TableCell>
                    <TableCell>
                      <Badge variant={r.side === "Buy" ? "default" : "secondary"}>{r.side}</Badge>
                    </TableCell>
                    <TableCell>{r.qty}</TableCell>
                    <TableCell>${r.avg.toFixed(2)}</TableCell>
                    <TableCell>${r.last.toFixed(2)}</TableCell>
                    <TableCell className={r.pl >= 0 ? "text-emerald-600" : "text-rose-600"}>
                      {r.pl >= 0 ? "+" : ""}{r.pl.toFixed(2)}
                    </TableCell>
                    <TableCell>{r.time}</TableCell>
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
