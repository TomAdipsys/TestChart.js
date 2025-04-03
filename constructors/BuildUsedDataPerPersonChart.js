document.addEventListener("DOMContentLoaded");{
  fetch('http://localhost:3000/perperson')
    .then(res => res.json())
    .then(data => {
        if (!data || data.length === 0) {
            throw new Error('Aucune donnée reçue');
          }
        buildUsedDataPerPersonChart(data); 
        // console.log(data);
        console.log("hi");
        // console.log(stats);
        // console.log(data.stats);
        // console.log(data.stats.perperson);
        // callDataStatsPerPerson(data.stats.perperson.outputStatsPerPerson.minOutPerPerson);
        // callDataStatsPerPerson(data.stats.outputStatsPerPerson.minOutPerPerson);
    })
    .catch(error => console.error('Erreur de récupération des données :', error.message));
};

export function callDataStatsPerPerson(data) {
console.log('minoutPerPerson ' + data.stats.perperson.outputStats.minOutPerPerson,);
console.log('avgoutPerPerson ' + data.stats.outputStats.avgOutPerPerson,);
console.log('maxoutPerPerson ' + data.stats.outputStats.maxOutPerPerson,);
console.log('mininPerPerson ' + data.stats.inputStatsPerPerson.minInPerPerson,);
console.log('avginPerPerson ' + data.stats.inputStatsPerPerson.avgInPerPerson,);
console.log('maxinPerPerson ' + data.stats.inputStatsPerPerson.maxInPerPerson,);
console.log('mininoutPerPerson ' + data.stats.inoutputStats.minInOutPerPerson,);
console.log('avginoutPerPerson ' + data.stats.inoutputStats.avgInOutPerPerson,);
console.log('maxinoutPerPerson ' + data.stats.inoutputStats.maxInOutPerPerson,);
console.log('totalinPerPerson ' + data.stats.inputStatsPerPerson.totalInPerPerson,);
console.log('totaloutPerPerson ' + data.stats.outputStats.totalOutPerPerson,);
console.log('totalinoutPerPerson ' + data.stats.inoutputStats.totalInOutPerPerson,);
}

export var UsedDataPerpersonChart;  

export const buildUsedDataPerPersonChart = (data) => { 
if (!data || !data.stats) {
    console.error('Invalid data received:', data);
    return;
}

const ctx_UsedDataPerPerson = document.getElementById('UsedDataPerPerson_Chart').getContext('2d');
if (window.UsedDataPerpersonChart) {
    window.UsedDataPerpersonChart.destroy();
}

window.UsedDataPerpersonChart = new Chart(ctx_UsedDataPerPerson, {
    type: 'bar', 
    data: {
    labels: ['Min', 'Moyenne', 'Max', "Total"], 
    datasets: [
        {
        label: 'Données envoyées',
        data: [
            data.stats.outputStatsPerPerson.minOutPerPerson,
            data.stats.outputStatsPerPerson.avgOutPerPerson,
            data.stats.outputStatsPerPerson.maxOutPerPerson,
            data.stats.outputStatsPerPerson.totalOutPerPerson,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',  
        borderColor: 'rgba(255, 99, 132, 1)',  
        borderWidth: 1
        },
        {
        label: 'Données reçues',
        data: [
            data.stats.inputStatsPerPerson.minInPerPerson,
            data.stats.inputStatsPerPerson.avgInPerPerson,
            data.stats.inputStatsPerPerson.maxInPerPerson,
            data.stats.inputStatsPerPerson.totalInPerPerson,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
        },
        {
        label: 'Données entrées/sorties',
        data: [
            data.stats.inoutputStatsPerPerson.minInOutPerPerson,
            data.stats.inoutputStatsPerPerson.avgInOutPerPerson,
            data.stats.inoutputStatsPerPerson.maxInOutPerPerson,
            data.stats.inoutputStatsPerPerson.totalInOutPerPerson
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
        },
    ]
    },
    options: {
    responsive: true,
    scales: {
        y: {
        beginAtZero: true 
        }
    }
    }
});
};