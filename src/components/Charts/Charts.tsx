import { MainChart } from './MainChart';
import { getIngresosEscential } from '@/server/Ingresos/getIngresos';
import { getGastosEscential } from '@/server/Gastos/getGastos';
import Advise from './Advise';

export default async function Charts() {
  const ingresos = await getIngresosEscential();
  const gastos = await getGastosEscential();

  return (
    <section className="bg-gray-800/80 flex flex-col gap-10 border border-gray-600 h-full rounded-lg p-6">
      <MainChart dataIngresos={ingresos} dataGastos={gastos} />
      <Advise ingresos={ingresos} gastos={gastos} />
    </section>
  )
}

