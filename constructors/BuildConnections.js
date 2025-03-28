document.addEventListener("DOMContentLoaded", fetchDataAndBuildCharts);

function fetchDataAndBuildCharts() {

  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  
  const url = new URL('http://localhost:3000/connections');
  if (startDate) url.searchParams.append('startDate', startDate);
  if (endDate) url.searchParams.append('endDate', endDate);


  fetch('http://localhost:3000/connections')
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        throw new Error('Aucune donnée reçue');
      }
      
      buildAccessPerSessionChart(data);
      buildConnectTimeEvoChart(data);
      console.log("data :", data);

      console.log("Labels :", data.map(row => row.accesspointmac));
      console.log("Value1 :", data.map(row => row.nbraccess));
      console.log("Value2 :", data.map(row => row.acctsessiontime));

      console.log("Dates (acctstarttime) :", data.map(row => row.acctstarttime)); 
      console.log(typeof data[0].acctstarttime); 

      console.log("Temps de connexion (seconde):", data.map(row => row.acctsessiontime)); 

      
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));
}

// ------------------------------
// Configuration pour appliquer un margin aux legends des charts !!
// ------------------------------


export const legendMargin = {
  id: 'legendMargin',
  afterInit(chart , args, plugins) {
    const originalFit = chart.legend.fit;
    const margin = plugins.margin || 0;
    chart.legend.fit= function fit (){
        if (originalFit) {
          originalFit.call(this)
        }
        return this.height += margin 
    }
  }
}

// ------------------------------
// Canvas doughnut !!
// ------------------------------

// export let AccessPerSessionChart;
var AccessPerSessionChart;

export function buildAccessPerSessionChart(data) {
  const labels = data.map(row => row.accesspointmac);
  const values = data.map(row => row.nbraccess);


  const ctx_AccessPerSession = document.getElementById('AccessPerSession_Chart').getContext('2d');
  console.log(ctx_AccessPerSession);
  if (window.AccessPerSessionChart) {
    window.AccessPerSessionChart.destroy();
  }
  
  window.AccessPerSessionChart = new Chart(ctx_AccessPerSession, {
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
        legendMargin: {
          margin: 20
        },
        tooltip: {
          callbacks: {
            label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw} accès`
          },
          plugins: {
            legend: { position: 'top' },
            legendMargin: {
              margin: 20
            },
          }
        }
      }
    }
  });
  document.getElementById("filterButton").addEventListener("click", fetchDataAndBuildCharts);

  return AccessPerSessionChart;
}


// ------------------------------
// Canvas line !!
// ------------------------------

export var ConnectTimeEvoChart;

export function buildConnectTimeEvoChart(data) {
  const labels = data.map(row => row.accesspointmac);
  const values = data.map(row => row.acctsessiontime);

  const ctx_ConnectionTimeEvolution  = document.getElementById('ConnectionTimeEvolution_Chart').getContext('2d');
  window.ConnectTimeEvoChart = new Chart(ctx_ConnectionTimeEvolution, {
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
        legendMargin: {
          margin: 20
        },
        tooltip: {
          callbacks: {
            label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw} secondes`
          }
        }
      },
      plugins: {
        legend: { position: 'top' },
        legendMargin: {
          margin: 20
        },
      },
      scales: {
        x: { title: { display: true, text: 'Point d\'accès' } },
        y: { title: { display: true, text: 'Temps de connexion (secondes)' } }
      }
    }
  });
  document.getElementById("filterButton").addEventListener("click", fetchDataAndBuildCharts);

  return ConnectTimeEvoChart;
}

export function resetCanvas_ConnectionTimeEvo() {
  $('#ConnectionTimeEvolution_Chart').remove(); 
  $('#lineChartContainer').append('<canvas id="ConnectionTimeEvolution_Chart" width="500" height="500"></canvas>');
  // Sélection du nouveau canvas et définition du contexte
  var canvas = document.querySelector('#ConnectionTimeEvolution_Chart');
  var ctx = canvas.getContext('2d');

  // Redimensionnement  
  ctx.canvas.width = $('#lineChartContainer').width();
  ctx.canvas.height = $('#lineChartContainer').height();

  // Affichage d'un texte temporaire au centre du canvas
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  ctx.font = '10pt Verdana';
  ctx.textAlign = 'center';
  ctx.fillText('Réinitialisation du graphique...', x, y);
  console.log("Canvas 'ConnectionTimeEvolution_Chart' réinitialisé");

}
