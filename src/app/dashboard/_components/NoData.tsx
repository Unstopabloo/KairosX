import { Button } from "@/ui/button"
import Link from "next/link"

export function NoData() {
    return (
        <section className="flex flex-col items-center gap-10 p-10 mt-32">
            <header className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-semibold">Aùn no hay proyectos ingresados</h1>
                <p className="text-white/90">Comienza a controlar tus gastos e ingresos acá  🚀</p>
            </header>
            <Button asChild className="button-blob">
                <Link href="/dashboard/create">Comenzar</Link>
            </Button>
        </section >
    )
}

export function NoGastosData() {
    return (
        <section className="flex flex-col items-center gap-10 p-10 mt-32">
            <header className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-semibold">Aùn no hay Gastos proyectados</h1>
                <p className="text-white/90">Añade un gasto para proyectar tus oportunidades  🚀</p>
            </header>
            <Button asChild className="button-blob">
                <Link href="/dashboard/create">Comenzar</Link>
            </Button>
        </section >
    )
}

export function NoIngresosData() {
    return (
        <section className="flex flex-col items-center gap-10 p-10 mt-32">
            <header className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-semibold">Aùn no hay ingresos añadidos</h1>
                <p className="text-white/90">Añade ingresos para comenzar a proyectar tus ganancias  🚀</p>
            </header>
            <Button asChild className="button-blob">
                <Link href="/dashboard/create">Comenzar</Link>
            </Button>
        </section >
    )
}