const data = require('./data.js');
const { Menu } = require('electron')


module.exports = { geraTray }

function geraTray(){

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
      type: 'radio'
    }
    template.push(menuItem)
  });
  console.log(template)

return template

}