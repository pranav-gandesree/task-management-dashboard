
import Sidebar from '@/components/canvas/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
     
      <Sidebar/>
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>
    </div>
  )
}