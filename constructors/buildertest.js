import Chart from "chart.js/auto";
import moment from "moment";

document.addEventListener("DOMContentLoaded", fetchDataAndBuildCharts);

function fetchDataAndBuildCharts() {
  fetch('http://localhost:3000/connections')
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        throw new Error('Aucune donnée reçue');
      }
      buildAccessPerSessionChart(data);
      buildConnectTimeEvoChart(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));
}

let connectTimeEvoChart;

document.addEventListener("DOMContentLoaded", function () {
  // Initial fetch with default date range
  const MIN_DATE = "2023-08-01T00:00:00";
  const MAX_DATE = "2023-09-01T00:00:00";
  fetchAndBuildChart(MIN_DATE, MAX_DATE);

  // Event listener for the filter button
  document.getElementById("filterButton").addEventListener("click", function () {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    if (startDate && endDate) {
      fetchAndBuildChart(startDate, endDate);
    }
  });
});

function fetchAndBuildChart(startDate, endDate) {
  data
    .load({
      measures: ["Orders.count"],
      timeDimensions: [
        {
          dimension: "Orders.createdAt",
          granularity: "day",
          dateRange: [startDate, endDate],
        },
      ],
    })
    .then((resultSet) => {
      if (connectTimeEvoChart) {
        connectTimeEvoChart.data = formatChartData(resultSet);
        connectTimeEvoChart.update();
      } else {
        buildConnectTimeEvoChart(resultSet);
      }
    })
    .catch((error) => console.error("Erreur lors de la récupération des données :", error));
}

function buildConnectTimeEvoChart(resultSet) {
  const ctx = document.getElementById("ConnectionTimeEvolution_Chart").getContext("2d");
  connectTimeEvoChart = new Chart(ctx, {
    type: "line",
    data: formatChartData(resultSet),
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} commandes`,
          },
        },
      },
      scales: {
        x: { title: { display: true, text: "Date" } },
        y: { title: { display: true, text: "Nombre de commandes" } },
      },
    },
  });
}

function formatChartData(resultSet) {
  return {
    labels: resultSet.categories().map((c) => moment(c.x).format("DD MMM")),
    datasets: [
      {
        label: "Nombre de commandes",
        data: resultSet.chartPivot().map((r) => r["Orders.count"]),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };
}

document.getElementById("resetButton_ConnectionTimeEvolution_Chart").addEventListener("click", function () {
  const startDate = "2020-08-01T00:00:00";
  const endDate = "2020-09-01T00:00:00";
  fetchAndBuildChart(startDate, endDate);
});
