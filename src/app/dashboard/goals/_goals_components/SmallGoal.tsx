import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";

import { getSmallMetas } from "@/server/Metas/getMetas";
import BigContribution from "./BigContribution";
import ProgressBar from "./ProgressBar";

import { inter } from "@/lib/fonts";

export default async function SmallGoal() {
  const metas = await getSmallMetas();

  if (!metas) {
    return (
      <div className="flex items-center py-4">
        <p className="text-gray-300">No tienes metas financieras, comienza dando click al boton de abajo</p>
      </div>
    )
  }
  return (
    <>
      {
        metas.map(meta => (
          <div key={meta.id} className={`flex flex-col gap-4 ${meta.isdone && 'opacity-90'}`}>
            <div className="flex justify-between text-primary">
              <h3 className={`text-sm ${meta.isdone && 'line-through'}`}>{meta.name}</h3>
              <MoreVertical size={14} />
            </div>

            <ProgressBar goal={meta.goal} actual={meta.actual_amount} isdone={meta.isdone} />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="p-0">Meta final</TableCell>
                  <TableCell className={`py-1 text-right ${inter.className}`}>
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: 'CLP'
                    }).format(Number(meta.goal))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-0">Cantidad actual</TableCell>
                  <TableCell className={`py-1 text-right ${inter.className}`}>
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: 'CLP'
                    }).format(Number(meta.actual_amount))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-0">Cantidad restante</TableCell>
                  <TableCell className={`py-1 text-right ${inter.className}`}>
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: 'CLP'
                    }).format(Number(meta.left_amount))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-end">
              <BigContribution isdone={meta.isdone} id={meta.id} />
            </div>
            <div className="h-[1px] w-full bg-gray-600 my-2"></div>
          </div>
        ))
      }
    </>
  )
}