export function crearDom(id, texto, checks) {
    let contenedorTareas = document.querySelector('.tareas');

    let tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');
    tareaDiv.dataset.id = `${id}`;

    let checkbox = document.createElement('div');
    checkbox.classList.add('check');

    let label = document.createElement('label');

    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox')
    input.checked = checks;

    let spanOff = document.createElement('span');
    spanOff.setAttribute('class', 'material-symbols-outlined off');
    spanOff.textContent = 'check_box_outline_blank';


    let spanOn = document.createElement('span');
    spanOn.setAttribute('class', 'material-symbols-outlined on');
    spanOn.textContent = 'check_box';


    let textoDiv = document.createElement('div');
    textoDiv.classList.add('content');
    textoDiv.textContent = texto;

    let eliminar = document.createElement('div');
    eliminar.classList.add('eliminar');

    let button = document.createElement('button');
    button.classList.add('btnEliminar');
    let spanEliminar = document.createElement('span');
    spanEliminar.setAttribute('class', 'material-symbols-outlined')
    spanEliminar.textContent = 'delete';



    button.append(spanEliminar);
    eliminar.append(button);

    label.append(input);
    label.append(spanOff);
    label.append(spanOn);



    checkbox.append(label);

    tareaDiv.append(checkbox);
    tareaDiv.append(textoDiv);
    tareaDiv.append(eliminar);

    contenedorTareas.append(tareaDiv);
}

export function buscarLocal() {
    let numeros = JSON.parse(localStorage.getItem('tareas'));
    if (numeros.length <= 0) {
        let contenedorTareas = document.querySelector('.tareas');
        let divNo = document.createElement('div');
        divNo.textContent = "No tienes tareas";
        divNo.classList.add('noHay');

        contenedorTareas.append(divNo);
    } else if (localStorage.getItem('tareas')) {
        let objetoLocal = JSON.parse(localStorage.getItem('tareas'));

        objetoLocal.forEach(element => {
            let id = element.id;
            let texto = element.texto;
            let check = element.check;
            crearDom(id, texto, check);
        });
    }
}



export function checkear() {
    let contenedorTareas = document.querySelector('.tareas');

    contenedorTareas.addEventListener('click', e => {
        let check = e.target.closest('input[type="checkbox"]');

        // 👉 Si NO se hizo click en un checkbox, salir
        if (!check) return;

        let padre = check.closest('.tarea');
        let dataId = Number(padre.dataset.id);

        let obtenerLocal = JSON.parse(localStorage.getItem('tareas')) || [];

        let encontrar = obtenerLocal.find(t => t.id === dataId);

        if (encontrar) {
            encontrar.check = !encontrar.check; // 👈 más limpio
        }

        localStorage.setItem('tareas', JSON.stringify(obtenerLocal));
    });
}


export function reinicio() {
    let boton = document.querySelector('#reiniciar');

    boton.addEventListener('click', () => {
        let obtenerLocal = JSON.parse(localStorage.getItem('tareas'));

        obtenerLocal.forEach(element => {
            element.check = false;
        });

        let contenedorTareas = document.querySelector('.tareas');
        contenedorTareas.innerHTML = '';


        localStorage.setItem('tareas', JSON.stringify(obtenerLocal));

        buscarLocal();
    });
}

export function eliminarTarea() {
    let contenedorTareas = document.querySelector('.tareas');
    contenedorTareas.addEventListener('click', e => {
        let boton = e.target.closest('.btnEliminar');
        if (boton) {
            var obtenerLocal = JSON.parse(localStorage.getItem('tareas'));

            var padre = boton.closest('.tarea');


            let atributo = Number(padre.getAttribute('data-id'))
            var idEncotrar = obtenerLocal.filter(elem => elem.id !== atributo);

            localStorage.setItem('tareas', JSON.stringify(idEncotrar));

            contenedorTareas.innerHTML = '';
            buscarLocal();
        }
    });
}

export function filtros() {
    let contenedorTareas = document.querySelector('.tareas');

    let todas = document.querySelector('#filtroTodas');
    let realizadas = document.querySelector('#filtroRealizadas');
    let porHacer = document.querySelector('#filtroPorHacer');

    let local = JSON.parse(localStorage.getItem('tareas'));

    if (local.length > 0) {

        todas.addEventListener('click', () => {
            let local = JSON.parse(localStorage.getItem('tareas'));
            contenedorTareas.innerHTML = '';

            local.forEach(element => {
                let id = element.id;
                let texto = element.texto;
                let check = element.check;
                crearDom(id, texto, check);
            });
        });

        realizadas.addEventListener('click', () => {
            let local = JSON.parse(localStorage.getItem('tareas'));
            let alguno = local.some(elem => elem.check == true);

            if (alguno) {
                contenedorTareas.innerHTML = '';
                let filtroT = local.filter(e => e.check == true);

                filtroT.forEach(element => {
                    let id = element.id;
                    let texto = element.texto;
                    let check = element.check;
                    crearDom(id, texto, check);
                });
            } else {
                contenedorTareas.innerHTML = '';
                let divNo = document.createElement('div');
                divNo.textContent = "No tienes tareas Realizadas";
                divNo.classList.add('noHay');

                contenedorTareas.append(divNo);
            }

        });

        porHacer.addEventListener('click', () => {
            let local = JSON.parse(localStorage.getItem('tareas'));
            contenedorTareas.innerHTML = '';
            let filtroT = local.filter(e => e.check == false);

            filtroT.forEach(element => {
                let id = element.id;
                let texto = element.texto;
                let check = element.check;
                crearDom(id, texto, check);
            });
        });
    }
}