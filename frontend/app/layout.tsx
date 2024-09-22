import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { TaskProvider } from '@/context/TaskContext'
// import { AuthProvider } from "@/context/AuthContext";

import { UserProvider } from '../context/UserContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: 'Task Management Dashboard',
  description: 'Manage your tasks with ease',
}




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <UserProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 `}
        >
         <TaskProvider>
          {children}
        </TaskProvider>
      </body>
      </UserProvider>

    </html>
  );
}
