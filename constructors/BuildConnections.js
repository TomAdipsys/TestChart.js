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

export let AccessPerSessionChart;

export function buildAccessPerSessionChart(data) {
  const labels = data.map(row => row.accesspointmac);
  const values = data.map(row => row.nbraccess);

  const ctx_AccessPerSession = document.getElementById('AccessPerSession_Chart').getContext('2d');
  AccessPerSessionChart = new Chart(ctx_AccessPerSession, {
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
  return AccessPerSessionChart;
}


export var ConnectTimeEvoChart;

export function buildConnectTimeEvoChart(data) {
  const labels = data.map(row => row.accesspointmac);
  const values = data.map(row => row.acctsessiontime);

  const ctx_ConnectionTimeEvolution  = document.getElementById('ConnectionTimeEvolution_Chart').getContext('2d');
  ConnectTimeEvoChart = new Chart(ctx_ConnectionTimeEvolution, {
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
  return ConnectTimeEvoChart;
}

export function resetCanvas_ConnectionTimeEvo() {
  $('#ConnectionTimeEvolution_Chart').remove(); // Supprime le canvas existant
  $('.lineChart').append('<canvas id="ConnectionTimeEvolution_Chart" width="500" height="500"></canvas>');

  // Sélection du nouveau canvas et définition du contexte
  var canvas = document.querySelector('#ConnectionTimeEvolution_Chart');
  var ctx = canvas.getContext('2d');

  // Redimensionnement pour s'adapter au parent
  ctx.canvas.width = $('.lineChart').width();
  ctx.canvas.height = $('.lineChart').height();

  // Affichage d'un texte temporaire au centre du canvas
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  ctx.font = '10pt Verdana';
  ctx.textAlign = 'center';
  ctx.fillText('Réinitialisation du graphique...', x, y);
}
