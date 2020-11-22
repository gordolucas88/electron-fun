const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = { criaArquivoJson, salvaDados,adionaTempoAoCurso, pegaDados };

function criaArquivoJson(nomeArquivo, conteudoArquivo) {
  return jsonfile
    .writeFile(nomeArquivo, conteudoArquivo, { spaces: 2 })
    .then(() => {
      console.log("Arquivo Criado");
    })
    .catch((err) => {
      console.log(err);
    });
}

function salvaDados(curso, tempoEstudado) {
  let arquivoDoCurso = __dirname + "/data/" + curso + ".json";
  if (fs.existsSync(arquivoDoCurso)) {
    this.adionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
  } else {
    this.criaArquivoJson(arquivoDoCurso, {}).then(() => {
      this.adionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
    });
  }
}

function adionaTempoAoCurso(arquivoDoCurso, tempoEstudado) {
  let dados = {
    ultimoEstudo: new Date().toString(),
    tempo: tempoEstudado,
  };

  jsonfile
    .writeFile(arquivoDoCurso, dados)
    .then(() => {
      console.log("Registro Salvo");
    })
    .catch((error) => {
      console.log(error);
    });
}

function pegaDados(curso) {
  let arquivoDoCurso = __dirname + "/data/" + curso + ".json"
  return jsonfile.readFile(arquivoDoCurso)
    
}