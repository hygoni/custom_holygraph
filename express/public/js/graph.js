google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Experience'],
    ['2004',  1000],
    ['2005',  1170],
    ['2006',  660],
    ['2007',  1030]
  ]);

  var options = {
    title: 'Experience Graph',
    curveType: 'function',
    legend: { position: 'bottom' },
    width: 800,
    height: 400
  };

  var chart = new google.visualization.LineChart(document.getElementById('graph'));
  chart.draw(data, options);
}
