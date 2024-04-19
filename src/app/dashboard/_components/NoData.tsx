import { Button } from "@/ui/button"
import Link from "next/link"

export default function NoData() {
    return (
        <section className="flex flex-col items-center gap-10 p-10 mt-32">
            <header className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-semibold">Aùn no hay proyecto ingresados</h1>
                <p className="text-white/90">Comienza a controlar tus gastos e ingresos acá  🚀</p>    
            </header>
            <Button asChild className="button-blob">
                <Link href="/dashboard/create">Comenzar</Link>
            </Button>
        </section>
    )
}