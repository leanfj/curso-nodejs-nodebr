const BaseRoute = require("./base/baseRoutes");

const joi = require("@hapi/joi");

const boom = require("@hapi/boom");

const jwt = require("jsonwebtoken");

const passwordHelper = require("./../helpers/passwordHelper");

class AuthRoute extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
  }

  login() {
    return {
      path: "/login",
      method: "POST",
      config: {
        auth: false,
        tags: ["api"],
        description: "Obter Token",
        notes: "Deve obeter token valido a partir de login e senha",
        validate: {
          payload: {
            username: joi.string().required(),
            password: joi.string().required()
          }
        }
      },
      handler: async request => {
        const { username, password } = request.payload;

        const [user] = await this.db.read({
          username: username.toLowerCase()
        });

        if (!user) {
          return boom.unauthorized("Usuário não cadastrado");
        }

        const match = await passwordHelper.comparePassword(
          password,
          user.password
        );

        if (!match) {
          return boom.unauthorized("Usuário ou senha inválida");
        }

        // if (
        //   username.toLowerCase() !== USER.username ||
        //   password !== USER.password
        // ) {
        //   return boom.unauthorized();
        // }

        const token = jwt.sign(
          {
            username,
            id: user.id
          },
          this.secret
        );

        return {
          token
        };
      }
    };
  }
}

module.exports = AuthRoute;
