const BaseRoute = require("./base/baseRoutes");

const joi = require("@hapi/joi");

const boom = require("@hapi/boom");

const jwt = require("jsonwebtoken");

const USER = {
  userName: "leanfj",
  password: "123"
};

class AuthRoute extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret;
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
            userName: joi.string().required(),
            password: joi.string().required()
          }
        }
      },
      handler: async request => {
        const { userName, password } = request.payload;
        if (
          userName.toLowerCase() !== USER.userName ||
          password !== USER.password
        ) {
          return boom.unauthorized();
        }

        const token = jwt.sign(
          {
            userName,
            id: 1
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
