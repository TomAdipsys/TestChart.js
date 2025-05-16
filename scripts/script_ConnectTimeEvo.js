  $('#hide_ConnectionTimeEvolution_Chart').click(() => {
    $('#CntLINE').fadeToggle(220)
    $('#ConnectionTimeEvolution .field').fadeToggle(220);
    $('#select_ConnectionTimeEvo_Chart').fadeToggle(220);
    $('#download_ConnectTimeEvoChart').fadeToggle(220);
    $('#resetButton_ConnectionTimeEvo_Chart').fadeToggle(220);
    $('#ConnectionTimeEvolution_Chart').fadeToggle(220, function() {
      $('#hide_ConnectionTimeEvolution_Chart').text($(this).is(':visible') ? 'hide the chart' : 'show the chart');
    });
  })

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


