"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface DeleteGastoProps {
  id: number;
}

export async function deleteGasto({ id }: DeleteGastoProps) {
  console.log('delete gasto function called')

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

    console.log('Deleting gasto with id:', id)

    await sql`DELETE FROM gastos WHERE id = ${id} AND user_id = ${user_id}`;

    revalidateTag('gastos')
  } catch (e) {
    console.log(e);
    return null;
  }
}