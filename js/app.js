// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);

// Creando las variables necesarias
var menu = document.getElementById("menu");
var city = document.getElementById("city");
var down = document.getElementById("down");
var genSCL20172 = data.SCL["2017-2"];
var sprintsSCL20172 = data.SCL["2017-2"].ratings.length;
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

/* Para calcular cuántas estudiantes llegan al promedio requerido hay que crear un array con
todas las estudiantes activas, que es lo que hará la siguiente función  */

var arrActiveStudents = (function(gen) {
	var arr = [];
	for (var i = 0; i < gen.students.length; i++) {
		if (gen.students[i].active === true) {
			arr.push(gen.students[i]);
		}
	}
	return arr;
});

/* HSE = 1200 puntos máximo --> el 70% son 840 pts. 
tech = 1800 puntos máximo --> el 70%  son 1260pts.*/

/* Función que calcula cuántas estudiantes cumplen la meta tech en Laboratoria en 
determinada generación y determinado sprint */

var achieveTechSkillsPerSprint = (function(gen, sprint) {
	var total = 0;
	for (var i = 0; i < arrActiveStudents(gen).length; i++) {
		if (arrActiveStudents(gen)[i].sprints[sprint-1].score.tech >= 1260) {
			total++;
		}
	}
	return total;
});

/* Función que crea un nuevo array con las estudiantes que cumplen la meta tech en Laboratoria
en determinada generación y determinado sprint */

var arrHighTechSkillsPerSprint = (function(gen, sprint) {
	var arr = [];
	for (var i = 0; i < arrActiveStudents(gen).length; i++) {
		if (arrActiveStudents(gen)[i].sprints[sprint-1].score.tech >= 1260) {
			arr.push(arrActiveStudents(gen)[i]);
		}
	}
	return arr;
});

/* Función que calcula el promedio de estudiantes que cumplieron la meta tech durante
todos los sprints disponibles */

var averageTechStudents = (function(gen, totalSprints) {
	var total = 0;
	for (var i = 1; i <= totalSprints; i++) {
		total += achieveTechSkillsPerSprint(gen, i);
	}
	return Math.round(total / totalSprints);
});

/* Función que calcula el porcentaje de alumnas que cumplieron la meta tech durante todos
los sprints disponibles */

var percentageTechStudents = (function(gen, totalSprints) {
	return Math.round((averageTechStudents(gen, totalSprints) * 100) / enrolledStudentsTotal(gen));
});

/* Función que calcula cuántas estudiantes cumplen la meta hse en Laboratoria en
determinada generación y determinado sprint */

var achieveHseSkillsPerSprint = (function(gen, sprint) {
	var total = 0;
	for (var i = 0; i < arrActiveStudents(gen).length; i++) {
		if (arrActiveStudents(gen)[i].sprints[sprint-1].score.hse >= 840) {
			total++;
		}
	}
	return total;
});

/* Función que crea un nuevo array con las estudiantes que cumplen la meta hse en Laboratoria
en determinada generación y determinado sprint */

var arrHighHseSkillsPerSprint = (function(gen, sprint) {
	var arr = [];
	for (var i = 0; i < arrActiveStudents(gen).length; i++) {
		if (arrActiveStudents(gen)[i].sprints[sprint-1].score.hse >= 840) {
			arr.push(arrActiveStudents(gen)[i]);
		}
	}
	return arr;
});

/* Función que calcula el promedio de estudiantes que cumplieron la meta hse durante
todos los sprints disponibles */

var averageHseStudents = (function(gen, totalSprints) {
	var total = 0;
	for (var i = 1; i <= totalSprints; i++) {
		total += achieveHseSkillsPerSprint(gen, i);
	}
	return Math.round(total / totalSprints);
});

var percentageHseStudents = (function(gen, totalSprints) {
	return Math.round((averageHseStudents(gen, totalSprints) * 100) / enrolledStudentsTotal(gen));
});


/* Función que calcula cuántas estudiantes cumplen con el mínimo requerido, sumando tech y hse */
var averageTotalStudents = (function(gen, totalSprints) {
	return Math.round(averageHseStudents(gen, totalSprints) + averageTechStudents(gen, totalSprints) / 2);
});

/* Función que calcula el porcentaje de estudiantes que cumplen con el mínimo requerido,
sumando tech y hse */

var percentageAchievementHsePlusTech = (function(gen, totalSprints) {
	return Math.round((averageTotalStudents(gen, totalSprints) * 100) / enrolledStudentsTotal(gen));
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
document.getElementById("target").innerHTML = averageTotalStudents(genSCL20172, sprintsSCL20172);
document.getElementById("total-percentage").innerHTML = percentageAchievementHsePlusTech(genSCL20172, sprintsSCL20172) + "%";
document.getElementById("tech-skills-count").innerHTML = averageTechStudents(genSCL20172, sprintsSCL20172);
document.getElementById("tech-skills-percentage").innerHTML = percentageTechStudents(genSCL20172, sprintsSCL20172) + "%";
document.getElementById("life-skills-counter").innerHTML = averageHseStudents(genSCL20172, sprintsSCL20172);
document.getElementById("life-skills-percentage").innerHTML = percentageHseStudents(genSCL20172, sprintsSCL20172) + "%";

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