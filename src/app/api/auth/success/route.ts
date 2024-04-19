import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('Creating user')
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  const kinde_id = user.id;
  const username = user.given_name;
  const email = user.email;
  const avatar = user.picture;

  if (typeof user.id !== 'string') {
    throw new Error('Invalid id');
  }

  const findUser = await sql`SELECT * FROM users WHERE kinde_id = ${kinde_id}`;

  if (findUser.rowCount > 0) {
    console.log('User already exists, returning user');

    cookies().set('user_id', findUser.rows[0].id)
    return NextResponse.redirect(process.env.REDIRECT_ON_SUCCESS || 'http://localhost:3000/dashboard');
  }

  const result = await sql`INSERT INTO users (kinde_id, username, email, avatar) VALUES (${kinde_id}, ${username}, ${email}, ${avatar}) RETURNING *`;

  cookies().set('user_id', result.rows[0].id)
  return NextResponse.redirect(process.env.REDIRECT_ON_SUCCESS || 'http://localhost:3000/dashboard');
}
