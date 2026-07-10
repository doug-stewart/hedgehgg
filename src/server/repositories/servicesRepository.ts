import { type Insertable, sql, type Updateable } from "kysely";
import { db } from "../db/database";
import type { ServicesTable } from "../db/types";

export const listByUser = (userId: string) =>
  db
    .selectFrom("services")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("sort_order")
    .orderBy("id")
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
    .values({
      ...service,
      sort_order: sql<number>`(select coalesce(max(sort_order) + 1, 0) from services where user_id = ${service.user_id})`,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

export const updateForUser = (id: number, userId: string, data: Updateable<ServicesTable>) =>
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

export const reorderForUser = async (userId: string, ids: number[]) => {
  if (ids.length === 0) return;

  await db
    .updateTable("services")
    .set((builder) => {
      let sortOrder = builder.case("id").when(ids[0]).then(0);
      for (let position = 1; position < ids.length; position++) {
        sortOrder = sortOrder.when(ids[position]).then(position);
      }
      return { sort_order: sortOrder.else(builder.ref("sort_order")).end() };
    })
    .where("user_id", "=", userId)
    .where("id", "in", ids)
    .execute();
};
