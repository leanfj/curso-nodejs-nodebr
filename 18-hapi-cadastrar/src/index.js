const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb");
const PostgresDB = require("./db/strategies/postgresdb");

const contextMongoDB = new ContextStrategy(new MongoDB());

contextMongoDB.create();

const contextPostgresDb = new ContextStrategy(new PostgresDB());

contextPostgresDb.create();
