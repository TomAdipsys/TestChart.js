var myChartBar;
fetch('http://localhost:3000/hm_stats')
  .then(res => res.json())
  .then(data => {
    if (!data) throw new Error('Aucune donnée reçue pour radar');
    if (!data.stats) throw new Error('Aucune donnée statistique trouvée');

    console.log(data.stats); 

    const labels_line = data.connections.map(row => row.acctstarttime);
    const values_line = data.connections.map(row => row.nb);

    const ctx_bar = document.getElementById('bar_Chart').getContext('2d');
    myChartBar = new Chart(ctx_bar, {
        type: 'bar',  
        data: {
          labels: labels,  
          datasets: [
            {
              label: 'Min Data Sent Total',
              data: Array(labels.length).fill(min_data_sent), // Répéter la donnée totale pour chaque utilisateur
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Min Data Sent Per Person',
              data: personData,  
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
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