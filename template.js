const data = require('./data.js');
const { Menu, ipcMain } = require('electron')


module.exports = {

 templateInicial: null,

 geraTray(win){

  let template = [{
    'label': 'Cursos'
  },
  {
    type: 'separator'
  }
];

  let cursos = data.listarCursos();
  cursos.forEach((curso) => {
    let menuItem = {
      label: curso,
      type: 'radio',
      click: () => {
        win.send('curso-trocado', curso)
      }
    }
    template.push(menuItem)
  });
  console.log(template)
  this.templateInicial = template
return template

},



adicionaCursoTray(nomeCurso, win){

  this.templateInicial.push({
    label: nomeCurso,
    type: 'radio',
    checked: true,
    click: () => {
      win.send('curso-trocado', nomeCurso)
    }
  })

  return this.templateInicial

},

  geraMenuTemplate(app){

    let templateMenu = [
      {
        label: "Window",
        submenu: [{
          role: 'minimize'
        },
        {
          role: 'close'
        }]
      },
      {
      label: "View",
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'toggledevtools'
        }
      ]
    },
      
      {
      label: 'Sobre',
      submenu: [
        {
          label: 'Sobre o Alura Timer',
          click: () => {
            ipcMain.emit('abrir-janela-sobre')
          },
          accelerator: 'F1'
        },
      ]
    }]
    
    if(process.platform === 'darwin'){
      
      templateMenu.unshift({
        label: app.getName(),
        submenu: [
          {
            label: "Menu MAC"
          }
    
        ]
      })
      
    }
    return templateMenu
  }
  

}