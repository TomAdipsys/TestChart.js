var myChartRadar;
fetch('http://localhost:3000/hm_stats/stats')
  .then(res => res.json())
  .then(data => {
    if (!data) throw new Error('Aucune donnée reçue pour radar');
    if (!data.stats) throw new Error('Aucune donnée statistique trouvée');

    console.log(data.stats);  
    const ctx_radar = document.getElementById('radar_Chart').getContext('2d');
    myChartRadar = new Chart(ctx_radar, {
      type: 'radar',
      data: {
        labels: ['Min', 'Moyenne', 'Max'],   
        datasets: [{
          label: 'Données envoyées',
          data: [data.stats.outputStats.minOut, data.stats.outputStats.avgOut, data.stats.outputStats.maxOut],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
          label: 'Données reçues',
          data: [data.stats.inputStats.minIn, data.stats.inputStats.avgIn, data.stats.inputStats.maxIn],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)'
        }]
      },
      options: {
        responsive: true,
      }
    });

const swapDataOrder = (dataset) => {
  let reversedDataset = [];  
  for (let i = dataset.length - 1; i >= 0; i--) {  
    reversedDataset.push(dataset[i]);  
  }
  return reversedDataset;  
};

const swapLabelsOrder = (labels) => {
  let reversedLabels = [];    
  for (let i = labels.length - 1; i >= 0; i--) {  
    reversedLabels.push(labels[i]);  
  }
  return reversedLabels; 
};

document.getElementById('toggle_radarChart').addEventListener('click', () => {
  // Interchanger les données des datasets
  myChartRadar.data.datasets[0].data = swapDataOrder(myChartRadar.data.datasets[0].data);
  myChartRadar.data.datasets[1].data = swapDataOrder(myChartRadar.data.datasets[1].data);

  // Interchanger les labels
  myChartRadar.data.labels = swapLabelsOrder(myChartRadar.data.labels);

  // Redessiner le graphique après avoir échangé les valeurs et les labels
  myChartRadar.update();
});

})
.catch(error => console.error('Erreur de récupération des données :', error.message));



$('#hide_radar_Chart').click(() => {
  $('#CntRADAR').fadeToggle(220)
  $('#radar_Chart').fadeToggle(220, function() {
    $('#hide_radar_Chart').text($(this).is(':visible') ? 'hide the radar' : 'show the radar');
  });
})

$("#resetButton_radar_Chart").click(function() {
    console.log("button 'resetButton_radar_Chart' clicked");
    
    if (myChartRadar) {
      // Effacer les anciennes données
      myChartRadar.data.datasets.forEach(dataset => {
        dataset.data = []; // Vide les données de chaque dataset
      });

      // Redessiner avec les données d'origine (ou réinitialiser selon besoin)
      myChartRadar.update(); // Met à jour le graphique
    }
});

$("#resetButton_radar_Chart").click(function() {
  console.log("button 'resetButton_radar_Chart' clicked");

  if (window.myChartRadar) {
    window.myChartRadar.data = initialData;
    window.myChartRadar.update();
  }
});

document.getElementById('download_radar').addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = myChartRadar.toBase64Image();
    a.download = 'radar_chart.jpg';
    a.click();
  });
