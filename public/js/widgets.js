const datoCalor = document.querySelector('#dato-calor');
const datoProx = document.querySelector('#dato-prox');
const datoTimestamp = document.querySelector('#dato-timestamp');
const imgFoco = document.getElementById('img-foco');
const imgVent = document.getElementById('img-vent');

const socket = io()

socket.on('db:newData', (elementoNuevo) => {
    datoCalor.innerHTML = elementoNuevo.data.sensor_calor;
    datoProx.innerHTML = elementoNuevo.data.sensor_prox;
    datoTimestamp.innerHTML = 'ultima actualizacion: ' + new Date(elementoNuevo.data.timestamp).toLocaleString()
    if(elementoNuevo.encenderFoco)
        imgFoco.src = '/imgs/foco_encendido.png';
    else
        imgFoco.src = '/imgs/foco_apagado.png';
    if(elementoNuevo.encenderVentilador)
        imgVent.src = '/imgs/ventilador.gif';
    else
        imgVent.src = '/imgs/ventilador_idle.png';
});