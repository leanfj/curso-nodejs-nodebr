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

stdin.addListener("data", function(valor) {
  console.log(`Você digitou: ${valor.toString().trim()}`);
});
