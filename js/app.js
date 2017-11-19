// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);

// Creando las variables necesarias
var menu = document.getElementById("menu");
var city = document.getElementById("city");
var down = document.getElementById("down");
var genSCL20172 = data.SCL["2017-2"];
var dropoutPercentage = 0;
var achievementStudents = 0;
var totalPercentage = 0;
var satisfaction = document.getElementById("student-sat-percentage");
var teacherRating = document.getElementById("teacher-rat-overall");
var jediRating = document.getElementById("jedi-rating-overall");

/* Función que determina el total de estudiantes inscritas en una generación determinada
de Laboratoria */

var totalStudents = (function (gen) {
	return gen.students.length;
});

/* Función que determina cuántas estudiantes están activas en determinada generación
en Laboratoria */

var enrolledStudentsTotal = (function (gen) {
	var enrolledStudents = 0;
	for (var i = 0; i < gen.students.length; i++) {
	if (gen.students[i].active === true) {
		enrolledStudents++;
	}
}
return enrolledStudents;

});

/* Función que determina cuántas estudiantes dejaron de estudiar en determinada generación
en Laboratoria */

var dropoutStudentsTotal = (function (gen) {
	var dropoutStudents = 0;
	for (var i = 0; i < gen.students.length; i++) {
	if (gen.students[i].active === false) {
		dropoutStudents++;
	}
}
return dropoutStudents;

});

/* Función que calcula cuál es el porcentaje de estudiantes que abandonaron Laboratoria
en determinada generación */

/* Math.round() es una función que sirve para redondear números */

var dropoutPercentage = (function (gen) {
	return Math.round((dropoutStudentsTotal(gen) * 100) / totalStudents(gen));
});

/* Función que convierte todos los elementos con clase "total" en el número total de
estudiantes activas en Laboratoria en x generación */

var changeTotalStudentsSpan = (function(gen) {
	var everyTotalSpan = document.getElementsByClassName("total-number");
	for (var i = 0; i < everyTotalSpan.length; i++) {
		everyTotalSpan[i].innerHTML = enrolledStudentsTotal(gen);
	}
});

/* Función que cuantas estudiantes cumplen con las metas propuestas por Laboratoria */

var studentsThatAchieve = (function (gen) {
	var total = 0;
	for (var i = 0; i < gen.ratings.length; i++) {
		total += ((enrolledStudentsTotal(gen) * gen.ratings[i].student.cumple) / 100);
	}
	return Math.round(total / gen.ratings.length);
});

/* Función que calcula el porcentaje de estudiantes que cumplen con las metas, de entre
las estudiantes activas */

var percentageOfAchievement = (function(gen) {
	return Math.round((studentsThatAchieve(gen) * 100) / enrolledStudentsTotal(gen));
});

/* Función que calcula cuántas estudiantes no cumplen con las metas */

var studentsThatDontAchieve = (function() {
	var total = 0;
	for (var i = 0; i < gen.ratings.length; i++) {
		total += ((enrolledStudentsTotal(gen) * gen.ratings[i].student["no-cumple"]) / 100);
	}
	return Math.round(total / gen.ratings.length);
});

/* Función que calcula el porcentaje promedio de estudiantes que promoverían Laboratoria */

var promotersAveragePercentage = (function(gen) {
	var total = 0;
	for (var i = 0; i < gen.ratings.length; i++) {
		total += gen.ratings[i].nps.promoters;
	}
	return Math.round(total / gen.ratings.length);
});

/* Función que calcula el porcentaje promedio de estudiantes que ni promovería ni no promovería
Laboratoria */

var passiveAveragePercentage = (function(gen) {
	var total = 0;
	for (var i = 0; i < gen.ratings.length; i++) {
		total += gen.ratings[i].nps.passive;
	}
	return Math.round(total / gen.ratings.length);
});

/* Función que calcula el porcentaje de estudiantes que no promoverían Laboratoria */ 

var detractorsAveragePercentage = (function(gen) {
	var total = 0;
	for (var i = 0; i < gen.ratings.length; i++) {
		total += gen.ratings[i].nps.detractors;
	}
	return Math.round(total / gen.ratings.length);
});

/* Función que calcula el NPS */ 

var calculateNPS = (function(gen) {
	return Math.round(promotersAveragePercentage(gen) - detractorsAveragePercentage(gen));
});

/* Calculando los datos para el Overview, en dónde se presentara la info de la generación
actual en Santiago de Chile */

document.getElementById("enrolled").innerHTML = enrolledStudentsTotal(genSCL20172);
document.getElementById("drop-percentage").innerHTML = dropoutPercentage(genSCL20172) + "%";
changeTotalStudentsSpan(genSCL20172);
document.getElementById("promoters").innerHTML = promotersAveragePercentage(genSCL20172) + "% ";
document.getElementById("passive").innerHTML = passiveAveragePercentage(genSCL20172) + "% ";
document.getElementById("detractors").innerHTML = detractorsAveragePercentage(genSCL20172) + "% ";
document.getElementById("nps-counter").innerHTML = calculateNPS(genSCL20172) + "%";


/* Para calcular cuántas estudiantes llegan al promedio requerido hay  */





// var arrayActiveStudents = (function() {
// 	var activeArray = [];
// 	for (var i = 0; i < data.SCL["2017-2"].students.length; i++) {
// 		if (data.SCL["2017-2"].students[i].active == true) {
// 			activeArray.push(data.SCL["2017-2"].students[i]);
// 		} 
// 	}
// 	return activeArray;
// });





google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var dataRandom = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Friends', 2],
  ['Eat', 2],
  ['TV', 3],
  ['Gym', 2],
  ['Sleep', 7]
])};




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