import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash } from "lucide-react";

import { getBigMetas } from "@/server/Metas/getMetas";
import BigContribution from "./BigContribution";

import { format } from "@formkit/tempo"
import ProgressBar from "./ProgressBar";

import { inter } from "@/lib/fonts"
import DeleteGoal from "./DeleteGoal";

export default async function BigGoal() {
  const metas = await getBigMetas();

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
              <h3 className={`font-semibold text-lg ${meta.isdone && 'line-through'}`}>{meta.name}</h3>
              <DeleteGoal id={meta.id} />
            </div>
            <ProgressBar goal={meta.goal} actual={meta.actual_amount} isdone={meta.isdone} />
            <Table>
              <TableCaption>Datos de tu meta</TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell>Meta final</TableCell>
                  <TableCell className={`text-right ${inter.className}`}>
                    {
                      new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'CLP'
                      }).format(Number(meta.goal))
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad actual</TableCell>
                  <TableCell className={`text-right ${inter.className}`}>
                    {
                      new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'CLP'
                      }).format(Number(meta.actual_amount))
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad restante</TableCell>
                  <TableCell className={`text-right ${inter.className}`}>
                    {
                      new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'CLP'
                      }).format(Number(meta.left_amount))
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ultima contribucion</TableCell>
                  <TableCell className={`text-right ${inter.className}`}>
                    {
                      new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'CLP'
                      }).format(Number(meta.last_contribution))
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Comienzo</TableCell>
                  <TableCell className="text-right">
                    {format({
                      date: meta.start_at,
                      format: "long",
                      locale: "es-CL"
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de cumplimiento estimada</TableCell>
                  <TableCell className="text-right">
                    {format({
                      date: meta.ends_at,
                      format: "long",
                      locale: "es-CL"
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <BigContribution isdone={meta.isdone} id={meta.id} />
            </div>
            <div className="h-[1px] w-full bg-gray-600 my-6"></div>
          </div>
        ))
      }
    </>
  )
}