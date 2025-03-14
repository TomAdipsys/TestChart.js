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
      type: 'bar', // Type principal
      data: {
        labels: totalInOutPerPerson.map(item => item.acctuniqueid), // Identifiants utilisateurs
        datasets: [
          {
            label: 'Total global des données',
            data: new Array(totalInOutPerPerson.length).fill(totalInOut[0].total_data_received), // Même valeur pour chaque utilisateur
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            type: 'bar'
          },
          {
            label: 'Total par personne',
            data: totalInOutPerPerson.map(item => item.total_data_received), // Valeurs spécifiques
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            type: 'bar'
          },
          {
            label: 'Min data par personne',
            data: minInOutPerPerson.map(item => item.min_data_received),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            type: 'line',
            fill: false
          },
          {
            label: 'Max data par personne',
            data: maxInOutPerPerson.map(item => item.max_data_received),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            type: 'line',
            fill: false
          },
          {
            label: 'Moyenne data par personne',
            data: avgInOutPerPerson.map(item => item.average_data_received),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderWidth: 2,
            type: 'line',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
    })
    .catch(error => console.error('Erreur de récupération des données :', error.message));