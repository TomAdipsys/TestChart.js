import { buildUsedDataChart } from "../builders/BuildUsedDataStatsChart.js";

document.addEventListener("DOMContentLoaded", function() {
  let checkChartExist = setInterval(() => {
    if (window.UsedDataChart) {
      clearInterval(checkChartExist);
      attachEventListeners();
    }
  }); 
});

function attachEventListeners() {
  $('#hide_UsedData_Chart').click(() => {
    $('#CntUsedData_Chart, #UsedData_Chart').fadeToggle(220, function () {
      $('#hide_UsedData_Chart').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
    });
  });

  $("#resetButton_UsedData_Chart").click(function() {
    console.log("button 'resetButton_UsedData_Chart' clicked");

    if (window.UsedDataChart) {
      buildUsedDataChart()
        } 
        else {
        console.error("UsedDataChart is not defined yet.");
    }
});


  document.getElementById('download_UsedData_Chart').addEventListener('click', function() {
    if (window.UsedDataChart) {
      let a = document.createElement('a');
      a.href = window.UsedDataChart.toBase64Image();
      a.download = 'UsedData_Chart.jpg';
      a.click();
    } else {
      console.error("UsedDataChart is not ready.");
    }
  });
}
