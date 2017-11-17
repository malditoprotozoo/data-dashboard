// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);

// Creando las variables necesarias
var city = document.getElementById("city");







// var container = document.getElementById('container');
// console.log(container);

// for (var i = 0; i < data.SCL['2016-2'].students.length; i++) {
// 	console.log(data.SCL['2016-2'].students[i].name);
// 	var parrafo = document.createElement('p');
// 	var nodoParrafo = document.createTextNode('La estudiante número ' + [i+1] + ' es: ' + data.SCL['2016-2'].students[i].name);
// 		parrafo.appendChild(nodoParrafo);
// 		container.appendChild(parrafo);
// };

// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//   var data = google.visualization.arrayToDataTable([
//   ['Task', 'Hours per Day'],
//   ['Work', 8],
//   ['Friends', 2],
//   ['Eat', 2],
//   ['TV', 3],
//   ['Gym', 2],
//   ['Sleep', 7]
// ]);

//   // Optional; add a title and set the width and height of the chart
//   var options = {'title':'My Average Day', 'width':700, 'height':500};

//   // Display the chart inside the <div> element with id="piechart"
//   var chart = new google.visualization.PieChart(document.getElementById('piechart'));
//   chart.draw(data, options);
// }