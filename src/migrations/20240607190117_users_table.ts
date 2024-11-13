import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("userId").primary();
    table.string("email", 255).notNullable().unique();
    table.string("username", 255).notNullable().unique();
    table.string("phoneNumber", 255).notNullable().unique();
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table.string("password").notNullable();
    table.boolean("isSupplier").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
