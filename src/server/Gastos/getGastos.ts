import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserId } from "@/server/Users/getUserId";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function getGastos() {
    revalidateTag('gastos')
    console.log('Gastos function called')

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

        const { rows, rowCount } = await sql`SELECT * FROM gastos WHERE user_id = ${user_id}`;

        if (rowCount === 0) {
            return null
        }

        return rows
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getTotalGastos(): Promise<number | null> {
    revalidateTag('gastos')

    console.log('Total Gastos function called')

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

        const { rows } = await sql`SELECT SUM(value) FROM gastos WHERE user_id = ${user_id}`;

        return rows[0].sum
    } catch (e) {
        console.log(e);
        return null;
    }
}
