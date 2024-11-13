import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('rentals', (table) => {
        table.increments('rentalId').primary();
        table.integer('supplierId').unsigned().notNullable();
        table.foreign('supplierId').references('userId').inTable('users');
        table.integer('customerId').unsigned().notNullable();
        table.foreign('customerId').references('userId').inTable('users');
        table.integer('telescopeId').unsigned().notNullable();
        table.foreign('telescopeId').references('telescopeId').inTable('telescopes');
        table.integer('price').unsigned();
        table.boolean('wasReturned');
        table.dateTime('startDate');
        table.dateTime('endDate');
        table.timestamps(true, true);
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('rentals');
}

