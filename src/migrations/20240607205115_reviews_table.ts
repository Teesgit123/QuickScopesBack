import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("reviewId").primary();
    table.string("type");
    table.integer("supplierId").unsigned();
    table.foreign("supplierId").references("userId").inTable("users");
    table.integer("rentalId").unsigned();
    table.foreign("rentalId").references("rentalId").inTable("rentals");
    table.integer("rating").unsigned();
    table.string("comment", 255).notNullable();
    table.boolean("isRenter");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reviews");
}
