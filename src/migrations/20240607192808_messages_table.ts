import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("messages", (table) => {
    table.increments("messageId").primary();
    table.integer("senderId").unsigned().notNullable();
    table.string("messageContent").notNullable();
    table.integer("conversationId").unsigned().notNullable();
    table.timestamps(true, true);
    table.foreign("senderId").references("userId").inTable("users");
    table
      .foreign("conversationId")
      .references("conversationId")
      .inTable("conversations");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("messages");
}
