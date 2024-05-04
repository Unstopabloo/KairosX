import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";

import { getSmallMetas } from "@/server/Metas/getMetas";

export default async function SmallGoal() {
  const metas = await getSmallMetas();

  if (!metas) {
    return (
      <div className="flex items-center py-4">
        <p className="text-gray-300">No tienes metas financieras, comienza dando click al boton de abajo</p>
      </div>
    )
  }

  const progress = 66
  return (
    <>
      {
        metas && metas.map(meta => {
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-primary">
              <h3 className="text-sm">{meta.name}</h3>
              <MoreVertical size={14} />
            </div>

            <Progress value={progress} />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="p-0">Meta final</TableCell>
                  <TableCell className="py-1 text-right">{meta.goal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-0">Cantidad actual</TableCell>
                  <TableCell className="py-1 text-right">{meta.actual_amount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-0">Cantidad restante</TableCell>
                  <TableCell className="py-1 text-right">{meta.left_amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-end">
              <Button variant="link" className="text-xs">Hacer un pago</Button>
            </div>
            <div className="h-[1px] w-full bg-gray-600 my-2"></div>
          </div>
        })
      }
    </>
  )
}