import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rows = [
  { id: "ORD-10421", symbol: "AAPL", side: "Buy", qty: 100, entry: 185.24, current: 188.1, pl: 286.0, status: "Open" },
  { id: "ORD-10422", symbol: "TSLA", side: "Sell", qty: 50, entry: 245.8, current: 242.7, pl: 155.0, status: "Open" },
  { id: "ORD-10423", symbol: "MSFT", side: "Buy", qty: 75, entry: 410.2, current: 408.4, pl: -135.0, status: "Open" },
  { id: "ORD-10424", symbol: "NVDA", side: "Buy", qty: 20, entry: 127.6, current: 131.9, pl: 86.0, status: "Filled" },
  { id: "ORD-10425", symbol: "AMZN", side: "Sell", qty: 40, entry: 171.4, current: 169.2, pl: 88.0, status: "Open" },
  { id: "ORD-10426", symbol: "META", side: "Buy", qty: 30, entry: 512.3, current: 507.9, pl: -132.0, status: "Open" },
];

export default function Trade() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Trade</h1>
          <p className="text-muted-foreground">Manage and review your open and recent orders.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Entry Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>P/L ($)</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell>${r.entry.toFixed(2)}</TableCell>
                    <TableCell>${r.current.toFixed(2)}</TableCell>
                    <TableCell className={r.pl >= 0 ? "text-emerald-600" : "text-rose-600"}>
                      {r.pl >= 0 ? "+" : ""}{r.pl.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={r.status === "Open" ? "secondary" : "default"}>{r.status}</Badge>
                    </TableCell>
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
