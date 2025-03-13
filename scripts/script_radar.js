var myChartRadar;
fetch('http://localhost:3000/hm_stats/radar')

  .then(res => res.json())
  .then(data => {
    if (!data) throw new Error('Aucune donnée reçue pour radar');
    if (!data || data.length === 0) throw new Error('Aucune donnée reçue pour radar');
    console.log(data);

    
    const ctx_radar = document.getElementById('radar_Chart').getContext('2d');
    myChartRadar = new Chart(ctx_radar, {
      type: 'radar',
      data: {
        labels: ['Min', 'Moyenne', 'Max'],
        datasets: [{
          label: 'Données envoyées',
          data: [data.minOut, data.avgOut, data.maxOut],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
          label: 'Données reçues',
          data: [data.minIn, data.avgIn, data.maxIn],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)'
        }]
      },
      options: {
        responsive: true,
      }
    });
  })
  .catch(error => console.error('Erreur de récupération des données :', error.message));