import { ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

interface ShellProps {
  children: React.ReactNode
  breadcrumb?: React.ReactNode
}

export function Shell({ children, breadcrumb }: ShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-primary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 group-hover:bg-white/15 transition-colors">
              <ShieldCheck className="h-5 w-5 text-accent" strokeWidth={2} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg tracking-tight">
                Risk Intelligence Platform
              </span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Reference Build · Mock Data
          </div>
        </div>
        {breadcrumb && (
          <div className="border-t border-white/10 bg-primary-deep/40">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-2.5">{breadcrumb}</div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-xs text-ink-faint flex items-center justify-between">
          <span>© Risk Intelligence Platform — internal reference build</span>
          <span className="font-mono">v0.1.0-demo</span>
        </div>
      </footer>
    </div>
  )
}
