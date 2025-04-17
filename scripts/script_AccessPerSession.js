// import {buildAccessPerSessionChart} from '../builders/BuildConnections.js';
import "buildNbraccess.js";

document.addEventListener("DOMContentLoaded", function() {
  let checkChartExist = setInterval(() => {
    if (window.AccessPerSessionChart) {
      clearInterval(checkChartExist);
      attachEventListeners();
    }
  }); 
});

function attachEventListeners() {
  // Bouton pour cacher/afficher le graphique
  $('#hide_AccessPerSession').click(() => {
    $('#CntDONUT').fadeToggle(220);
    $('#AccessPerSession_Chart').fadeToggle(220, function() {
      $('#hide_AccessPerSession').text($(this).is(':visible') ? 'hide the chart ?' : 'show the chart ?');
    });
  });

  // Bouton pour télécharger le graphique
  document.getElementById('download_AccessPerSession').addEventListener('click', function() {
    if (window.AccessPerSessionChart) {
      let a = document.createElement('a');
      a.href = window.AccessPerSessionChart.toBase64Image();
      a.download = 'AccessPerSession_Chart.jpg';
      a.click();
    } else {
      console.error('AccessPerSessionChart is not ready.');
    }
  });
}