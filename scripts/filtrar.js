export function filtrar() {
    const filtro = document.querySelector('#filtro');
    const despliegue = document.querySelector('#desplegar');


    filtro.addEventListener('click', () => {
        const estilo = getComputedStyle(despliegue).display;
        if (estilo == 'block') {
            despliegue.style.display = 'none';
        } else if (estilo == 'none') {
            despliegue.style.display = 'block';
        }
    });
}