import DataCard from "@/components/DataCard";
import Link from "next/link";
import TableList from "@/components/TableList";
import ListItem from '@/components/ListItem';
import Charts from "@/components/Charts.tsx/Charts";
import { cookies } from "next/headers";

import { getAllPlanificaciones } from "@/server/Planificaciones/getPlanificaciones";

export default async function Dashboard() {
  const user_id = cookies().get('user_id')?.value

  if (!user_id) {
    return <h1>Ups! no hay usuario activo por favor vuelve a iniciar sesión</h1>
  }

  const planificaciones = await getAllPlanificaciones({ user_id });
  return (
    <section className="flex gap-10 h-full">
      {
        planificaciones ? (
          <>
            <div className="flex flex-col gap-10">
              <section className="flex items-center gap-10">
                <DataCard type="Ingresos" amount={950000} />
                <DataCard type="Gastos" amount={300000} />
                <DataCard type="UF" amount={150000} />
              </section>
              <Charts />
            </div>
            <aside className="h-full flex flex-col justify-between gap-6">
              <TableList type="Ingresos Mensuales" >
                <ListItem text="Creacion de contenido" incomeType='Activo' quantity={55000} />
                <ListItem text="Dividendos" incomeType='Pasivo' quantity={15000} />
                <ListItem text="Trabajo" incomeType='Activo' quantity={850000} />
                <ListItem text="Dividendos" incomeType='Pasivo' quantity={15000} />
              </TableList>
              <TableList type="Gastos Mensuales" >
                <ListItem text="Creacion de contenido" incomeType='Activo' quantity={55000} />
                <ListItem text="Dividendos" incomeType='Pasivo' quantity={15000} />
                <ListItem text="Creacion de contenido" incomeType='Activo' quantity={55000} />
                <ListItem text="Trabajo" incomeType='Activo' quantity={850000} />
              </TableList>
            </aside>
          </>
        ) : (
          <h1>No hay planificaciones</h1>
        )
      }
    </section>
  )
}