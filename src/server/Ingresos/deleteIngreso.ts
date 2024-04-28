"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface DeleteIngresoProps {
  id: number;
}

export async function deleteIngreso({ id }: DeleteIngresoProps) {
  console.log('delete ingreso function called')

  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      redirect("/")
    }

    const user_id = await getUserId();
    if (!user_id) {
      redirect("/")
    }

    await sql`DELETE FROM ingresos WHERE id = ${id} AND user_id = ${user_id}`;

    revalidateTag('ingreso')
  } catch (e) {
    console.log(e);
    return null;
  }
}