const socket = io();
const tablaSensores = document.querySelector('#tabla-sensores');

socket.on('db:newData', (elementoNuevo) => {
    const filaElemento = document.createElement('tr');
    const celdaProx = document.createElement('th');
    const celdaTemp = document.createElement('th');
    const celdaTimestamp = document.createElement('th');

    celdaProx.innerHTML = elementoNuevo.sensor_prox;
    celdaTemp.innerHTML = elementoNuevo.sensor_calor;
    celdaTimestamp.innerHTML = elementoNuevo.timestamp;

    filaElemento.appendChild(celdaProx);
    filaElemento.appendChild(celdaTemp);
    filaElemento.appendChild(celdaTimestamp);

    tablaSensores.appendChild(filaElemento);
});