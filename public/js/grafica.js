// const dataset = [
//     { timestamp: 1620000000, sensor_calor: 180, sensor_prox: 1 },
//     { timestamp: 1620000010, sensor_calor: 45, sensor_prox: 0 },
//     { timestamp: 1620000020, sensor_calor: 270, sensor_prox: 1 },
//     { timestamp: 1620000030, sensor_calor: 120, sensor_prox: 0 },
//     { timestamp: 1620000040, sensor_calor: 90, sensor_prox: 1 }
// ];

var timestamps = dataset.map(data => moment(data.timestamp).format('HH:mm:ss'));
var valoresSensorCalor = dataset.map(data => data.sensor_calor);
var valoresSensorProx = dataset.map(data => data.sensor_prox);

const ctxTemp = document.getElementById('chart-temp').getContext('2d');
const ctxProx = document.getElementById('chart-prox').getContext('2d');

const chartTemp = new Chart(ctxTemp, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
        label: 'Sensor Temperatura',
        data: valoresSensorCalor,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.3
        }]
    },
    options: {
        scales: {
            y: {
                min: 0,
                max: 200
            }
        }
    }
});

function formatearFecha(timestamp) {
    var fecha = moment(timestamp);
    return fecha.format('DD/MM/YYYY HH:mm:ss');
}

const chartProx = new Chart(ctxProx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'Sensor Proximidad',
            data: valoresSensorProx,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            stepped: true,
        }]
    },
    options: {
        scales: {
            y: {
                min: -0.5,
                max: 1.5
            }
        }
    }
});