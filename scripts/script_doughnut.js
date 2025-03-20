// script_doughnut.js - Affichage du graphique Doughnut avec les données ClickHouse
var myChart;
fetch('http://localhost:3000/hm_stats/connections')
  .then(res => res.json())
  .then(data => {
    if (!data || data.length === 0) throw new Error('Aucune donnée reçue');

    const labels = data.map(row => row.accesspointmac);
    const values = data.map(row => row.nb);
    

    const ctx_doughnut = document.getElementById('doughnut_Chart').getContext('2d');
    myChart = new Chart(ctx_doughnut, {
      type: 'doughnut',  
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre d\'accès',
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw} accès`
            }
          }
        }
      }
    });
  })
  .catch(error => console.error('Erreur de récupération des données :', error.message));

// Boutons d'interaction
$('#hide_doughnut').click(() => {
  $('#CntDONUT').fadeToggle(220)
  $('#doughnut_Chart').fadeToggle(220, function() {
    $('#hide_doughnut').text($(this).is(':visible') ? 'hide the doughnut' : 'show the doughnut');
  });
  
});


$('#resetButton_doughnut_Chart').click(() => {
  myChart.update();
});

document.getElementById('download_doughnut').addEventListener('click', function() {
  var a = document.createElement('a');
  a.href = myChart.toBase64Image();
  a.download = 'doughnut_chart.jpg';
  a.click();
});


