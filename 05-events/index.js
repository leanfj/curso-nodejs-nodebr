const evetnEmiter = require("events");

class MeuEmissor extends evetnEmiter {}

const emissor = new MeuEmissor();

const evento = "Usuário: Click";

emissor.on(evento, function(click) {
  console.log("Usuário clicou", click);
});

emissor.emit(evento, "na barra de rolagem");
emissor.emit(evento, "no menu");

// let contador = 0;

// setInterval(function() {
//   emissor.emit(evento, "no botão " + contador++);
// }, 1000);

const stdin = process.openStdin();

// Promise ideal para um unica manipulação do dado
// Event emitter funciona bem para monitorar eventos repetitivos
function main() {
  return new Promise(function(resolve, reject) {
    stdin.addListener("data", function(valor) {
      // console.log(`Você digitou: ${valor.toString().trim()}`);
      return resolve(valor);
    });
  });
}

main().then(function(resultado) {
  console.log(`Resulatado é ${resultado.toString()}`);
});
