const {ipcRenderer} = require('electron');

const moment = require('moment');

let segundos;
let timer;
let tempo;

module.exports = {
  iniciar(elemento){

      tempo = moment.duration(elemento.textContent);
      segundos = tempo.asSeconds()
      clearInterval(timer)
      timer = setInterval(() => {
        segundos++;
        elemento.textContent = this.segundosParaTempo(segundos); 
    },1000);

  },
  
  segundosParaTempo(segundos){
      return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
  },



  parar(curso){
    let tempoEstudado = this.segundosParaTempo(segundos)
    ipcRenderer.send('curso-parado', curso, tempoEstudado);
    clearInterval(timer)
  }
}