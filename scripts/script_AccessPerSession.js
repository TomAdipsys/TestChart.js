var AccessPerSessionChart;
fetch('http://localhost:3000/hm_stats/connections')
  .then(res => res.json())
  .then(data => {
    if (!data || data.length === 0) throw new Error('Aucune donnée reçue');

    const labels = data.map(row => row.accesspointmac);
    const values = data.map(row => row.nbraccess);
    

    const ctx_AccessPerSession = document.getElementById('AccessPerSession_Chart').getContext('2d');
    AccessPerSessionChart = new Chart(ctx_AccessPerSession, {
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
$('#hide_AccessPerSession').click(() => {
  $('#CntDONUT').fadeToggle(220)
  $('#AccessPerSession_Chart').fadeToggle(220, function() {
    $('#hide_AccessPerSession').text($(this).is(':visible') ? 'hide the chart ?' : 'show the chart ?');
  });
  
});


$('#resetButton_AccessPerSession_Chart').click(() => {
  AccessPerSessionChart.destroy();
  AccessPerSessionChart.update();
});

document.getElementById('download_AccessPerSession').addEventListener('click', function() {
  var a = document.createElement('a');
  a.href = AccessPerSessionChart.toBase64Image();
  a.download = 'AccessPerSession_Chart.jpg';
  a.click();
});


