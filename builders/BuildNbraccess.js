document.addEventListener("DOMContentLoaded", () => {
  let globalData = [];
  let chartType = 'line'; // Type de graphique par défaut

  // Fonction pour récupérer les filtres depuis le backend
  async function fetchFilters() {
    try {
      const response = await fetch('http://localhost:3000/filters');
      const data = await response.json();
      console.log("Filtres récupérés :", data); // Log des filtres récupérés
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des filtres :', error);
    }
  }

  // Récupération et insertion des filtres dans les <select>
  async function initializeFilters() {
    const filters = await fetchFilters();

    if (filters) {
      populateSelect('#organization', filters.organizations);
      populateSelect('#zone', filters.zones);
      populateSelect('#hotspot', filters.hotspots);
    } else {
      console.error("Aucun filtre récupéré.");
    }
  }

  // Fonction pour remplir un <select> avec des options
  function populateSelect(selector, options) {
    const select = document.querySelector(selector);
    if (!select) {
      console.error(`Élément ${selector} introuvable dans le DOM.`);
      return;
    }

    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
  }

  // Gestionnaire pour le changement de type via le select
  $('#select_AccessPerSession_Chart select').change(function () {
    chartType = $(this).val(); // Met à jour le type de graphique
    console.log('Type de graphique sélectionné :', chartType);
  });

  // Gestionnaire pour le clic sur le bouton filter
  $('#filterButton_NbrAccess').click(async () => {
    console.log("button 'filterButton_NbrAccess' clicked");
    $('#filterButton_NbrAccess').prop('disabled', true); // Désactiver le bouton pendant le chargement

    const startDate_NbrAccess = $('#startDate_NbrAccess').val();
    const endDate_NbrAccess = $('#endDate_NbrAccess').val();
    const organization = $('#organization').val();
    const zone = $('#zone').val();
    const hotspot = $('#hotspot').val();

    // Validation des dates avant d'envoyer la requête
    if (startDate_NbrAccess && isNaN(Date.parse(startDate_NbrAccess))) {
      console.error('Date de début invalide');
      $('#filterButton_NbrAccess').prop('disabled', false);
      return;
    }
    if (endDate_NbrAccess && isNaN(Date.parse(endDate_NbrAccess))) {
      console.error('Date de fin invalide');
      $('#filterButton_NbrAccess').prop('disabled', false);
      return;
    }

    // Envoi des dates et filtres au backend via fetch
    const parameters = new URL('http://localhost:3000/nbraccess');
    if (organization) parameters.searchParams.append('organization', organization);
    if (zone) parameters.searchParams.append('zone', zone);
    if (hotspot) parameters.searchParams.append('hotspot', hotspot);
    if (startDate_NbrAccess) parameters.searchParams.append('startDate_NbrAccess', startDate_NbrAccess);
    if (endDate_NbrAccess) parameters.searchParams.append('endDate_NbrAccess', endDate_NbrAccess);

    try {
      const response = await fetch(parameters);
      const data = await response.json();

      globalData = data;
      $('#filterButton_NbrAccess').prop('disabled', false);

      if (!data || data.length === 0) {
        throw new Error('Aucune donnée reçue');
      }

      // Appel de la fonction callData pour afficher les logs ou effectuer un traitement
      // callData(data);

      // Construction des graphiques après la réception des données
      buildAccessPerSessionChart(data, chartType);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      $('#filterButton_NbrAccess').prop('disabled', false);
    }
  });

  // Fonction callData pour afficher les logs ou effectuer un traitement
  function callData(data) {
    console.log("data :", data);
    console.log("Labels :", data.map(row => row.accesspointmac));
    console.log("Value1 :", data.map(row => row.nbraccess));
  }

  // Fonction pour construire le graphique
  function buildAccessPerSessionChart(data, chartType) {
    const labels = data.map(row => row.accesspointmac);
    const values = data.map(row => row.nbraccess);

    const ctx_AccessPerSession = document.getElementById('AccessPerSession_Chart').getContext('2d');
    if (window.AccessPerSessionChart) {
      console.log("Destruction de l'ancien graphique.");
      window.AccessPerSessionChart.destroy();
    }

    window.AccessPerSessionChart = new Chart(ctx_AccessPerSession, {
      type: chartType, // Utilise le type sélectionné
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
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw} accès`
            }
          }
        }
      }
    });

    console.log("Graphique créé avec succès :", window.AccessPerSessionChart);
  }

  // Initialisation des filtres au chargement de la page
  initializeFilters();
});