import {buildAccessPerSessionChart} from '../builders/BuildConnections.js';

document.addEventListener("DOMContentLoaded", function() {
  let checkChartExist = setInterval(() => {
    if (window.AccessPerSessionChart) {
      clearInterval(checkChartExist);
      attachEventListeners();
    }
  }); 
});


function attachEventListeners() {
$('#hide_AccessPerSession').click(() => {
  $('#CntDONUT').fadeToggle(220)
  $('#AccessPerSession_Chart').fadeToggle(220, function() {
    $('#hide_AccessPerSession').text($(this).is(':visible') ? 'hide the chart ?' : 'show the chart ?');
  });
  
});

  $("#resetButton_ConnectionTimeEvolution_Chart").click(function() {
    console.log("button 'resetButton_ConnectionTimeEvolution_Chart' clicked");

    if (window.AccessPerSessionChart) {
      buildAccessPerSessionChart()
        } 
        else {
        console.error("AccessPerSessionChart is not defined yet.");
    }
});


document.getElementById('download_AccessPerSession').addEventListener('click', function() {
  if (window.AccessPerSessionChart) {
    let a = document.createElement('a');
    a.href = window.AccessPerSessionChart.toBase64Image();
    a.download = 'AccessPerSession_Chart.jpg';
    a.click();
  } else {
    console.error("AccessPerSessionChart is not ready.");
  }
});

}