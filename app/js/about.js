const {ipcRenderer, shell} = require('electron');
const process = require('process');

let linkClose = document.querySelector("#link-close");
let linkGitHub = document.querySelector('#link-git');
let electronVersion = document.querySelector('#electron-version');

window.onload = function() {
  electronVersion.textContent = process.versions.electron;
}

linkGitHub.addEventListener('click', function() {
//Faz abrir o link externamente
  shell.openExternal("https://github.com/gordolucas88/")
})

linkClose.addEventListener('click', function() {

  ipcRenderer.send('close-about-window')


})