import { crearDom } from './tareaDom.js';
export function anadir() {
    let existe = localStorage.getItem('tareas');

    var tareas = [];

    const btnAnadir = document.querySelector('#anadir');

    btnAnadir.addEventListener('click', () => {

        var textoTarea = prompt('Escriba la Tarea: ');
        if (textoTarea == null || textoTarea == '') {
            console.log('NO añadio tarea');
        } else {
            let objeto = {
                id: '',
                texto: '',
                check: false
            };

            let idN = Date.now();
            objeto.id = idN;
            objeto.texto = textoTarea;



            if (existe == null) {
                tareas.push(objeto);
                localStorage.setItem('tareas', JSON.stringify(tareas));
            } else {
                let obtenerLocal = JSON.parse(localStorage.getItem('tareas'));
                obtenerLocal.push(objeto);

                localStorage.setItem('tareas', JSON.stringify(obtenerLocal));
            }

            crearDom(idN, textoTarea, false);

            let divNO = document.querySelector('.noHay');
            divNO.remove();
        }
    });


}

