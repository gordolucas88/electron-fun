const { app, BrowserWindow, ipcMain } = require("electron");

// Variavel app é responsavel pelo ciclo de vida da aplicação

app.on("ready", () => {
  console.log("Olá Aplication Started!");
  //Criando a janela inicial do menu da aplicação
  let mainWindow = new BrowserWindow({
    webPreferences: {
      /* Necesssario ter isso, para usar require no browser */
      nodeIntegration: true,
    },
    width: 600,
    height: 400,
  });
  //Carregando um site externo ou url ao abrir o aplicativo
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

// Encerra a aplicação ao fechar a janela
app.on("window-all-closed", () => {
  app.quit();
});

let aboutWindow = null;

ipcMain.on("open-about-window", () => {
  if (aboutWindow === null) {
    aboutWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 300,
      height: 200,
      alwaysOnTop: true,
      // frame desabilita o cabecalho da janela
      frame: false,
    });
    // Adicionado evento para a variavel nao ser destruida pelo garbage collector
    // para assim, toda vez que clicarmos para abrir a Janela, ela ira abrir novamente
    aboutWindow.on('closed', () => {
      aboutWindow = null
    })

    aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
  }
});

ipcMain.on('close-about-window', () => {
  aboutWindow.close();
});