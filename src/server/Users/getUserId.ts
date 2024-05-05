import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserId() {
    try {
        const { getUser } = getKindeServerSession();
        const kinde_user = await getUser();

        if (!kinde_user) {
            throw new Error('No hay usuario de kinde');
        }

        const kinde_id = kinde_user.id;

        const { rows } = await sql`SELECT id FROM users WHERE kinde_id = ${kinde_id}`;

        if (!rows) {
            throw new Error('No hay usuario en bbdd');
        }

        return rows[0].id;
    } catch (e) {
        console.log(e);
        return null;
    }

}