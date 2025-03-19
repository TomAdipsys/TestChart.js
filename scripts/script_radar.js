var myChartRadar;
fetch('http://localhost:3000/hm_stats')
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

    // Fonction pour interchanger les données min, avg, et max et les labels
    const swapDataOrder = (dataset) => {
      return [
        dataset[2],  // Max
        dataset[1],  // Moyenne
        dataset[0]   // Min
      ];
    };

    const swapLabelsOrder = (labels) => {
      return [
        labels[2], // Max
        labels[1], // Moyenne
        labels[0]  // Min
      ];
    };

    // Ajout d'un écouteur pour le bouton toggle
    document.getElementById('toggleButton').addEventListener('click', () => {
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
