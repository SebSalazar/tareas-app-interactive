const colors = require("colors");
const Tarea = require("./tarea");

class Tasks {
  _listado = {};

  get listArrray() {
    const infoArr = [];
    Object.keys(this._listado).forEach((key) => {
      infoArr.push(this._listado[key]);
    });
    return infoArr;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = ''){
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(data = []) {
    data.forEach((e) => {
      this._listado[e.id] = e;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea; // Inserta un elemento tarea al objeto
  }

  listCompleta() {
    console.log("\n");
    this.listArrray.forEach((tarea, i) => {
      const idt = `${i + 1}`.cyan;
      const { describe, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".cyan : "Pendiente".red;
      console.log(`<${idt}> ${describe} :: ${estado}`);
    });
  }

  listarCompletadas(completadas = true) {
    console.log("\n");
    this.listArrray.forEach((tarea, i) => {
      const idt = `${i + 1}`.cyan;
      const { describe, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".cyan : "Pendientes".red;
      if (completadas) {
        if (completadoEn) {
          console.log(`<${idt}> ${describe} :: ${completadoEn.cyan}`);
        }
      } else {
        if (!completadoEn) {
          console.log(`<(${idt}> ${describe} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas (ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }
    })

    this.listArrray.forEach(tarea => {
      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tasks;
