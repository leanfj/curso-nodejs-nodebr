const Sequelize = require("sequelize");

const DRIVER = new Sequelize("facs", "leanfj", "senhasecreta", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorAliases: false
});

async function main() {
  const Facs = DRIVER.define(
    "facs",
    {
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
    {
      tableName: "TB_FACS",
      freezeTableName: false,
      timestamps: false
    }
  );

  await Facs.sync();
  await Facs.create({
    fac: 999999,
    category: 30
  });
  const result = await Facs.findAll({ raw: true });

  console.log("Resultado", result);
}

main();
