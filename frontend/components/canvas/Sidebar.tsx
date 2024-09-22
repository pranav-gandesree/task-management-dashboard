'use client'

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const { user,setUser } = useUser(); 
  const router = useRouter();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/signin'); // Redirect to login on logout
  };
  return (
    <div className="flex h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <aside className="w-64 bg-slate-600 shadow-md flex flex-col justify-between">
        <nav className="p-5 space-y-2">
          <Link href="/dashboard/">
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

        <div className="p-5 border-t border-neutral-800">
          <div className="mb-4">
            <h1 className="text-white font-semibold">Welcome, {user?.username}!</h1>
            <p className="text-neutral-300 text-sm">Email: {user?.email}</p>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500"
            onClick={logout} // Trigger logout function when button is clicked
          >
            Logout
          </Button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
