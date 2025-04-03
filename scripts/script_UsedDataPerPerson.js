import { buildUsedDataPerPersonChart, UsedDataPerpersonChart } from "../builders/BuildUsedDataPerPersonChart.js";

document.addEventListener("DOMContentLoaded", function() {
  let checkChartExist = setInterval(() => {
    if (window.UsedDataPerpersonChart) {
      clearInterval(checkChartExist);
      attachEventListeners();
    }
  }); 
});

function attachEventListeners() {
  $('#hide_UsedDataPerPerson_Chart').click(() => {
    $('#CntUsedDataPerPerson_Chart, #UsedDataPerPerson_Chart').fadeToggle(220, function () {
      $('#hide_UsedDataPerPerson_Chart').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
    });
  });

  $("#resetButton_UsedDataPerPerson_Chart").click(function () {
    console.log("button 'resetButton_UsedDataPerPerson_Chart' clicked");

    if (UsedDataPerpersonChart) {
      UsedDataPerpersonChart.destroy(); 
    }
    UsedDataPerpersonChart = buildUsedDataPerPersonChart();
  });

  $('download_UsedDataPerPerson_Chart').click (() => {
    if (UsedDataPerpersonChart) {
      let a = document.createElement('a');
      a.href = UsedDataPerpersonChart.toBase64Image();
      a.download = 'UsedDataPerPerson_Chart.jpg';
      a.click();
    } else {
      console.error("UsedDataPerPersonChart instance is not ready.");
    }
  });
}