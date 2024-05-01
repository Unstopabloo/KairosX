import DataCard from "@/components/DataCard";
import TableList from "@/components/TableList";
import ListItem from '@/components/ListItem';
import Charts from "@/components/Charts.tsx/Charts";
import { cookies } from "next/headers";

import { getGastos } from "@/server/Gastos/getGastos";
import { getIngresos } from "@/server/Ingresos/getIngresos";

import { NoData, NoGastosData, NoIngresosData } from "@/app/dashboard/_components/NoData";

export default async function Dashboard() {
  const user_id = cookies().get('user_id')?.value

  if (!user_id) {
    return <h1>Ups! no hay usuario activo por favor vuelve a iniciar sesión</h1>
  }

  const gastos = await getGastos();
  const ingresos = await getIngresos();

  const UF = async () => {
    const res = await fetch('https://api.sbif.cl/api-sbifv3/recursos_api/uf?apikey=b7079ed030b07907743f7a6af36c9954a5fb1ece&formato=json', {
      next: {
        revalidate: 3600
      }
    })
    const data = await res.json()
    const ufs = data.UFs[0]
    return ufs
  }

  const ufs = await UF()
  console.log(ufs)

  if (!gastos && !ingresos) {
    return <NoData />
  }

  if (!gastos) {
    return <NoGastosData />
  }

  if (!ingresos) {
    return <NoIngresosData />
  }

  const totalIngresos = ingresos?.reduce((acc, ingreso) => acc + ingreso.value, 0);
  const totalGastos = gastos?.reduce((acc, gasto) => acc + gasto.value, 0);

  return (
    <section className="flex gap-10 h-full">
      {
        gastos && ingresos && (
          <>
            <div className="flex flex-col gap-10">
              <section className="flex items-center gap-10">
                <DataCard type="Ingresos" amount={totalIngresos} />
                <DataCard type="Gastos" amount={totalGastos} />
                <DataCard type="UF" amount={ufs.Valor} />
              </section>
              <Charts />
            </div>
            <aside className="h-full flex flex-col justify-between gap-6">
              <TableList type="Ingresos Mensuales" >
                {
                  ingresos.map((ingreso) => (
                    <ListItem
                      key={ingreso.id}
                      text={ingreso.name}
                      incomeType={ingreso.isactive}
                      quantity={ingreso.value}
                    />
                  ))
                }
              </TableList>
              <TableList type="Gastos Mensuales" >
                {
                  gastos.map((gasto) => (
                    <ListItem
                      key={gasto.id}
                      text={gasto.name}
                      incomeType={gasto.isactive}
                      quantity={gasto.value}
                    />
                  ))
                }
              </TableList>
            </aside>
          </>
        )
      }
    </section>
  )
}