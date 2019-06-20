const { config } = require("dotenv");
const { join } = require("path");
const { ok } = require("assert");

const env = process.env.NODE_ENV || "dev";
ok(env === "prod" || env === "dev", "A env deve ser prod ou dev");

const configPath = join(__dirname, "./config", `.env.${env}`);

config({
  path: configPath
});

const Hapi = require("hapi");

const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const HapiSwagger = require("hapi-swagger");

const HapiJwt = require("hapi-auth-jwt2");

// Importação de banco de dados
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const FacSchema = require("./db/strategies/mongodb/schemas/facSchema");
const Postgress = require("./db/strategies/postgresdb/postgresdb");
const UserSchema = require("./db/strategies/postgresdb/schemas/userSchema");

// Importação das rotas
const FACRoute = require("./routes/facRoutes");
const AuthRoute = require("./routes/authRoutes");

const JWT_SECRET = process.env.JWT_SECRET;

// Inicialização da aplicação
const app = new Hapi.Server({ port: process.env.PORT });

//Mapeamento de rotas para injeção automatica
function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

module.exports = (async function main() {
  const connnectionMongoDB = MongoDB.connect();
  const mongoDBContext = new Context(
    new MongoDB(connnectionMongoDB, FacSchema)
  );

  const connectionPostgress = await Postgress.connect();
  const userModel = await Postgress.defineModel(
    connectionPostgress,
    UserSchema
  );

  const postgressContext = new Context(
    new Postgress(connectionPostgress, userModel)
  );

  const swaggerOptions = {
    info: {
      title: "API FAC",
      version: "1.0.0"
    }
  };
  //registro de plugins
  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  //Estrategia de verificação de autorização

  const validate = async function(decoded, request) {
    // do your checks to see if the person is valid
    const username = decoded.username;

    const result = await postgressContext.read({ username });

    if (!result) {
      return { isValid: false };
    } else {
      return { isValid: true };
    }
  };
  app.auth.strategy("jwt", "jwt", {
    key: JWT_SECRET,
    validate: validate
  });

  app.auth.default("jwt");
  // Injeção de rotas automaticamente
  app.route([
    ...mapRoutes(new FACRoute(mongoDBContext), FACRoute.methods()),
    ...mapRoutes(
      new AuthRoute(JWT_SECRET, postgressContext),
      AuthRoute.methods()
    )
  ]);

  await app.start();

  console.log(`Servidor rodando na porta ${app.info.port}`);

  return app;
})();
