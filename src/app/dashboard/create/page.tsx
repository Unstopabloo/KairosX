import ListCard from '@/app/dashboard/create/_create_components/ListCard'
import AddIncomes from '@/app/dashboard/create/_create_components/AddIncome'
import AddGastos from '@/app/dashboard/create/_create_components/AddGasto'

import { getGastos, getTotalGastos } from '@/server/Gastos/getGastos'
import { getIngresos, getTotalIngresos } from '@/server/Ingresos/getIngresos'

import { inter } from '@/lib/fonts'

export default async function Create() {
    const ingresos = await getIngresos()
    const gastos = await getGastos()

    const totalIngresos = await getTotalIngresos()
    const totalGastos = await getTotalGastos()

    const formatedTotalIngresos = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CLP'
    }).format(Number(totalIngresos))

    const formatedTotalGastos = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CLP'
    }).format(Number(totalGastos))

    return (
        <div>
            <header className='py-10 flex items-center justify-between'>
                <h1 className='font-bold'>Proyecto de ahorro</h1>
                <div className='flex gap-16'>
                    <span className='text-white/70 flex items-center gap-3'>Ingresos totales: <strong className={`text-white ${inter.className}`}>{formatedTotalIngresos}</strong></span>
                    <span className='text-white/70 flex items-center gap-3'>Gastos totales: <strong className={`text-white ${inter.className}`}>{formatedTotalGastos}</strong></span>
                </div>
            </header>
            <section className='flex justify-between gap-14'>
                <article className='w-full'>
                    <header className='flex items-center justify-between w-full'>
                        <h2 className='font-semibold text-white/90'>Ingresos</h2>
                        <AddIncomes />
                    </header>
                    <div className='flex flex-col gap-5 my-10 py-8 max-h-[38rem] overflow-x-hidden overflow-y-auto'>
                        {
                            ingresos && ingresos.map(ingreso => {
                                return <ListCard
                                    key={ingreso.id}
                                    id={ingreso.id}
                                    name={ingreso.name}
                                    value={ingreso.value}
                                    comes_from={ingreso.comes_from}
                                    icon={ingreso.category_id}
                                    isActive={ingreso.isactive}
                                    type='ingreso'
                                />
                            })
                        }
                    </div>
                </article>
                <div className='h-fit min-h-72 w-[1px] bg-white/50'></div>
                <article className='w-full'>
                    <header className='flex items-center justify-between w-full'>
                        <h2 className='font-semibold text-white/90'>Gastos</h2>
                        <AddGastos />
                    </header>
                    <div className='flex flex-col gap-4 my-10 py-8 max-h-[38rem] overflow-x-hidden overflow-y-auto'>
                        {
                            gastos && gastos.map(gasto => {
                                return <ListCard
                                    key={gasto.id}
                                    id={gasto.id}
                                    name={gasto.name}
                                    value={gasto.value}
                                    comes_from={gasto.comes_from}
                                    icon={gasto.category_id}
                                    isActive={gasto.isactive}
                                    type='gasto'
                                />
                            })
                        }
                    </div>
                </article>
            </section>
        </div>
    )
}