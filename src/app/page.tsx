import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Image from "next/image";
import { Button } from "@/ui/button";
import Link from "next/link";
import Grid from "@/public/grid.svg"
import Moon from "@/public/moon.png"
import Moon2 from "@/public/moon2.png"
import Moon3 from "@/public/moon3.png"
import Moon4 from "@/public/moon4.png"
import GodRays from "@/public/poli.png"
import Peloti from "@/public/re.webp"

export default function Login() {
  return (
    <main className="container mx-auto p-4 text-white flex flex-col gap-20 items-center justify-center h-screen overflow-x-hidden overflow-y-hidden relative">
      <Image
        className="absolute -top-48 left-1/2 transform -translate-x-1/2 -z-10"
        src={Grid}
        alt="Grid"
        width={948}
        height={948}
      />
      <Image
        className="absolute right-0 top-10 -z-10 floating-vertical"
        src={Moon}
        alt="Moon asset"
        width={108}
        height={108}
      />
      <Image
        className="absolute right-0 bottom-24 -z-10 floating-vertical"
        src={Moon2}
        alt="Moon asset"
        width={60}
        height={60}
      />
      <Image
        className="absolute left-0 top-50 -z-10 floating-vertical"
        src={Moon3}
        alt="Moon asset"
        width={33}
        height={33}
      />
      <Image
        className="absolute left-96 top-10 -z-10 floating-vertical"
        src={Moon4}
        alt="Moon asset"
        width={19}
        height={19}
      />
      <Image
        className="absolute -bottom-[550px] left-1/2 transform -translate-x-1/2 -z-10"
        src={GodRays}
        alt="God rays asset"
        width={1270}
        height={1270}
      />
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl font-bold max-w-[680px] text-center">Crece con inteligencia, prospera con <strong className="text-primary">KairosX</strong></h1>
        <p className="text-white/80 px-10 max-w-[680px] text-center">KairosX es la herramienta de gestión financiera más intuitiva, segura y eficaz para el programador moderno. Te permite tomar el control de tu dinero, aprovechar al máximo cada momento y alcanzar tus metas financieras con mayor rapidez.</p>
      </div>
      <Button asChild className="button-blob font-semibold text-black text-lg rounded-lg px-12">
        <LoginLink>Ingresar</LoginLink>
      </Button>
    </main>
  );
}
