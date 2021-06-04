require("colors");
const inquirer = require("inquirer");

const menuOpts = [
  {
    type: "list",
    name: "opt",
    message: "Seleccione una opción",
    choices: [
      {
        value: "1",
        name: `${"1.".cyan} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".cyan} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".cyan} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".cyan} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".cyan} Completar tareas`,
      },
      {
        value: "6",
        name: `${"6.".cyan} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".cyan} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("\t\t\t=========================================".cyan);
  console.log("\t\t\t   BIENVENIDO, SELECCIONA UNA OPCIÓN     ".cyan);
  console.log("\t\t\t=========================================\n".cyan);

  const { opt } = await inquirer.prompt(menuOpts);
  return opt;
};

const pausaMenu = async () => {
  const pausaOpt = [
    {
      type: "input",
      name: "pause",
      message: "Seleccione cualquier tecla para continuar",
    },
  ];

  console.log("\n");
  await inquirer.prompt(pausaOpt);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "descri",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { descri } = await inquirer.prompt(question);
  return descri;
};

const listarBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    let idx = i + 1;
    return {
      value: tarea.id,
      name: `${idx.toString().cyan}. ${tarea.describe}`,
    };
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar tarea",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const {ok} = await inquirer.prompt(question);
  return ok;
};

const listarChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    let idx = i + 1;
    return {
      value: tarea.id,
      name: `${idx.toString().cyan} ${tarea.describe}`,
      checked: (tarea.completadoEn) ? true : false
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione la tarea a completar",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausaMenu,
  leerInput,
  listarBorrar,
  confirmar,
  listarChecklist
};
