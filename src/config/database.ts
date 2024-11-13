import Knex from "knex";
const knexConfig = require("../../knexfile");

const knex = Knex(knexConfig);

export default knex;
