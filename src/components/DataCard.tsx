import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { inter } from "@/lib/fonts"

interface DataCardProps {
  type: string
  amount: number | undefined
}

export default async function DataCard({ type, amount }: DataCardProps) {

  let border
  if (type === 'Ingresos') {
    border = 'border-b-primary'
  } else if (type === 'Gastos') {
    border = 'border-b-[#FDCE95]'
  } else {
    border = 'border-b-[#1AEDC8]'
  }

  return (
    <div className={`bg-gray-800/80 border-b-4 min-w-56 ${border} flex flex-col justify-start items-start gap-2 px-5 py-4 text-white font-semibold rounded-lg`}>
      <header className="flex justify-between items-center w-full gap-10">
        <h3 className="text-white/80 text-sm">{type}</h3>
        <Link href="/">
          <ChevronRight />
        </Link>
      </header>
      <section className="w-full pe-3">
        <h2 className={`text-white w-full flex justify-between items-end font-semibold text-lg ${inter.className}`}>${amount ? amount : 0} <small className="text-[10px] text-white/80 font-normal">/mo</small></h2>
      </section>
    </div>
  )
}