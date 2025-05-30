document.addEventListener("DOMContentLoaded", () => {
  let globalData = [];
  let chartType = 'line'; 
  let filters;

  $('#zone').hide();
  $('#hotspot').hide();
  async function fetchFilters() {
    try {
      const response = await fetch('http://localhost:3000/filters');
      const data = await response.json();
      // console.log("Filtres récupérés :", data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des filtres :', error);
    }
  }

  async function initializeFilters() {
    filters = await fetchFilters();

    if (filters) {
      populateSelect('#organization', filters.organizations);
      populateSelect('#zone', []);
      populateSelect('#hotspot', []);

    } else {
      console.error("Aucun filtre récupéré.");
    }
  }

  function populateSelect(selector, options) {
    const select = $(selector);
    if (!select) {
      console.error(`Élément ${selector} introuvable dans le DOM.`);
      return;
    }

    select.empty().append('<option value="">Sélectionner...</option>');


    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.uuid;
      opt.textContent = option.name;
      select.append(opt);
    });
  }

  $('#organization').change(function () {
    const selectedOrgUuid = $(this).val();
    const filteredZones = filters.zones.filter(zone => zone.organizationUUID === selectedOrgUuid);
    populateSelect('#zone', filteredZones);
    populateSelect('#hotspot', []);
    $("#zone").show();
    $("#hotspot").hide();
  });


  $('#zone').change(function () {
    const selectedZoneUuid = $(this).val();
    const filteredHotspots = filters.hotspots.filter(hotspot => hotspot.zoneUUID === selectedZoneUuid);
    populateSelect('#hotspot', filteredHotspots);
    $("#hotspot").val("").change(); // Réinitialiser la sélection du hotspot
    $("#hotspot").show();
  });















  function getNameByUuid(options, uuid) {
    const found = options.find(opt => opt.uuid === uuid);
    return found ? found.name : undefined;
  }

  $('#select_AccessPerSession_Chart select').change(function () {
    chartType = $(this).val(); 
  });

  $('#filterButton_NbrAccess').click(async () => {
    // console.log("button 'filterButton_NbrAccess' clicked");
    $('#filterButton_NbrAccess').prop('disabled', true); 

    const startDate_NbrAccess = $('#startDate_NbrAccess').val();
    const endDate_NbrAccess = $('#endDate_NbrAccess').val();
    const organizationUuid = $('#organization').val();
    const zoneUuid = $('#zone').val();
    const hotspotUuid = $('#hotspot').val();

    const organization = getNameByUuid(filters.organizations, organizationUuid);
    const zone = getNameByUuid(filters.zones, zoneUuid);
    const hotspot = getNameByUuid(filters.hotspots, hotspotUuid);

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

      const dataString = JSON.stringify(data);
      const sizeBytes = new Blob([dataString]).size;
      console.log(`Taille des données reçues : ${sizeBytes} octets (${(sizeBytes/1024).toFixed(2)} Ko)`);

      // globalData = data;

      $('#filterButton_NbrAccess').prop('disabled', false);

      if (!data || data.length === 0) {
        throw new Error('Aucune donnée reçue');
      }

      // callData(data);

      buildAccessPerSessionChart(data, chartType);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      $('#filterButton_NbrAccess').prop('disabled', false);
    }
  });

  function callData(data) {
    console.log("data :", data);
    console.log("Labels :", data.map(row => row.accesspointmac));
    console.log("Value1 :", data.map(row => row.nbraccess));
  }

  function buildAccessPerSessionChart(data, chartType) {
    const labels = data.map(row => row.accesspointmac);
    const values = data.map(row => row.nbraccess);

    const ctx_AccessPerSession = document.getElementById('AccessPerSession_Chart').getContext('2d');
    if (window.AccessPerSessionChart) {
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

  }

  initializeFilters();
});