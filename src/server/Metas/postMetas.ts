"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface BigMetaProps {
  name: string;
  goal: number;
  start_at: Date;
  ends_at: Date;
}

export async function postBigMeta(values: BigMetaProps) {
  revalidateTag("bigMetas")
  console.log("postBigMeta")

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

    const start_at = values.start_at instanceof Date ? values.start_at.toISOString() : values.start_at;
    const ends_at = values.ends_at instanceof Date ? values.ends_at.toISOString() : values.ends_at;

    const { rows, rowCount } = await sql`INSERT INTO metas (name, goal, start_at, ends_at, user_id, type) VALUES (${values.name}, ${values.goal}, ${start_at}, ${ends_at}, ${user_id}, 'principal') RETURNING *`;

    console.log("rows", rows)
    if (rowCount === 0) {
      return null
    }

    return rows
  } catch (e) {
    console.log(e);
    return null;
  }
}