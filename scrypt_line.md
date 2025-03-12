document.addEventListener('DOMContentLoaded', function() {
  let initialData;

  fetch('http://localhost:3000/hm_stats')
    .then(res => res.json())
    .then(data => {
      const labels_line = data.map(row => row.acctstarttime);
      const values_line = data.map(row => row.nb);

      initialData = {
        labels: labels_line,
        datasets: [{
          label: 'Temps de connexion',
          data: values_line,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: true,
          tension: 0,
        }]
      };

      const ctx_line = document.getElementById('line_Chart').getContext('2d');
      window.myChartLine = new Chart(ctx_line, {
        type: 'line',
        data: initialData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw + ' secondes';
                }
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Date de connexion'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Temps de connexion (secondes)'
              }
            }
          }
        }
      });

      document.getElementById('download_line').addEventListener('click', function() {
        var a = document.createElement('a');
        a.href = window.myChartLine.toBase64Image();
        a.download = 'line_chart.jpg';
        a.click();
      });

      $('#hide_line_Chart').click(function() {
        if ($("#line_Chart").is(":visible")) {
          $("#line_Chart").fadeOut();
          $("#hide_line_Chart").text('show the line');
        } else {
          $("#line_Chart").fadeIn();
          $("#hide_line_Chart").text('hide the line');
        }
      });

      $("#resetButton_line_Chart").click(function() {
        if (window.myChartLine) {
          window.myChartLine.data = initialData;
          window.myChartLine.update();
        }
      });
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));
});
