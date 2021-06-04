require("colors");
const { guardarDB, leerDB } = require("./helpers/guardaInfo");
const {
  inquirerMenu,
  pausaMenu,
  leerInput,
  listarBorrar,
  confirmar,
  listarChecklist,
} = require("./helpers/inquirer");
const Tasks = require("./models/Tasks");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tasks();

  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción de la tarea:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listCompleta();
        break;
      case "3":
        tareas.listarCompletadas(true);
        break;
      case "4":
        tareas.listarCompletadas(false);
        break;
      case "5":
        const ids = await listarChecklist(tareas.listArrray);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listarBorrar(tareas.listArrray);
        const ok = await confirmar("¿Seguro quieres borrar esta tarea?");
        if (ok) {
          tareas.borrarTarea(id);
          console.log("Tarea borrada!");
        }
        break;
    }

    guardarDB(tareas.listArrray);

    await pausaMenu();
  } while (opt !== "0");
};

main();
