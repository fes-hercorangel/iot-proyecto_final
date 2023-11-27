const datoCalor = document.querySelector('#dato-calor');
const datoProx = document.querySelector('#dato-prox');
const datoTimestamp = document.querySelector('#dato-timestamp');

const socket = io()

socket.on('db:newData', (elementoNuevo) => {
    datoCalor.innerHTML = elementoNuevo.sensor_calor;
    datoProx.innerHTML = elementoNuevo.sensor_prox;
    datoTimestamp.innerHTML = elementoNuevo.timestamp;
});