document.addEventListener("DOMContentLoaded", function() {
  fetch('http://localhost:3000/stats')
    .then(res => res.json())
    .then(data => {
      buildUsedDataChart(data); 
      // callDataStats(data); 
      // callDataStatsPerPerson(data);

    })
    .catch(error => console.error('Erreur de récupération des données :', error.message));
});

export var UsedDataChart;  

export function callDataStats (data) {
  console.log('minout ' + data.stats.outputStats.minOut,);
  console.log('avgout ' + data.stats.outputStats.avgOut,);
  console.log('maxout ' + data.stats.outputStats.maxOut,);
  console.log('minin ' + data.stats.inputStats.minIn,);
  console.log('avgin ' + data.stats.inputStats.avgIn,);
  console.log('maxin ' + data.stats.inputStats.maxIn,);
  console.log('mininout ' + data.stats.inoutputStats.minInOut,);
  console.log('avginout ' + data.stats.inoutputStats.avgInOut,);
  console.log('maxinout ' + data.stats.inoutputStats.maxInOut,);
  console.log('totalin ' + data.stats.inputStats.totalIn,);
  console.log('totalout ' + data.stats.outputStats.totalOut,);
  console.log('totalinout ' + data.stats.inoutputStats.totalInOut,);
}

export const buildUsedDataChart = (data) => { 
    if (!data || !data.stats) {
        console.error('Invalid data received:', data);
        return;
    }
  
    const ctx_UsedData = document.getElementById('UsedData_Chart').getContext('2d');
    if (window.UsedDataChart) {
        window.UsedDataChart.destroy();
    }

    window.UsedDataChart = new Chart(ctx_UsedData, {
      type: 'bar', 
      data: {
        labels: ['Min', 'Moyenne', 'Max', 'Total'],
        datasets: [
          {
            label: 'Données envoyées',
            data: [
              data.stats.outputStats.minOut,
              data.stats.outputStats.avgOut,
              data.stats.outputStats.maxOut,
              data.stats.outputStats.totalOut,
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',  
            borderColor: 'rgba(255, 99, 132, 1)',  
            borderWidth: 1
          },
          {
            label: 'Données reçues',
            data: [
              data.stats.inputStats.minIn,
              data.stats.inputStats.avgIn,
              data.stats.inputStats.maxIn,
              data.stats.inputStats.totalIn
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Données entrées/sorties',
            data: [
              data.stats.inoutputStats.minInOut,
              data.stats.inoutputStats.avgInOut,
              data.stats.inoutputStats.maxInOut,
              data.stats.inoutputStats.totalInOut
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
        ],
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
}