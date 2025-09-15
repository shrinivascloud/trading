import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, LineChart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-[243px]">
          <button
            className="flex p-2 -ml-2 rounded-md hover:bg-muted"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center shadow-sm">
              <LineChart className="h-5 w-5" />
            </div>
            <span className="text-lg">TradeDesk Pro</span>
          </Link>

          <nav className={cn(
            "absolute left-0 right-0 top-16 border-b bg-background px-4 pb-4 lg:static lg:border-0 lg:bg-transparent lg:p-0",
            open ? "block" : "hidden lg:block",
          )}>
            <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trade"
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )
                  }
                >
                  Trade
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/live"
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )
                  }
                >
                  Live Trades
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signals"
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )
                  }
                >
                  Signals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )
                  }
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 w-full">
              <div className="relative w-full">
                <svg className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 21 21 L 16.66 16.66" />
                </svg>
              </div>
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70" />
          </div>
        </div>
      </header>

      <main className="container py-6 lg:py-8">{children}</main>
    </div>
  );
}
