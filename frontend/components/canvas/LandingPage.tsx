"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export default function LandingPage() {



  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">

      <header className="container mx-auto py-8">
        <nav className="flex justify-between items-center ml-6 mr-6">
          <h1 className="text-3xl font-bold text-purple-950">Workflo</h1>
          <div>
            <Link href="/signin">
                <Button variant="outline" className="mr-4">Sign In</Button>
            </Link>
            <Link href='/signup'>
            <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold text-center mb-8">Manage Your Tasks with Ease</h2>
          <p className="text-xl text-center mb-12">Create, edit, and organize your tasks effortlessly with our intuitive drag-and-drop interface.</p>
          <div className="flex flex-row items-center justify-center">
            <Link href="/signin">
                <Button variant="outline" className="mr-4">Get Started</Button>
            </Link>
          </div>
        </motion.div>

            
                
 
      </main>

    </div>
  )
}