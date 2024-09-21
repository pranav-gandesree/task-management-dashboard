import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <aside className="w-64 bg-slate-600 shadow-md">
        <nav className="p-5 space-y-2">
          <Link href="/dashboard/tasks">
            <Button variant="ghost" className="w-full justify-start">
              Task List
            </Button>
          </Link>
          <Link href="/dashboard/kanban">
            <Button variant="ghost" className="w-full justify-start">
              Kanban Board
            </Button>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>
    </div>
  )
}