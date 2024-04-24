import ListCard from './_create_components/ListCard'

import AddIncomes from './_create_components/AddIncome'

export default async function Create() {
    return (
        <div>
            <header className='py-10'>
                <h1 className='font-bold'>Proyecto de ahorro</h1>
            </header>
            <section className='flex justify-between gap-5'>
                <article className='w-full '>
                    <header className='flex items-center justify-between w-full'>
                        <h2 className='font-semibold text-white/90'>Ingresos</h2>
                        <AddIncomes />
                    </header>
                    <div className='flex flex-col gap-4 my-10'>
                        <ListCard />
                        <ListCard />
                        <ListCard />
                        <ListCard />
                    </div>
                </article>
                <div className='h-fit min-h-9 w-[1px] bg-white/50'></div>
                <article className='w-full'>
                    <header className='flex items-center justify-between w-full'>
                        <h2 className='font-semibold text-white/90'>Ingresos</h2>
                        <AddIncomes />
                    </header>
                    <div className='flex flex-col gap-4 my-10'>
                        <ListCard />
                        <ListCard />
                        <ListCard />
                        <ListCard />
                    </div>
                </article>
            </section>
        </div>
    )
}