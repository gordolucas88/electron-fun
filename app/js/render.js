
const { ipcRenderer } = require('electron');


let linkAbout = document.querySelector('#link-about');

linkAbout.addEventListener('click', function(){
// Solicitando ao Electron para abrir nova pagina
  ipcRenderer.send('open-about-window')

});