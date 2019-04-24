const commander = require("commander");

const dataBase = require("./database");

const FAC = require("./FAC");

async function main() {
  commander
    .version("v 1.0.0")
    .option("-F --fac [value]", "Numero da FAC")
    .option("-C --categoria [value]", "Categoria da FAC")
    .option("-I --id [value]", "ID da FAC")
    .option("-R --registrar", "Registrar nova FAC")
    .option("-L --listar", "Exibe FAC's registradas")
    .option("-D --deletar [value]", "Deleta FAC registrada")
    .option("-A --atualizar [value]", "Atualiza FAC registrada")
    .parse(process.argv);
  const commanderOptions = new FAC(commander);
  try {
    if (commander.registrar) {
      const result = await dataBase.registerFAC(commanderOptions);

      if (!result) {
        console.error("Erro ao cadastrar FAC");
        return;
      } else {
        console.log("FAC cadastrada com sucesso");
      }
    }
    if (commander.listar) {
      const result = await dataBase.listFACS();
      console.log(result);
      return;
    }
    if (commander.deletar) {
      const result = await dataBase.removeFAC(commander.deletar);
      if (!result) {
        console.error("Erro ao remover FAC", result);
        return;
      } else {
        console.log("FAC removida com sucesso");
      }
    }
    if (commander.atualizar) {
      const idToUpdate = parseInt(commander.atualizar);

      const data = JSON.stringify(commanderOptions);

      const dataToUpdate = JSON.parse(data);

      const result = await dataBase.updateFAC(idToUpdate, dataToUpdate);

      if (!result) {
        console.error("Não foi possível atualizar", result);
      } else {
        console.log("FAC atualizada com sucesso");
      }
    }
  } catch (error) {
    console.error("Algo de inesperado aconteceu", error);
  }
}

main();
