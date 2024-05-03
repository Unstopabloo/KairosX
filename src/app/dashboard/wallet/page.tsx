import ListCard from '@/app/dashboard/wallet/_create_components/ListCard'
import AddIncomes from '@/app/dashboard/wallet/_create_components/AddIncome'
import AddGastos from '@/app/dashboard/wallet/_create_components/AddGasto'

import { getGastos, getTotalGastos } from '@/server/Gastos/getGastos'
import { getIngresos, getTotalIngresos } from '@/server/Ingresos/getIngresos'

import { inter } from '@/lib/fonts'

export default async function Wallet() {
    const ingresos = await getIngresos()
    const gastos = await getGastos()

    const totalIngresos = await getTotalIngresos()
    const totalGastos = await getTotalGastos()

    let resto

    if (totalIngresos && totalGastos) {
        resto = totalIngresos - totalGastos
    } else {
        resto = 0
    }

    const formatedTotalIngresos = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CLP'
    }).format(Number(totalIngresos))

    const formatedTotalGastos = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CLP'
    }).format(Number(totalGastos))

    const formatedResto = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CLP'
    }).format(Number(resto))

    return (
        <div>
            <header className='py-10 flex items-start justify-between'>
                <h1 className='font-bold text-3xl text-primary'>Wallet</h1>
                <div className='flex gap-6'>
                    <div className='min-w-44 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 py-3 px-6'>
                        <span className='text-white/60 text-sm font-semibold'>Ingresos</span>
                        <strong className={`text-white ${inter.className}`}>{formatedTotalIngresos}</strong>
                    </div>
                    <div className='min-w-44 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 py-3 px-6'>
                        <span className='text-white/60 text-sm font-semibold'>Gastos</span>
                        <strong className={`text-white ${inter.className}`}>{formatedTotalGastos}</strong>
                    </div>
                    <div className='min-w-44 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 py-3 px-6'>
                        <span className='text-white/60 text-sm font-semibold'>Resto</span>
                        <strong className={`text-white ${inter.className}`}>{formatedResto}</strong>
                    </div>
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