document.addEventListener("DOMContentLoaded", () => {

  $('filterButton_').click(async() => {

    console.log("button 'filterButton_ ' clicked");
    $('#filterButton_ConnectionTime').prop('disabled', true); // Désactiver le bouton pendant le chargement

    const startDate_ConnectionTime = $('#startDate_ConnectionTime').val();
    const endDate_ConnectionTime = $('#endDate_ConnectionTime').val();

    // Validation des dates avant d'envoyer la requête
    if (startDate_ConnectionTime && isNaN(Date.parse(startDate_ConnectionTime))) {
      console.error('Date de début invalide');
      return;
    }
    if (endDate_ConnectionTime && isNaN(Date.parse(endDate_ConnectionTime))) {
      console.error('Date de fin invalide');
      return;
    }
    // Envoi des dates au backend via fetch
    const parameters = new URL('http://localhost:3000/usertime');
    if (startDate_ConnectionTime) parameters.searchParams.append('startDate_ConnectionTime', startDate_ConnectionTime);
    if (endDate_ConnectionTime) parameters.searchParams.append('endDate_ConnectionTime', endDate_ConnectionTime);

    try {
      const response = await fetch(parameters);
      const data = await response.json();

      $('#filterButton_ConnectionTime').prop('disabled', false);

      if (!data || data.length === 0) {
        throw new Error('Aucune donnée reçue');
      }

      // callData(data); 
      // buildConnectTimeEvoChart(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  });
});

function callData(data) {
  console.log("data :", data);

  console.log("Labels :", data.map(row => row.accesspointmac));
  console.log("Value1 :", data.map(row => row.ConnectionTime));
  console.log("Value2 :", data.map(row => row.acctsessiontime));

  console.log("Dates (acctstarttime) :", data.map(row => row.acctstarttime)); 
  console.log(typeof data[0].acctstarttime); 

  console.log("Temps de connexion (seconde):", data.map(row => row.acctsessiontime)); 
}

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

