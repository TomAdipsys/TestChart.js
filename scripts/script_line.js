// Récupérer les données depuis le serveur Express
var myChartLine;
fetch('http://localhost:3000/hm_stats')
  .then(res => res.json())
  .then(data => {

    console.log(data); // Affiche les données pour le débogage

    // 2. Line chart (Évolution du temps de connexion)
    const labels_line = data.connections.map(row => row.acctstarttime);
    const values_line = data.connections.map(row => row.nb);
    

    const ctx_line = document.getElementById('line_Chart').getContext('2d');
    myChartLine = new Chart(ctx_line, {
      type: 'line', 
      data: {
        labels: labels_line,  // dates
        datasets: [{
          label: 'Temps de connexion',
          data: values_line,  //   durées de connexion
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


$('#hide_line_Chart').click(() => {
  $('#CntLINE').fadeToggle(220)
  $('#line_Chart').fadeToggle(220, function() {
    $('#hide_line_Chart').text($(this).is(':visible') ? 'hide the line' : 'show the line');
  });
})

$("#resetButton_line_Chart").click(function() {
    console.log("button 'resetButton_line_Chart' clicked");
    
    if (myChartLine) {
      // Effacer les anciennes données
      myChartLine.data.datasets.forEach(dataset => {
        dataset.data = []; // Vide les données de chaque dataset
      });

      // Redessiner avec les données d'origine (ou réinitialiser selon besoin)
      myChartLine.update(); // Met à jour le graphique
    }
});

$("#resetButton_line_Chart").click(function() {
  console.log("button 'resetButton_line_Chart' clicked");

  if (window.myChartLine) {
    window.myChartLine.data = initialData;
    window.myChartLine.update();
  }
});

document.getElementById('download_line').addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = window.myChartLine.toBase64Image();
    a.download = 'line_chart.jpg';
    a.click();
  });