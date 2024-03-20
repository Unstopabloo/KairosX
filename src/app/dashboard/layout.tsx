import Link from "next/link";
import { HomeIcon } from "@/ui/icons";
import { User, Settings } from 'lucide-react';

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center p-6 text-white h-screen overflow-hidden">
      <div className="flex-1">
        {children}
      </div>
      <nav className="p-6 font-semibold flex items-center justify-center gap-10">
        <ul className="nav-list bg-[rgba(13, 15, 14)] flex items-center gap-5 px-2 py-1 rounded-lg [&>li]:list-none [&>li]:p-2">
          <Link className="w-full hover:bg-[#7bf3a97a] p-2 rounded-lg" href={"/dashboard"}><HomeIcon /></Link>
          <LogoutLink className="w-full hover:bg-[#7bf3a97a] p-2 rounded-lg"><User size={25} /></LogoutLink>
          <Link className="w-full hover:bg-[#7bf3a97a] p-2 rounded-lg" href={"/dashboard"}><Settings size={25} /></Link>
        </ul>
        <Link href="/">Añadir</Link>
      </nav>
    </main>
  )
}