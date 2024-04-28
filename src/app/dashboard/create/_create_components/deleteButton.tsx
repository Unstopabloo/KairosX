"use client"

import { Button } from "@/components/ui/button"
import { deleteGasto } from "@/server/Gastos/deleteGasto";
import { deleteIngreso } from "@/server/Ingresos/deleteIngreso"
import { Trash } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteButtonProps {
  id: number;
  type: "ingreso" | "gasto";
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => {
          setIsOpen(!isOpen)
        }} variant="destructive" className='size-8' size="icon">
          <Trash size={17} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro de eliminar este elemento?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion es irreversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="submit" variant="destructive" className="flex items-center gap-2 bg-red-500 hover:bg-red-500/80 text-white"
              onClick={async () => {
                if (type === 'ingreso') {
                  await deleteIngreso({ id })
                  setIsOpen(!isOpen)
                } else {
                  await deleteGasto({ id })
                  setIsOpen(!isOpen)
                }
              }}
            >
              Eliminar <Trash size={14} />
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}