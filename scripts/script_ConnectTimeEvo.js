import { buildConnectTimeEvoChart, resetCanvas_ConnectionTimeEvo } from '../constructors/BuildConnections.js';


document.addEventListener("DOMContentLoaded", function() {
  let checkChartExist = setInterval(() => {
    if (window.UsedDataChart) {
      clearInterval(checkChartExist);
    }
  }); 
});
var ConnectTimeEvoChart;


$('#hide_ConnectionTimeEvolution_Chart').click(() => {
  $('#CntLINE').fadeToggle(220)
  $('#ConnectionTimeEvolution_Chart').fadeToggle(220, function() {
    $('#hide_ConnectionTimeEvolution_Chart').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
  });
})

 
$("#resetButton_ConnectionTimeEvolution_Chart").click(function () {
  console.log("Bouton 'resetButton_ConnectionTimeEvolution_Chart' cliqué");
  
  resetCanvas_ConnectionTimeEvo();
});

document.getElementById('download_ConnectTimeEvoChart').addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = ConnectTimeEvoChart.toBase64Image();
    a.download = 'ConnectionTimeEvolution_Chart.jpg';
    a.click();
  });