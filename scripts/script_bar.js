var myChartBar;
document.addEventListener("DOMContentLoaded", function() {
fetch('http://localhost:3000/hm_stats')
  .then(res => res.json())
  .then(data => {
    if (!data) throw new Error('Aucune donnée reçue pour bar');
    if (!data.stats) throw new Error('Aucune donnée statistique trouvée');

    console.log(data.stats);

    // Préparation des labels et des datasets
    const ctx_bar = document.getElementById('bar_Chart').getContext('2d');
    const myChartBar = new Chart(ctx_bar, {
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

  })
  .catch(error => console.error('Erreur de récupération des données :', error.message));
})

$('#hide_bar_Chart').click(() => {
  $('#Cntbar').fadeToggle(220)
  $('#bar_Chart').fadeToggle(220, function() {
    $('#hide_bar_Chart').text($(this).is(':visible') ? 'hide the bar' : 'show the bar');
  });
})

$("#resetButton_bar_Chart").click(function() {
    console.log("button 'resetButton_bar_Chart' clicked");
    
    if (myChartBar) {
      // Effacer les anciennes données
      myChartBar.data.datasets.forEach(dataset => {
        dataset.data = []; // Vide les données de chaque dataset
      });

      // Redessiner avec les données d'origine (ou réinitialiser selon besoin)
      myChartBar.update(); // Met à jour le graphique
    }
});

$("#resetButton_bar_Chart").click(function() {
  console.log("button 'resetButton_bar_Chart' clicked");

  if (window.myChartBar) {
    window.myChartBar.data = initialData;
    window.myChartBar.update();
  }
});

document.getElementById('download_bar').addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = myChartBar.toBase64Image();
    a.download = 'bar_chart.jpg';
    a.click();
  });
