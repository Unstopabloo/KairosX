"use server"

import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface ContribucionProps {
  id: any;
  amount: number;
}

export async function postContribucion(values: ContribucionProps) {
  revalidateTag("contribuciones")

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

    const id_meta = values.id;
    const { amount } = values;

    const { rows: validacion } = await sql`SELECT ends_at, goal, actual_amount FROM metas WHERE id = ${id_meta} AND user_id = ${user_id}`;
    const { ends_at, goal, actual_amount } = validacion[0];

    if (actual_amount + amount > goal) {
      throw new Error("La cantidad ingresada supera el monto de la meta");
    }

    if (new Date(ends_at) < new Date()) {
      throw new Error("La meta ya ha finalizado");
    }

    const { rows } = await sql`
      WITH new_contrib AS (
        INSERT INTO contribuciones (user_id, amount)
        VALUES (${user_id}, ${amount})
        RETURNING id, amount
      ), new_link AS (
        INSERT INTO contribuciones_metas (metas_id, contribuciones_id)
        SELECT ${id_meta}, id FROM new_contrib
        RETURNING *
      ), updated_meta AS (
        UPDATE metas
        SET actual_amount = actual_amount + (SELECT amount FROM new_contrib),
            left_amount = goal - actual_amount - (SELECT amount FROM new_contrib),
            last_contribution = (SELECT amount FROM new_contrib)
        WHERE id = ${id_meta}
        RETURNING *
      )
      SELECT * FROM updated_meta
    `;

    if (rows.length === 0) {
      return null;
    }

    revalidateTag("metas")
  } catch (e) {
    console.log(e);
    return null;
  }
}