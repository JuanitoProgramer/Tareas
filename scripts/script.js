
import { filtrar } from "./filtrar.js";
import { anadir } from "./localStorageTareas.js";
import { buscarLocal, checkear, reinicio, eliminarTarea, filtros } from "./tareaDom.js";


document.addEventListener('DOMContentLoaded', () => {
    filtrar();
    anadir();
    buscarLocal();
    checkear();
    reinicio();
    eliminarTarea();
    filtros();
});