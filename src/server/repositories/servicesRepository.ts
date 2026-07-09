import type { Insertable, Updateable } from "kysely";
import { db } from "../db/database";
import type { ServicesTable } from "../db/types";

export const listByUser = (userId: string) =>
  db
    .selectFrom("services")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("name")
    .execute();

export const findByIdForUser = (id: number, userId: string) =>
  db
    .selectFrom("services")
    .selectAll()
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .executeTakeFirst();

export const create = (service: Insertable<ServicesTable>) =>
  db
    .insertInto("services")
    .values(service)
    .returningAll()
    .executeTakeFirstOrThrow();

export const updateForUser = (
  id: number,
  userId: string,
  data: Updateable<ServicesTable>,
) =>
  db
    .updateTable("services")
    .set(data)
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .returningAll()
    .executeTakeFirst();

export const removeForUser = (id: number, userId: string) =>
  db
    .deleteFrom("services")
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .returningAll()
    .executeTakeFirst();
