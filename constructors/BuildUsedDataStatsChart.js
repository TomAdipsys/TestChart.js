document.addEventListener("DOMContentLoaded", function() {
  fetch('http://localhost:3000/stats')
    .then(res => res.json())
    .then(data => {
      buildUsedDataChart(data); 
    })
    .catch(error => console.error('Erreur de récupération des données :', error.message));
});

var UsedDataChart;  

export const buildUsedDataChart = (data) => { 
    if (!data || !data.stats) {
        console.error('Invalid data received:', data);
        return;
    }
    
    console.log(data.stats);

    const ctx_UsedData = document.getElementById('UsedData_Chart').getContext('2d');
    console.log(ctx_UsedData);
    if (window.UsedDataChart) {
        window.UsedDataChart.destroy();
    }

    window.UsedDataChart = new Chart(ctx_UsedData, {
      type: 'bar', 
      data: {
        labels: ['Min', 'Moyenne', 'Max'], 
        datasets: [
          {
            label: 'Données envoyées',
            data: [
              data.stats.outputStats.minOut,
              data.stats.outputStats.avgOut,
              data.stats.outputStats.maxOut
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
              data.stats.inputStats.maxIn
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
              data.stats.inoutputStats.maxInOut
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
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
}