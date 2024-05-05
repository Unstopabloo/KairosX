"use client"

import { Button } from "@/components/ui/button"
import { MoreVertical, Trash } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { deleteMeta } from "@/server/Metas/deleteMetas";

interface DeleteButtonProps {
  id: number;
}

export default function DeleteGoal({ id }: DeleteButtonProps) {
  const [isOpenAlert, setOpenAlert] = useState(false)

  const handlesend = async () => {
    console.log('eliminado')
    await deleteMeta(id)

    setOpenAlert(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex justify-between"
            onClick={() => {
              setOpenAlert(true)
            }}
          >
            <span>Eliminar</span> <Trash size={14} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <AlertDialog open={isOpenAlert} onOpenChange={() => setOpenAlert(!isOpenAlert)}>
        <AlertDialogTrigger className="hidden" onClick={() => setOpenAlert(true)}>
          <div className="hidden" />
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
              <Button
                variant="destructive"
                className="flex items-center gap-2 bg-red-500 hover:bg-red-500/80 text-white"
                onClick={handlesend}
              >
                Eliminar <Trash size={14} />
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  )
}