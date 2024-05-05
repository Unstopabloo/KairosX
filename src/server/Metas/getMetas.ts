"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function getBigMetas() {
  revalidateTag("bigMetas")
  revalidateTag("metas")

  try {
    const { getUser } = getKindeServerSession();

    const user = await getUser();
    if (!user) {
      throw new Error('No hay usuario');
    }

    const user_id = await getUserId();

    if (!user_id) {
      redirect("/")
    }

    const { rows, rowCount } = await sql`SELECT * FROM metas WHERE user_id = ${user_id} AND type = 'principal'`;

    // validar si cada meta ya supero el tiempo de finalizacion
    const now = new Date();
    rows.forEach(row => {
      if (new Date(row.ends_at) < now) {
        // actualizar la meta a finalizada
        sql`UPDATE metas SET isdone = true WHERE id = ${row.id} AND user_id = ${user_id} AND isdone = false`;
      }
    });

    // validar si cada meta ya supero el monto de la meta
    rows.forEach(row => {
      if (row.actual_amount >= row.goal) {
        // actualizar la meta a finalizada
        sql`UPDATE metas SET isdone = true WHERE id = ${row.id} AND user_id = ${user_id} AND isdone = false`;
      }
    });

    if (rowCount === 0) {
      return null
    }

    return rows
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getSmallMetas() {
  revalidateTag("smallMetas")
  revalidateTag("metas")
  console.log("getSmallMetas")

  try {
    const { getUser } = getKindeServerSession();

    const user = await getUser();
    if (!user) {
      throw new Error('No hay usuario');
    }

    const user_id = await getUserId();

    if (!user_id) {
      redirect("/")
    }

    const { rows, rowCount } = await sql`SELECT id, name, goal, actual_amount, left_amount FROM metas WHERE user_id = ${user_id} AND type = 'secundaria'`;

    if (rowCount === 0) {
      return null
    }

    return rows
  } catch (e) {
    console.log(e);
    return null;
  }
}