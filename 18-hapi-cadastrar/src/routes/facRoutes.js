const BaseRoute = require("./base/baseRoutes");

const joi = require("@hapi/joi");

class FACRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  listarFACS() {
    return {
      path: "/facs",
      method: "GET",
      config: {
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          query: {
            skip: joi
              .number()
              .integer()
              .default(0),
            limit: joi
              .number()
              .integer()
              .default(10),
            fac: joi
              .number()
              .integer()
              .min(1)
              .max(999999)
          }
        }
      },
      handler: (request, headers) => {
        try {
          const { fac, skip, limit } = request.query;

          const query = fac ? { fac } : {};

          return this.db.read(query, skip, limit);
        } catch (error) {
          console.error("Algo de inesperado aconteceu", error);

          return "Erro interno do serviço";
        }
      }
    };
  }

  criarFAC() {
    return {
      path: "/facs",
      method: "POST",
      config: {
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          payload: {
            fac: joi.number().integer(),
            category: joi.number().integer()
          }
        }
      },
      handler: async (request, handlers) => {
        try {
          const { fac, category } = request.payload;
          const result = await this.db.create({ fac, category });
          return { result, message: "FAC cadastrada com sucesso" };
        } catch (error) {
          console.log("Algo de inesperado aconteceu", error);
          return "Erro interno do serviço";
        }
      }
    };
  }
}

module.exports = FACRoutes;
