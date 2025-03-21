document.addEventListener("DOMContentLoaded", fetchDataAndBuildCharts);

function fetchDataAndBuildCharts() {
  fetch('http://localhost:3000/connections')
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        throw new Error('Aucune donnée reçue');
      }
      
      console.log("Données reçues :", data);

      buildAccessPerSessionChart(data);
      buildConnectTimeEvoChart(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));
}

function buildAccessPerSessionChart(data) {
  const labels = data.map(row => row.accesspointmac);
  const values = data.map(row => row.nbraccess);

  const ctx = document.getElementById('AccessPerSession_Chart').getContext('2d');
  
  new Chart(ctx, {
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
}

function buildConnectTimeEvoChart(data) {
  const labels = data.map(row => row.accesspointmac);
  const values = data.map(row => row.acctsessiontime);

  const ctx = document.getElementById('ConnectionTimeEvolution_Chart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temps de connexion',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
        tension: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw} secondes`
          }
        }
      },
      scales: {
        x: { title: { display: true, text: 'Point d\'accès' } },
        y: { title: { display: true, text: 'Temps de connexion (secondes)' } }
      }
    }
  });
}
