import { buildUsedDataChart } from "../builders/BuildUsedDataStatsChart.js";

  $('#hide_UsedData_Chart').click(() => {
    $('#useddatachart .field').fadeToggle(220);
    $('#CntUsedData_Chart').fadeToggle(220);
    $('#select_UsedData_Chart').fadeToggle(220);
    $('#download_UsedData_Chart').fadeToggle(220);
    $('#resetButton_UsedData_Chart').fadeToggle(220);

    $('#UsedData_Chart').fadeToggle(220, function () {
      $('#hide_UsedData_Chart').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
    });
  });

  // $('#hide_AccessPerSession').click(() => {
  //   $('#CntDONUT').fadeToggle(220);
  //   $('#AccessPerSession .field').fadeToggle(220);
  //   $('#select_AccessPerSession_Chart').fadeToggle(220);
  //   $('#download_AccessPerSession').fadeToggle(220);
  //   $('#resetButton_AccessPerSession_Chart').fadeToggle(220);
  //   $('#AccessPerSession_Chart').fadeToggle(220, function() {
  //     $('#hide_AccessPerSession').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
  //   });
  // });

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
