const socket = io();
const tablaSensores = document.querySelector('#tabla-sensores');

socket.on('db:newData', (elementoNuevo) => {
    const filaElemento = document.createElement('tr');
    const celdaProx = document.createElement('th');
    const celdaTemp = document.createElement('th');
    const celdaTimestamp = document.createElement('th');

    celdaProx.innerHTML = elementoNuevo.data.sensor_prox;
    celdaTemp.innerHTML = elementoNuevo.data.sensor_calor;
    celdaTimestamp.innerHTML = new Date(elementoNuevo.data.timestamp).toLocaleString()

    filaElemento.appendChild(celdaProx);
    filaElemento.appendChild(celdaTemp);
    filaElemento.appendChild(celdaTimestamp);

    // tablaSensores.appendChild(filaElemento);
    var firstRow = tablaSensores.rows[0];
    firstRow.parentNode.insertBefore(filaElemento,firstRow);
    dataset.shift();
    dataset.push(elementoNuevo.data);

    timestamps = dataset.map(data => moment(data.timestamp).format('HH:mm:ss'));
    valoresSensorCalor = dataset.map(data => data.sensor_calor);
    valoresSensorProx = dataset.map(data => data.sensor_prox);


    chartProx.data.labels = timestamps;

    chartTemp.data.datasets = [{
    label: 'Sensor Temperatura',
    data: valoresSensorCalor,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
    fill: false,
    tension: 0.3
    }]
    chartTemp.data.labels = timestamps;

    chartProx.data.datasets =  [{
        label: 'Sensor Proximidad',
        data: valoresSensorProx,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        stepped: true,
    }]
    
    chartProx.update();
    chartTemp.update();
});