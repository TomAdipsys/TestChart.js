var ConnectTimeEvoChart;
fetch('http://localhost:3000/hm_stats/connections')
  .then(res => res.json())
  .then(data => {

    console.log(data);
    // 2. Line chart (Évolution du temps de connexion)
    const labels_line = data.map(row => row.accesspointmac);
    const values_line = data.map(row => row.acctsessiontime);
    

    const ctx_ConnectionTimeEvolution = document.getElementById('ConnectionTimeEvolution_Chart').getContext('2d');
    ConnectTimeEvoChart = new Chart(ctx_ConnectionTimeEvolution, {
      type: 'line', 
      data: {
        labels: labels_line,  // dates
        datasets: [{
          label: 'Temps de connexion',
          data: values_line,  // durées de connexion
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: true,  
          tension: 0,  
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' secondes';
              }
            }
          }
        },
        scales: {
          x: {
            type: 'category',  // Axe des x est une série de dates
            title: {
              display: true,
              text: 'Date de connexion'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temps de connexion (secondes)'
            }
          }
        }
      }
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données :', error));


$('#hide_ConnectionTimeEvolution_Chart').click(() => {
  $('#CntLINE').fadeToggle(220)
  $('#ConnectionTimeEvolution_Chart').fadeToggle(220, function() {
    $('#hide_ConnectionTimeEvolution_Chart').text($(this).is(':visible') ? 'hide the line' : 'show the line');
  });
})


$("#resetButton_ConnectionTimeEvolution_Chart").click(function() {
  console.log("button 'resetButton_ConnectionTimeEvolution_Chart' clicked");

  if (window.CoonectTimeEvoChart) {
    window.CoonectTimeEvoChart.data = initialData;
    window.CoonectTimeEvoChart.update();
  }
});

document.getElementById('download_ConnectTimeEvoChart').addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = ConnectTimeEvoChart.toBase64Image();
    a.download = 'ConnectionTimeEvolution_Chart.jpg';
    a.click();
  });