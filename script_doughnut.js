// Récupérer les données depuis le serveur Express

var myChart;
fetch('http://localhost:3000/hm_stats')
  .then(res => res.json())
  .then(data => {

    console.log(data); 

    const labels = data.map(row => row.accesspointmac);  
    const values = data.map(row => row.nb);              

    const ctx_doughnut = document.getElementById('doughnut_Chart').getContext('2d');
    myChart = new Chart(ctx_doughnut, {
      type: 'doughnut',  
      data: {
        labels: labels,  // "accesspointmac"
        datasets: [{
          label: 'Nombre d\'accès',
          data: values,  // "nb"
        //   backgroundColor : [
        //     `rgb(255, 99, 132)`,
        //     'rgb(54, 162, 235)',
        //   ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' accès';
              }
            }
          }
        }
      }
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données :', error));

  $('#hide_doughnut').click(function() {
    if ($("#doughnut_Chart").is(":visible")) {
        console.log("button 'hide the doughnut' clicked");
        $("#doughnut_Chart").fadeOut();
        $("#hide_doughnut").text('show the doughnut');
    } else {
        console.log("button 'show the doughnut' clicked");
        $("#doughnut_Chart").fadeIn();
        $("#hide_doughnut").text('hide the doughnut');
    }
});

$("#resetButton_doughnut_Chart").on('click', function() {
    console.log("button resetButton_doughnut_Chart clicked");
    console.log(myChart);
    myChart.update();
})


document.getElementById('download_doughnut').addEventListener('click', function() {
  var a = document.createElement('a');
  a.href = window.myChartLine.toBase64Image();
  a.download = 'line_chart.jpg';
  a.click();
});