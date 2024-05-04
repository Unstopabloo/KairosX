import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

import { getBigMetas } from "@/server/Metas/getMetas";

export default async function BigGoal() {
  const metas = await getBigMetas();

  console.log(metas)

  if (!metas) {
    return (
      <div className="flex items-center py-4">
        <p className="text-gray-300">No tienes metas financieras, comienza dando click al boton de abajo</p>
      </div>
    )
  }

  const progress = 33

  return (
    <>
      {
        metas.map(meta => {
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-primary">
              <h3 className="font-semibold text-lg">{meta.name}</h3>
              <MoreVertical size={18} />
            </div>
            <Progress value={progress} />
            <Table>
              <TableCaption>Datos de tu meta</TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell>Meta final</TableCell>
                  <TableCell className="text-right">{meta.goal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad actual</TableCell>
                  <TableCell className="text-right">{meta.actual_amount ? meta.actual_amount : 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad restante</TableCell>
                  <TableCell className="text-right">{meta.left_amount ? meta.left_amount : 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ultima contribucion</TableCell>
                  <TableCell className="text-right">{meta.last_contribution ? meta.last_contribution : 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Promedio de contribuciones</TableCell>
                  <TableCell className="text-right">
                    {meta.contribution_balance ? meta.contribution_balance : 0} <span className="text-xs text-gray-400/90">/mo</span></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Comienzo</TableCell>
                  <TableCell className="text-right">{meta.start_at}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de cumplimiento estimada</TableCell>
                  <TableCell className="text-right">{meta.ends_at}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <Button>Hacer un pago</Button>
            </div>
          </div>
        })
      }
      <div className="h-[1px] w-full bg-gray-600 my-6"></div>
    </>
  )
}