"use server"

import { sql } from "@vercel/postgres";

interface PlanificacionProps {
  id?: string;
  user_id: string;
}

export async function getAllPlanificaciones({ user_id }: PlanificacionProps) {
  console.log('Getting all planificaciones')

  const result = await sql`SELECT * FROM planificaciones WHERE user_id = ${user_id}`
  console.log('Planificaciones', result)

  if (result.rowCount <= 0) {
    console.log('No planificaciones found')
    return
  }

  return result
}

export async function getPlanificacion({ id, user_id }: PlanificacionProps) {
  console.log('Getting planificacion')

  const result = await sql`SELECT * FROM planificaciones WHERE id = ${id} AND user_id = ${user_id}`
  console.log('Planificacion', result)

  if (result.rowCount < 0) {
    console.log('No planificacion found')
    return
  }

  return result
}