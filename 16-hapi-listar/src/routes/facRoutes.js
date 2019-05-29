const BaseRoute = require("./base/baseRoutes");

class FACRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  listarFACS() {
    return {
      path: "/facs",
      method: "GET",
      handler: (request, headers) => {
        try {
          const { fac, skip, limit } = request.query;
          return this.db.read(fac, skip, limit);
        } catch (error) {
          console.error("Algo de ruim aconteceu", error);
          return "Erro no sistema";
        }
      }
    };
  }
}

module.exports = FACRoutes;
