import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { inter } from "@/lib/fonts"

export default async function DataCard() {
  return (
    <div className="button-blob flex flex-col justify-start items-start gap-2 px-5 py-4 text-gray-900 font-semibold bg-primary rounded-lg">
      <header className="flex justify-between items-center gap-10">
        <h3 className="text-gray-800 text-md">Ingresos Totales</h3>
        <Link href="/">
          <ChevronRight />
        </Link>
      </header>
      <section>
        <h2 className={`text-black font-semibold text-lg ${inter.className}`}>$950000 <small className="text-xs font-normal">/mo</small></h2>
      </section>
    </div>
  )
}