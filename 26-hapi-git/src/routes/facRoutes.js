const BaseRoute = require("./base/baseRoutes");

const joi = require("@hapi/joi");

const boom = require("@hapi/boom");

const headers = joi
  .object({
    authorization: joi.string().required()
  })
  .unknown();

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
        tags: ["api"],
        auth: "jwt",
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          headers,
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
      handler: async request => {
        try {
          const { fac, skip, limit } = request.query;

          const query = fac ? { fac } : {};

          return this.db.read(query, skip, limit);
        } catch (error) {
          return boom.badImplementation("Falha de implementação");
        }
      }
    };
  }

  criarFAC() {
    return {
      path: "/facs",
      method: "POST",
      config: {
        tags: ["api"],
        auth: "jwt",
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          headers,
          payload: {
            fac: joi.number().integer(),
            category: joi.number().integer()
          }
        }
      },
      handler: async request => {
        try {
          const { fac, category } = request.payload;
          const result = await this.db.create({ fac, category });
          return { result, message: "FAC cadastrada com sucesso" };
        } catch (error) {
          return boom.badImplementation("Falha de implementação");
        }
      }
    };
  }

  atualizarFAC() {
    return {
      path: "/facs/{id}",
      method: "PATCH",
      config: {
        tags: ["api"],
        auth: "jwt",
        validate: {
          params: {
            id: joi.string().required()
          },
          headers,
          payload: {
            fac: joi.number().integer(),
            category: joi.number().integer()
          }
        }
      },
      handler: async request => {
        try {
          const { id } = request.params;

          const { payload } = request;

          const dadoString = JSON.stringify(payload);

          const dados = JSON.parse(dadoString);

          const result = await this.db.update(id, dados);

          if (result.nModified !== 1) {
            return {
              ...result,
              message: "Não Foi possível atualizar"
            };
          }

          return {
            ...result,
            message: "FAC atualizada com sucesso"
          };
        } catch (error) {
          return boom.badImplementation("Falha de implementação");
        }
      }
    };
  }

  removerFAC() {
    return {
      path: "/facs/{id}",
      method: "DELETE",
      config: {
        tags: ["api"],
        auth: "jwt",
        validate: {
          params: {
            id: joi.string().required()
          },
          headers
        }
      },
      handler: async request => {
        try {
          const { id } = request.params;
          const result = await this.db.remove(id);
          if (result.n === 0) {
            return boom.preconditionFailed("Não foi possível remover");
          }

          return {
            ...result,
            message: "FAC removida com sucesso"
          };
        } catch (error) {
          return boom.badImplementation("Falha de implementação");
        }
      }
    };
  }
}

module.exports = FACRoutes;
