const Sequelize = require("sequelize");

const facSchema = {
  name: "facs",
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    fac: {
      type: Sequelize.INTEGER,
      required: true
    },
    category: {
      type: Sequelize.INTEGER,
      required: true
    }
  },
  options: {
    tableName: "TB_FACS",
    freezeTableName: false,
    timestamps: false
  }
};

module.exports = facSchema;
