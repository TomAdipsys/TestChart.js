document.addEventListener("DOMContentLoaded", () => {
  
  $('filterButton_NbrAccess').click(async() => {

    console.log("button 'filterButton_NbrAccess' clicked");
    $('#filterButton_NbrAccess').prop('disabled', true); // Désactiver le bouton pendant le chargement

    const startDate_NbrAccess = $('#startDate_NbrAccess').val();
    const endDate_NbrAccess = $('#endDate_NbrAccess').val();

    // Validation des dates avant d'envoyer la requête
    if (startDate_NbrAccess && isNaN(Date.parse(startDate_NbrAccess))) {
      console.error('Date de début invalide');
      return;
    }
    if (endDate_NbrAccess && isNaN(Date.parse(endDate_NbrAccess))) {
      console.error('Date de fin invalide');
      return;
    }

    // Envoi des dates au backend via fetch
    const parameters = new URL('http://localhost:3000/connections');
    if (startDate_NbrAccess) parameters.searchParams.append('startDate_NbrAccess', startDate_NbrAccess);
    if (endDate_NbrAccess) parameters.searchParams.append('endDate_NbrAccess', endDate_NbrAccess);

    try {
      const response = await fetch(parameters);
      const data = await response.json();

      $('#filterButton_NbrAccess').prop('disabled', false);

      if (!data || data.length === 0) {
        throw new Error('Aucune donnée reçue');
      }

      // Construction des graphiques après la réception des données
      buildAccessPerSessionChart(data);
      // buildConnectTimeEvoChart(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  });
});

export function callData(data) {
  console.log("data :", data);

  console.log("Labels :", data.map(row => row.accesspointmac));
  console.log("Value1 :", data.map(row => row.nbraccess));
  console.log("Value2 :", data.map(row => row.acctsessiontime));

  console.log("Dates (acctstarttime) :", data.map(row => row.acctstarttime)); 
  console.log(typeof data[0].acctstarttime); 

  console.log("Temps de connexion (seconde):", data.map(row => row.acctsessiontime)); 
}

// ------------------------------
// Configuration pour appliquer une image aux charts !!
// ------------------------------

// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const image = new Image();
image.src = 'https://www.chartjs.org/img/chartjs-logo.svg';

const plugin = {
  id: 'customCanvasBackgroundImage',
  beforeDraw: (chart) => {
    if (image.complete) {
      const ctx = chart.ctx;
      const {top, left, width, height} = chart.chartArea;
      const x = left + width / 2 - image.width / 2;
      const y = top + height / 2 - image.height / 2;
      ctx.drawImage(image, x, y);
    } else {
      image.onload = () => chart.draw();
    }
  }
};

// ------------------------------
// Configuration pour appliquer un margin aux legends des charts !!
// ------------------------------

const legendMarginPlugin = {
  id: 'legendMargin',
  afterFit: (legend) => {
    if (legend.options && legend.options.margin) {
      legend.height += legend.options.margin;
    }
  }
};

// Enregistrement du plugin correctement
Chart.register(legendMarginPlugin);

// ------------------------------
// Canvas AccessPerSession !!
// ------------------------------

var AccessPerSessionChart;

export function buildAccessPerSessionChart(data) {
  const labels = data.map(row => row.accesspointmac);
  const values = data.map(row => row.nbraccess);

  const ctx_AccessPerSession = document.getElementById('AccessPerSession_Chart').getContext('2d');
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
        legend: { 
          position: 'bottom',
          labels: {
            padding: 10
          }
        },
        legendMargin: { 
          margin: 200
        },
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
        borderColor: 'rgb(122, 213, 219)',
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
