"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface Gasto {
  name: string;
  value: number;
  comes_from: string;
  category_id: number;
  settled: Date;
  isActive: boolean;
  ending?: Date | undefined;
}

export async function postGasto(values: Gasto) {

  console.log('post ingresos function called')

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

    const settled = values.settled instanceof Date ? values.settled.toISOString() : values.settled;
    const ending = values.ending instanceof Date ? values.ending.toISOString() : values.ending;

    await sql`INSERT INTO gastos (name, value, comes_from, category_id, user_id, settled, isActive, ending) 
      VALUES (${values.name}, ${values.value}, ${values.comes_from}, ${values.category_id}, ${user_id}, ${settled}, ${values.isActive}, ${ending})`;

    revalidateTag('gastos')

  } catch (e) {
    console.log(e);
    return null;
  }
}