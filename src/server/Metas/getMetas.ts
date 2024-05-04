"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function getBigMetas() {
  revalidateTag("bigMetas")
  console.log("getBigMetas")

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

    const { rows, rowCount } = await sql`SELECT name, goal, actual_amount, left_amount FROM metas WHERE user_id = ${user_id} AND type = 'secundaria'`;

    if (rowCount === 0) {
      return null
    }

    return rows
  } catch (e) {
    console.log(e);
    return null;
  }
}