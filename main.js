const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require("electron");
const data = require('./data.js');
const templateGenerator = require('./template.js');

let tray = null;

// Variavel app é responsavel pelo ciclo de vida da aplicação
let mainWindow = null;
app.on("ready", () => {
  console.log("Olá Aplication Started!");
  //Criando a janela inicial do menu da aplicação
  mainWindow = new BrowserWindow({
    webPreferences: {
      /* Necesssario ter isso, para usar require no browser */
      nodeIntegration: true,
    },
    width: 600,
    height: 400,
  });
  tray = new Tray(__dirname + '/app/img/icon-tray.png');
  let template = templateGenerator.geraTray(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template);

  tray.setContextMenu(trayMenu);

  globalShortcut.register('Ctrl+Space', () => {
    mainWindow.send('start-stop')
  });

  

  //Carregando um site externo ou url ao abrir o aplicativo
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

// Encerra a aplicação ao fechar a janela
app.on("window-all-closed", () => {
  app.quit();
});

let aboutWindow = null;

ipcMain.on("abrir-janela-sobre", () => {
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

    aboutWindow.loadURL(`file://${__dirname}/app/sobre.html`);
  }
});

ipcMain.on('fechar-janela-sobre', () => {
  aboutWindow.close();
});

ipcMain.on('curso-parado', (event,curso,tempoEstudado) =>{
  data.salvaDados(curso, tempoEstudado)


});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
  let novoTemplate = templateGenerator.adicionaCursoTray(novoCurso, mainWindow)

  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);

  tray.setContextMenu(novoTrayMenu);
})


let templateMenu = templateGenerator.geraMenuTemplate(app)
let menuPrincipal = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menuPrincipal)



