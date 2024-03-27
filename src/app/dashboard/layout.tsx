import Link from "next/link";
import { HomeIcon } from "@/ui/icons";
import { Plus, User, AlignStartVertical, Hexagon } from 'lucide-react';

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center p-6 text-white h-screen overflow-hidden">
      <div className="flex-1">
        {children}
      </div>
      <nav className="p-6 font-semibold flex items-center justify-center gap-10">
        <ul className="bg-black-card border border-white/30 flex items-center gap-5 px-2 py-1 rounded-lg [&>li]:list-none [&>li]:p-2">
          <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard"}>
            <Hexagon size={25} />
          </Link>
          <LogoutLink className="w-full hover:bg-primary hover:text-black p-2 rounded-lg">
            <User size={25} />
          </LogoutLink>
          <Link className="w-full hover:bg-primary hover:text-black p-2 rounded-lg" href={"/dashboard"}>
            <AlignStartVertical size={25} />
          </Link>
        </ul>
        <Link className="bg-black-card border hover:bg-primary hover:shadow-md transition-shadow hover:shadow-primary hover:text-black rounded-lg p-3 border-white/30" href="/">
          <Plus size={25} />
        </Link>
      </nav>
    </main>
  )
}