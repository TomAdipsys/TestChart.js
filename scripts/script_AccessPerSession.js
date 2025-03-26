import {buildAccessPerSessionChart} from '../constructors/BuildConnections.js';

var AccessPerSessionChart;

$('#hide_AccessPerSession').click(() => {
  $('#CntDONUT').fadeToggle(220)
  $('#AccessPerSession_Chart').fadeToggle(220, function() {
    $('#hide_AccessPerSession').text($(this).is(':visible') ? 'hide the chart ?' : 'show the chart ?');
  });
  
});


$('#resetButton_AccessPerSession_Chart').click(() => {
  AccessPerSessionChart.destroy();
  AccessPerSessionChart.update();
});


document.getElementById('download_AccessPerSession').addEventListener('click', function() {
  if (window.UsedDataChart) {
    let a = document.createElement('a');
    a.href = window.UsedDataChart.toBase64Image();
    a.download = 'AccessPerSession_Chart.jpg';
    a.click();
  } else {
    console.error("AccessPerSessionChart is not ready.");
  }
});