"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface SmallMetaProps {
  name: string;
  goal: number;
}

interface BigMetaProps extends SmallMetaProps {
  start_at: Date;
  ends_at: Date;
}

export async function postBigMeta(values: BigMetaProps) {
  revalidateTag("bigMetas")

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

    const { rows, rowCount } = await sql`INSERT INTO metas (name, goal, start_at, ends_at, user_id, type) VALUES (${values.name}, ${values.goal}, ${start_at}, ${ends_at}, ${user_id}, 'principal')`;

    if (rowCount === 0) {
      return null
    }

    return rows
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function postSmallMeta(values: SmallMetaProps) {
  revalidateTag("smallMetas")

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

    const date = new Date('2100-01-01');
    const postgresDate = date.toISOString();

    const { rows, rowCount } = await sql`INSERT INTO metas (name, goal, user_id, type, ends_at) VALUES (${values.name}, ${values.goal}, ${user_id}, 'secundaria', ${postgresDate}) RETURNING *`;

    if (rowCount === 0) {
      return null
    }

    return rows
  } catch (e) {
    console.log(e);
    return null;
  }
}