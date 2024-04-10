import { sql } from "@vercel/postgres";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  console.log('Creating user')
  const { getUser } = getKindeServerSession();

  console.log('Getting user')

  const user = await getUser();
  const kinde_id = user?.id;
  const username = user?.given_name;
  const email = user?.email;
  const avatar = user?.picture;

  console.log('kinde_id', kinde_id)

  if (typeof user?.id !== 'string') {
    throw new Error('Invalid id');
  }

  const findUser = await sql`SELECT * FROM users WHERE kinde_id = ${kinde_id}`;

  if (findUser.rowCount > 0) {
    console.log('User already exists, returning user');
    return NextResponse.redirect('http://localhost:3000/dashboard');
  }

  const result = await sql`INSERT INTO users (kinde_id, username, email, avatar) VALUES (${kinde_id}, ${username}, ${email}, ${avatar}) RETURNING *`;

  console.log('User created successfully', result);
  return NextResponse.redirect('http://localhost:3000/dashboard');
}
