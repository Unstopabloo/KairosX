'use client'

import { postBigMeta } from "@/server/Metas/postMetas"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

import { CalendarIcon, Plus } from "lucide-react"
import { useState } from "react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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
  start_at: z.date({
    message: "Debes ingresar una fecha de inicio",
  }),
  ends_at: z.date({
    message: "Debes ingresar una fecha de inicio",
  }),
})

export default function AddBigGoal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inicio, setInicio] = useState<Date | undefined>(new Date())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      goal: undefined,
      start_at: undefined,
      ends_at: undefined,
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    postBigMeta(values)

    setIsOpen(false)
    form.reset({
      name: "",
      goal: undefined,
      start_at: undefined,
      ends_at: undefined,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex gap-4 bg-transparent text-primary hover:text-black border border-primary">
          <span>Crear nueva meta principal</span>
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva meta principal</DialogTitle>
          <DialogDescription>
            Añade una nueva meta principal para tu proyecto.
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
                      <Input placeholder="Auto" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      El nombre que tendrá esta meta principal.
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
                        placeholder="1000000"
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
              <FormField
                control={form.control}
                name="start_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de inicio</FormLabel>
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
                          onSelect={(date) => {
                            field.onChange(date)
                            setInicio(date)
                          }}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Esta es la fecha en la que comenzarás a ahorrar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ends_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de termino</FormLabel>
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
                            date < new Date() || date < new Date("1900-01-01") || date < (inicio ?? new Date())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Esta es la fecha en la que terminara tu meta de ahorro.
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