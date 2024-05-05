'use client'

import { postContribucion } from "@/server/Metas/Contribuciones/postContribucion";

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

import { useState } from "react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  amount: z.coerce.number({
    message: "El valor debe ser un número",
  }).int({
    message: "El valor debe ser un número entero",
  }).positive({
    message: "El valor debe ser un número positivo",
  }),
})

export default function BigContribution({ id, isdone }: { id: any, isdone: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesWithId = {
      ...values,
      id
    }
    console.log(valuesWithId)

    postContribucion(valuesWithId)

    setIsOpen(false)
    form.reset({
      amount: undefined,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={isdone}>Contribuir</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contribucion</DialogTitle>
          <DialogDescription>
            Añade una nueva contribucion a tu proyecto de ahorro.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad a contribuir</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      La cantidad a contribuir debe ser un número entero y positivo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex w-full items-end">
                <DialogClose asChild>
                  <Button onClick={() => setIsOpen(!isOpen)} variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Contribuir</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}