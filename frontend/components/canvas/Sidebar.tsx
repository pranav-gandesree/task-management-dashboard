
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, KanbanSquare, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'

const Sidebar = () => {
  const { user, setUser } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    router.push('/signin')
  }

  const navItems = [
    { href: '/dashboard', label: 'Task List', icon: LayoutDashboard },
    { href: '/dashboard/kanban', label: 'Kanban Board', icon: KanbanSquare },
  ]

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-neutral-900 text-white flex flex-col justify-between shadow-lg relative"
    >
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 bg-neutral-800 text-white rounded-full shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button> */}

      <div>
        <div className="p-4 mb-6">
          <motion.h2
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="text-2xl font-bold"
          >
            <span className="text-purple-500">Workflo</span>!
          </motion.h2>
        </div>

        <nav className="space-y-2 px-2 flex flex-col">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
              >
                <item.icon className="mr-2" size={20} />
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            {/* <AvatarImage src={user} alt={user?.username} /> */}
            <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-semibold">{user?.username}</p>
            <p className="text-sm text-neutral-400">{user?.email}</p>
          </motion.div>
        </div>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2" size={20} />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Logout
          </motion.span>
        </Button>
      </div>
    </motion.aside>
  )
}

export default Sidebar