const { v4: uuidv4 } = require("uuid"); // Generador de ID unicos

class Tarea {
  id = "";
  describe = "";
  completadoEn = null;

  constructor(describe) {
    this.id = uuidv4();
    this.describe = describe;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
