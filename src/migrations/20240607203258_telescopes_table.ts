import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("telescopes", (table) => {
    table.increments("telescopeId").primary();
    table.integer("supplierId").unsigned().notNullable();
    table.foreign("supplierId").references("userId").inTable("users");
    table.string("brand", 255).notNullable();
    table.string("focalLength", 255).notNullable();
    table.string("type", 255).notNullable();
    table.string("model", 255).notNullable();
    table.string("aperture", 255).notNullable();
    table.json("accessories").notNullable();
    table.specificType("location", "POINT").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("telescopes");
}
