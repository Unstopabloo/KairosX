'use client'

import { postSmallMeta } from "@/server/Metas/postMetas"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { Plus } from "lucide-react"
import { useState } from "react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  name: z.string({ message: "El nombre debe ser un texto" }).min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }).max(50, {
    message: "El nombre no puede tener más de 50 caracteres",
  }),
  goal: z.coerce.number({
    message: "El valor debe ser un número",
  }).int({
    message: "El valor debe ser un número entero",
  }).positive({
    message: "El valor debe ser un número positivo",
  }),
})

export default function AddBigGoal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      goal: undefined,
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    postSmallMeta(values)

    setIsOpen(false)
    form.reset({
      name: "",
      goal: undefined,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex gap-4 bg-transparent text-primary hover:text-black border border-primary">
          <span>Crear nueva meta secundaria</span>
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva meta secundaria</DialogTitle>
          <DialogDescription>
            Añade una nueva meta secundaria para tu proyecto.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Audifonos" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      El nombre que tendrá esta pequeña meta
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      La meta final a ahorrar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex w-full items-end">
                <DialogClose asChild>
                  <Button onClick={() => setIsOpen(!isOpen)} variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Crear</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}