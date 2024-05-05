"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function deleteMeta(id: number) {
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

    await sql`DELETE FROM contribuciones_metas WHERE metas_id = ${id}`;
    await sql`DELETE FROM metas WHERE id = ${id} AND user_id = ${user_id}`;

    revalidateTag('metas')
  } catch (e) {
    console.log(e);
    return null;
  }
}