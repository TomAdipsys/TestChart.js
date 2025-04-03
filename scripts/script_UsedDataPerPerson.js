import { buildUsedDataPerPersonChart } from "../constructors/BuildUsedDataPerPersonChart.js";

document.addEventListener("DOMContentLoaded", function() {
  let checkChartExist = setInterval(() => {
    if (window.buildUsedDataPerPersonChart) {
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

  $("#resetButton_UsedDataPerPerson_Chart").click(function() {
    console.log("button 'resetButton_UsedDataPerPerson_Chart' clicked");

    if (window.buildUsedDataPerPersonChart) {
        buildUsedDataPerPersonChart()
        } 
        else {
        console.error("UsedDataChartPerPerson is not defined yet.");
    }
});


  document.getElementById('download_UsedDataPerPerson_Chart').addEventListener('click', function() {
    if (window.buildUsedDataPerPersonChart) {
      let a = document.createElement('a');
      a.href = window.buildUsedDataPerPersonChart.toBase64Image();
      a.download = 'UsedData_Chart.jpg';
      a.click();
    } else {
      console.error("buildUsedDataPerPersonChart is not ready.");
    }
  });
}
