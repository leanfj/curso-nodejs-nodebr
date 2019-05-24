const Hapi = require("hapi");

// Importação de banco de dados
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const FacSchema = require("./db/strategies/mongodb/schemas/facSchema");

// Importação das rotas
const FACRoute = require("./routes/facRoutes");

// Inicialização da aplicação
const app = new Hapi.Server({ port: 5000 });

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

module.exports = (async function main() {
  const connnectionMongoDB = MongoDB.connect();
  const mongoDBContext = new Context(
    new MongoDB(connnectionMongoDB, FacSchema)
  );

  // Injeção de rotas automaticamente
  app.route([...mapRoutes(new FACRoute(mongoDBContext), FACRoute.methods())]);

  await app.start();

  console.log(`Servidor rodando na porta ${app.info.port}`);

  return app;
})();
