import { buildUsedDataPerPersonChart, UsedDataPerpersonChart } from "../builders/BuildUsedDataPerPersonChart.js";

  $('#hide_UsedDataPerPerson_Chart').click(() => {
    $('#useddataperpersonchart .field').fadeToggle(220);
    $('#CntUsedDataPerPerson_Chart').fadeToggle(220);
    $('#select_UsedDataPerPerson_Chart').fadeToggle(220);
    $('#download_UsedDataPerPerson_Chart').fadeToggle(220);
    $('#resetButton_UsedDataPerPerson_Chart').fadeToggle(220);

    $('#UsedDataPerPerson_Chart').fadeToggle(220, function () {
      $('#hide_UsedDataPerPerson_Chart').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
    });
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
