document.addEventListener("DOMContentLoaded", fetchDataAndBuildCharts);

function fetchDataAndBuildCharts() {
    fetch('http://localhost:3000/stats/perperson')
        .then(res => res.json())
        .then(data => {
            buildUsedDataPerPersonChart(data);
            console.log(data);
            console.log("hi");
            // console.log(data.stats);
            // console.log(data.stats.outputStatsPerPerson.totalOutPers);
            // callDataStatsPerPerson(data);
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

    // Extraire les valeurs numériques des tableaux d'objets
    const labels = data.stats.inputStatsPerPerson.minInPerPerson.map(person => person.acctuniqueid);

    const minOutPersValues = data.stats.outputStatsPerPerson.minOutPers.map(person => person.min_data_sent);
    const avgOutPersValues = data.stats.outputStatsPerPerson.avgOutPers.map(person => person.avg_data_sent);
    const maxOutPersValues = data.stats.outputStatsPerPerson.maxOutPers.map(person => person.max_data_sent);
    const totalOutPersValues = data.stats.outputStatsPerPerson.totalOutPers.map(person => person.total_data_sent);

    const minInPersValues = data.stats.inputStatsPerPerson.minInPerPerson.map(person => person.min_data_received);
    const avgInPersValues = data.stats.inputStatsPerPerson.avgInPerPerson.map(person => person.avg_data_received);
    const maxInPersValues = data.stats.inputStatsPerPerson.maxInPerPerson.map(person => person.max_data_received);
    const totalInPersValues = data.stats.inputStatsPerPerson.totalInPerPerson.map(person => person.total_data_received);

    const minInOutPersValues = data.stats.inoutputStatsPerPerson.minInOutPerPerson.map(person => person.min_data_used);
    const avgInOutPersValues = data.stats.inoutputStatsPerPerson.avgInOutPerPerson.map(person => person.avg_data_used);
    const maxInOutPersValues = data.stats.inoutputStatsPerPerson.maxInOutPerPerson.map(person => person.max_data_used);
    const totalInOutPersValues = data.stats.inoutputStatsPerPerson.totalInOutPerPerson.map(person => person.total_data_used);

    window.UsedDataPerpersonChart = new Chart(ctx_UsedDataPerPerson, {
        type: 'bar',
        data: {
            labels: labels, // User IDs as labels
            datasets: [
                {
                    label: 'Min (Received)',
                    data: minInPersValues,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Avg (Received)',
                    data: avgInPersValues,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Max (Received)',
                    data: maxInPersValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total (Received)',
                    data: totalInPersValues,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Min (Sent)',
                    data: minOutPersValues,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Avg (Sent)',
                    data: avgOutPersValues,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Max (Sent)',
                    data: maxOutPersValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total (Sent)',
                    data: totalOutPersValues,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Min (Combined)',
                    data: minInOutPersValues,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Avg (Combined)',
                    data: avgInOutPersValues,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Max (Combined)',
                    data: maxInOutPersValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total (Combined)',
                    data: totalInOutPersValues,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' },
                tooltip: {
                    callbacks: {
                        label: tooltipItem => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Users' } },
                y: { title: { display: true, text: 'Values' }, beginAtZero: true }
            }
        }
    });
}



