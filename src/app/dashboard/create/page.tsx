import ListCard from '@/app/dashboard/create/_create_components/ListCard'
import AddIncomes from '@/app/dashboard/create/_create_components/AddIncome'
import AddGastos from '@/app/dashboard/create/_create_components/AddGasto'

import { getGastos } from '@/server/Gastos/getGastos'
import { getIngresos } from '@/server/Ingresos/getIngresos'

export default async function Create() {
    const ingresos = await getIngresos()
    const gastos = await getGastos()

    return (
        <div>
            <header className='py-10'>
                <h1 className='font-bold'>Proyecto de ahorro</h1>
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
                                    icon={ingreso.icon}
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
                                    icon={gasto.icon}
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