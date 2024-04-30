"use client"

import { postGasto } from "@/server/Gastos/postGasto"

import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

import { Plus, CalendarIcon, Lamp, Apple, Gamepad2, Shirt, Sprout } from 'lucide-react'

const formSchema = z.object({
  name: z.string({ message: "El nombre debe ser un texto" }).min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }).max(50, {
    message: "El nombre no puede tener más de 50 caracteres",
  }),
  value: z.coerce.number({
    message: "El valor debe ser un número",
  }).int({
    message: "El valor debe ser un número entero",
  }).positive({
    message: "El valor debe ser un número positivo",
  }),
  comes_from: z.string().min(3, {
    message: "La fuente debe tener al menos 3 caracteres",
  }).max(50, {
    message: "La fuente no puede tener más de 50 caracteres",
  }),
  category_id: z.coerce.number().int().positive(),
  isActive: z.boolean().default(true),
  settled: z.date(),
  ending: z.date().optional(),
})

export default function AddIncomes() {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: 0,
      comes_from: "",
      category_id: 1,
      isActive: isActive,
      settled: new Date(),
      ending: undefined,
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submitting form')
    const result = await postGasto(values)

    if (!result) {
      console.log('Algo ha ido mal')
      return
    }

    setIsOpen(false)
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añade un nuevo gasto</DialogTitle>
          <DialogDescription>
            Añadir una nueva entrada de gasto a tu proyecto de ahorro
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
                      <Input placeholder="Trabajo" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      El nombre que tendrá este gasto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1050000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      El dinero que saldra
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comes_from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuente</FormLabel>
                    <FormControl>
                      <Input placeholder="Sueldo" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      El origen de este gasto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">
                          <div className="flex items-center gap-3">
                            <Lamp size={15} /> Hogar
                          </div>
                        </SelectItem>
                        <SelectItem value="2">
                          <div className="flex items-center gap-3">
                            <Apple size={15} /> Comida
                          </div>
                        </SelectItem>
                        <SelectItem value="3">
                          <div className="flex items-center gap-3">
                            <Gamepad2 size={15} /> Entretenimiento
                          </div>
                        </SelectItem>
                        <SelectItem value="4">
                          <div className="flex items-center gap-3">
                            <Shirt size={15} /> Vestuario
                          </div>
                        </SelectItem>
                        <SelectItem value="5">
                          <div className="flex items-center gap-3">
                            <Sprout size={15} /> Inversion
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Icono que decorara al item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => setIsActive(!isActive)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        ¿Es un activo fijo?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {
                !isActive && (
                  <FormField
                    control={form.control}
                    name="ending"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha de cierre</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Selecciona una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Es calculada para ser eliminada automáticamente para hacer calculos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }
              <DialogFooter className="flex w-full items-end">
                <DialogClose asChild>
                  <Button onClick={() => setIsOpen(!isOpen)} variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button onClick={() => setIsOpen(!isOpen)} type="submit">Crear</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}