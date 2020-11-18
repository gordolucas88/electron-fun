const { app, BrowserWindow } = require('electron')

// Variavel app é responsavel pelo ciclo de vida da aplicação

app.on('ready', () => {
  console.log('Olá Aplication Started!');
  //Criando a janela inicial do menu da aplicação
  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400
  });
  //Carregando um site externo ou url ao abrir o aplicativo
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
})

// Encerra a aplicação ao fechar a janela
app.on('window-all-closed', () => {
  app.quit();
});