document.addEventListener("DOMContentLoaded", fetchDataAndBuildCharts);

function fetchDataAndBuildCharts() {
    fetch('http://localhost:3000/stats/perperson')
        .then(res => res.json())
        .then(data => {
            buildUsedDataPerPersonChart(data);
            console.log(data);
            console.log("hi");
            console.log(data.stats);
            console.log(data.stats.outputStatsPerPerson.totalOutPers);
            callDataStatsPerPerson(data);
        })
        .catch(error => console.error('Erreur de récupération des données :', error.message));
};

export const callDataStatsPerPerson = (data) => {
    console.log('minoutPerPerson ' + data.stats.outputStatsPerPerson.minOutPers,);
    console.log('avgoutPerPerson ' + data.stats.outputStatsPerPerson.maxOutPers,);
    console.log('maxoutPerPerson ' + data.stats.outputStatsPerPerson.maxOutPers,);
    console.log('mininPerPerson ' + data.stats.inputStatsPerPerson.minInPerPerson,);
    console.log('avginPerPerson ' + data.stats.inputStatsPerPerson.avgInPerPerson,);
    console.log('maxinPerPerson ' + data.stats.inputStatsPerPerson.maxInPerPerson,);
    console.log('mininoutPerPerson ' + data.stats.inoutputStatsPerPerson.minInOutPerPerson,);
    console.log('avginoutPerPerson ' + data.stats.inoutputStatsPerPerson.avgInOutPerPerson,);
    console.log('maxinoutPerPerson ' + data.stats.inoutputStatsPerPerson.maxInOutPerPerson,);
    console.log('totalinPerPerson ' + data.stats.inputStatsPerPerson.totalInPerPerson,);
    console.log('totaloutPerPerson ' + data.stats.outputStatsPerPerson.totalOutPers,);
    console.log('totalinoutPerPerson ' + data.stats.inoutputStatsPerPerson.totalInOutPerPerson,);
}

export var UsedDataPerpersonChart;

export function buildUsedDataPerPersonChart(data) {
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
                        data.stats.outputStatsPerPerson.minOutPers,
                        data.stats.outputStatsPerPerson.avgOutPers,
                        data.stats.outputStatsPerPerson.maxOutPers,
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







