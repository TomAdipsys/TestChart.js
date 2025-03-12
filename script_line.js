// script_line.js - Affichage du graphique Line avec les données ClickHouse
var myChartLine;
fetch('http://localhost:3000/hm_stats')
  .then(res => res.json())
  .then(data => {
    if (!data || data.length === 0) throw new Error('Aucune donnée reçue');
    
    const labels_line = data.map(row => new Date(row.acctstarttime).toLocaleString());
    const values_line = data.map(row => row.nb);
    
    const ctx_line = document.getElementById('line_Chart').getContext('2d');
    myChartLine = new Chart(ctx_line, {
      type: 'line', 
      data: {
        labels: labels_line,
        datasets: [{
          label: 'Temps de connexion',
          data: values_line,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: true,
          tension: 0,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Date de connexion' }
          },
          y: {
            title: { display: true, text: 'Temps de connexion (secondes)' }
          }
        }
      }
    });
  })
  .catch(error => console.error('Erreur de récupération des données :', error.message));

// Boutons d'interaction
$('#hide_line_Chart').click(() => {
  $('#line_Chart').fadeToggle(400, function() {
    $('#hide_line_Chart').text($(this).is(':visible') ? 'hide the line' : 'show the line');
  });
});

$('#resetButton_line_Chart').click(() => {
  myChartLine.data.datasets.forEach(dataset => { dataset.data = []; });
  myChartLine.update();
});

document.getElementById('download_line').addEventListener('click', function() {
  var a = document.createElement('a');
  a.href = myChartLine.toBase64Image();
  a.download = 'line_chart.jpg';
  a.click();
});


