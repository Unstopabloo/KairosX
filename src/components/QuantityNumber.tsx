import { inter } from "@/lib/fonts"

export default async function QuantityNumber({ quantity, className }: { quantity: number, className?: string }) {
  return <strong className={`${inter.className} font-bold text-base ${className}`}>${quantity}</strong>
}