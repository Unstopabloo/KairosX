import Link from "next/link";
import { Wallet, User, LucideFlag, Hexagon, LayoutDashboard } from 'lucide-react';

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center p-6 text-white h-screen overflow-hidden">
      <div className="container flex-1">
        {children}
      </div>
      <nav className="p-6 font-semibold flex items-center justify-center gap-10">
        <ul className="bg-gray-800/80 border border-gray-600/50 flex items-center gap-5 px-5 py-1 rounded-lg [&>li]:list-none [&>li]:p-2">
          <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard"}>
            <LayoutDashboard size={24} />
          </Link>
          <LogoutLink className="w-full hover:bg-primary hover:text-black p-2 rounded-lg">
            <User size={24} />
          </LogoutLink>
          <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard/goals"}>
            <LucideFlag size={24} />
          </Link>
          <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard/wallet"}>
            <Wallet size={24} />
          </Link>
        </ul>
      </nav>
    </main>
  )
}