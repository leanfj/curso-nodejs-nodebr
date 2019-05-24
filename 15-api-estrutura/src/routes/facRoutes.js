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
        return this.db.read();
      }
    };
  }
}

module.exports = FACRoutes;
