import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STORAGE_KEY = "tradedesk.settings";

type Mode = "live" | "simulation";

type Settings = {
  index: "infty" | "banknifty";
  quantity: number;
  mode: Mode;
};

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>({ index: "infty", quantity: 1, mode: "simulation" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Settings;
        setForm(parsed);
      }
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    toast.success("Settings saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your trading preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trading Preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="index">Index</Label>
            <Select value={form.index} onValueChange={(v: Settings["index"]) => setForm((f) => ({ ...f, index: v }))}>
              <SelectTrigger id="index">
                <SelectValue placeholder="Select index" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infty">infty</SelectItem>
                <SelectItem value="banknifty">banknifty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qty">Lots</Label>
            <Input
              id="qty"
              type="number"
              min={1}
              step={1}
              value={form.quantity}
              onChange={(e) => setForm((f) => ({ ...f, quantity: Math.max(1, Number(e.target.value || 1)) }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Mode</Label>
            <RadioGroup
              className="flex gap-6"
              value={form.mode}
              onValueChange={(v: Mode) => setForm((f) => ({ ...f, mode: v }))}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="live" id="mode-live" />
                <Label htmlFor="mode-live">Live</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="simulation" id="mode-sim" />
                <Label htmlFor="mode-sim">Simulation</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <Button onClick={save}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
