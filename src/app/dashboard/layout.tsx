import Link from "next/link";
import { Wallet, User, LucideFlag, Hexagon, LayoutDashboard, LogOut } from 'lucide-react';

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center p-6 text-white h-screen overflow-hidden">
      <div className="container flex-1">
        {children}
      </div>
      <nav className="p-6 font-semibold flex items-center justify-center gap-10">
        <ul className="bg-gray-800/80 border border-gray-600/50 flex items-center gap-5 px-5 py-1 rounded-lg [&>li]:list-none [&>li]:p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard"}>
                  <LayoutDashboard size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard/wallet"}>
                  <Wallet size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Wallet</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard/goals"}>
                  <LucideFlag size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Metas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <LogoutLink className="w-full hover:bg-primary hover:text-black p-2 rounded-lg">
                  <LogOut size={22} />
                </LogoutLink>
              </TooltipTrigger>
              <TooltipContent>
                <p>Salir</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ul>
      </nav>
    </main>
  )
}