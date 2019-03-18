/*
00 - Obter usuário
01 - Obter numero de telefone a parter de um id
02 - Obter endereço
*/
const util = require("util");

const obterEndereAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      return resolve({
        id: 1,
        nome: "Leandro",
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      return resolve({
        tel: "24444567",
        ddd: "21"
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function() {
    return callback(null, {
      end: "Rua Logo Ali",
      numero: 21
    });
  }, 2000);
}

const usuarioPromise = obterUsuario();

usuarioPromise
  .then(function(usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: result
      };
    });
  })
  .then(function(resultado) {
    const endereco = obterEndereAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      };
    });
  })
  .then(function(resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome},
      Telefone:(${resultado.telefone.ddd}) ${resultado.telefone.tel},
      Endereço: ${resultado.endereco.end} ${resultado.endereco.numero}    
    `);
  })
  .catch(function(error) {
    console.error("Algo deu errado", error);
  });

// obterUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.error("Algo de errado no usuario", error);
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error("Algo de errado com telefone", error1);
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error("Algo de errado com endereço", error2);
//         return;
//       }
//       console.log(`
//         Nome: ${usuario.nome}
//         Endereço: ${endereco.end}, ${endereco.numero}
//         Telefon: (${telefone.ddd})${telefone.tel}
//       `);
//     });
//   });
// });

// const telefoneUsuario = obterTelefone(usuario.id);

// console.log("telefone", telefoneUsuario);
