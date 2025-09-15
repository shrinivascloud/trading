import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export default function LastRefresh({ className }: { className?: string }) {
  const [ts, setTs] = useState<Date>(new Date());

  useEffect(() => {
    setTs(new Date());
  }, []);

  const refresh = () => setTs(new Date());

  return (
    <div className={["flex items-center gap-3", className].filter(Boolean).join(" ")}> 
      <Button variant="outline" size="sm" className="h-8" onClick={refresh}>
        <RotateCw className="h-4 w-4 mr-2" /> Refresh
      </Button>
      <span className="text-xs text-muted-foreground">Last refresh: {ts.toLocaleString()}</span>
    </div>
  );
}
