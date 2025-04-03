import { buildConnectTimeEvoChart, resetCanvas_ConnectionTimeEvo } from '../constructors/BuildConnections.js';

document.addEventListener("DOMContentLoaded", function() {
    let checkChartExist = setInterval(() => {
      if (window.ConnectTimeEvoChart) {
        clearInterval(checkChartExist);
        // buildConnectTimeEvoChart();
        attachEventListeners();
      }
    }); 
  });

  function attachEventListeners() {
  $('#hide_ConnectionTimeEvolution_Chart').click(() => {
    $('#CntLINE').fadeToggle(220)
    $('#ConnectionTimeEvolution_Chart').fadeToggle(220, function() {
      $('#hide_ConnectionTimeEvolution_Chart').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
    });
  })

  
  // $("#resetButton_ConnectionTimeEvolution_Chart").click(function () {
  //   console.log("Bouton 'resetButton_ConnectionTimeEvolution_Chart' cliqué");
    
  //   resetCanvas_ConnectionTimeEvo();
  // });


  $('download_ConnectTimeEvoChart').click(() => {
    if (window.ConnectTimeEvoChart) {
      let a = document.createElement('a');
      a.href = window.ConnectTimeEvoChart.toBase64Image();
      a.download = 'ConnectionTimeEvolution_Chart.jpg';
      a.click();
    } else {
      console.error("ConnectionTimeEvolutionChart is not ready.");
    }
  });

}


