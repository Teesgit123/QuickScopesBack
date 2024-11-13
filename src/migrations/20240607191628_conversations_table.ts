import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("conversations", (table) => {
    table.increments("conversationId").primary();
    table.integer('user1Id').unsigned().notNullable();
    table.integer('user2Id').unsigned().notNullable();
    table.timestamps(true, true);

    table.foreign('user1Id').references('userId').inTable('users').onDelete('CASCADE');
    table.foreign('user2Id').references('userId').inTable('users').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('conversations');
}

