// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);

// Creando las variables necesarias
var menu = document.getElementById("menu");
var city = document.getElementById("city");
var down = document.getElementById("down");
var enrolledStudents = 0;
var dropoutPercentage = 0;
var achievementStudents = 0;
var totalPercentage = 0;
var satisfaction = document.getElementById("student-sat-percentage");
var teacherRating = document.getElementById("teacher-rat-overall");
var jediRating = document.getElementById("jedi-rating-overall");


/* Ciclo for que determina cuántas estudiantes están actualmente estudiando
en Laboratoria */
for (var i = 0; i < data.SCL["2017-2"].students.length; i++) {
	if (data.SCL["2017-2"].students[i].active == true) {
		enrolledStudents++;
	}
}

document.getElementById("enrolled").innerHTML = enrolledStudents;

/* Antes de sacar el porcentaje, veamos cuál fue el total de estudiantes inscritas
en el segundo semestre del 2017 */
var total20172 = data.SCL["2017-2"].students.length;

/* Ciclo for que determina cuántas estudiantes dejaron de estudiar en Laboratoria
durante el segundo semestre de Laboratoria 2017 */
var drops = 0;

for (var i = 0; i < data.SCL["2017-2"].students.length; i++) {
	if (data.SCL["2017-2"].students[i].active == false) {
		drops++;
	}
}

/* Ahora, con la cifra de alumnas que dejaron Laboratoria y el total, podemos
sacar el porcentaje */
dropoutPercentage = Math.round((drops * 100) / total20172);

/* Math.round() es una función que sirve para redondear números */
document.getElementById("drop-percentage").innerHTML = dropoutPercentage + "%";

/* Ahora hay que sacar el número de estudiantes que cumplen con las metas de Lab 
actualmente. Para eso, usamos la fórmula para sacar el número de un porcentaje y sumamos
el resultado entre todos los sprints disponibles y luego el resultado se divide por la cantidad
de sprints (o sea, el largo de ratings) y tenemos el número total de estudiantes.
Además realizamos el cálculo de aquellos que no cumplen y aquellos que superan las expectativas,
en caso de que sean necesarios */

/* Es necesario crear una nueva variable en dónde se resten las estudiantes que no siguen
activas en Laboratoria */
var totalActive20172 = total20172 - drops;

var sumAchievements = (function () {
	var total = 0;
	for (var i = 0; i < data.SCL["2017-2"].ratings.length; i++) {
		total += ((totalActive20172 * data.SCL["2017-2"].ratings[i].student.cumple) / 100);
	}
	return total;
});

var achieve = sumAchievements () / data.SCL["2017-2"].ratings.length;

achievementStudents = Math.round(achieve);
document.getElementById("target").innerHTML = achievementStudents;

 /* Ahora, sacamos el porcentaje de estudiantes que cumplen con la meta */
totalPercentage = Math.round((achieve * 100) / totalActive20172);
document.getElementById("total-percentage").innerHTML = totalPercentage;

var sumDontAchievements = (function () {
	var total = 0;
	for (var i = 0; i < data.SCL["2017-2"].ratings.length; i++) {
		total += ((totalActive20172 * data.SCL["2017-2"].ratings[i].student["no-cumple"]) / 100);
	}
	return total;
});

var dontAchieve = sumDontAchievements() / data.SCL["2017-2"].ratings.length;

var sumExeedements = (function () {
	var total = 0;
	for (var i = 0; i < data.SCL["2017-2"].ratings.length; i++) {
		total += ((totalActive20172 * data.SCL["2017-2"].ratings[i].student.supera) / 100);
	}
	return total;
});

 var exceede = sumExeedements() / data.SCL["2017-2"].ratings.length;



/* Ahora vamos a obtener el número de estudiantes satisfechas con Laboratoria */
var sumPromoters = (function () {
	var total = 0;
	for (var i = 0; i < data.SCL["2017-2"].ratings.length; i++) {
		total += data.SCL["2017-2"].ratings[i].nps.promoters;
	}
	return total;
});

document.getElementById("promoters").innerHTML = Math.round(sumPromoters() / data.SCL["2017-2"].ratings.length) + "% ";

/* Ahora el número de neutrales */
var sumPassive = (function () {
	var total = 0;
	for (var i = 0; i < data.SCL["2017-2"].ratings.length; i++) {
		total += data.SCL["2017-2"].ratings[i].nps.passive;
	}
	return total;
});

document.getElementById("passive").innerHTML = Math.round(sumPassive() / data.SCL["2017-2"].ratings.length) + "% ";

/* Y ahora el número de detractoras */
var sumDetractors = (function () {
	var total = 0;
	for (var i = 0; i < data.SCL["2017-2"].ratings.length; i++) {
		total += data.SCL["2017-2"].ratings[i].nps.detractors;
	}
	return total;
});

document.getElementById("detractors").innerHTML = Math.round(sumDetractors() / data.SCL["2017-2"].ratings.length) + "% ";

/* Ahora el total del porcentaje de NPS */
document.getElementById("nps-counter").innerHTML = Math.round((sumPromoters() - sumDetractors()) / data.SCL["2017-2"].ratings.length) + "%";

/* Vamos a hacer que todos los elementos con la clase "total-number" tengan
por valor el número total de estudiantes activas en Laboratoria */

var totalNumberSpan = document.getElementsByClassName("total-number"); 
for (var i = 0; i < totalNumberSpan.length; i++) {
	totalNumberSpan[i].innerHTML = totalActive20172;
};

/* Para calcular cuántas estudiantes llegan a la meta requerida de habilidades técnicas
tenemos que crear un ciclo for que añada las estudiantes activas en un sólo array */

var arrayActiveStudents = (function() {
	var activeArray = [];
	for (var i = 0; i < data.SCL["2017-2"].students.length; i++) {
		if (data.SCL["2017-2"].students[i].active == true) {
			activeArray.push(data.SCL["2017-2"].students[i]);
		} 
	}
	return activeArray;
});

/* Teniendo listo el nuevo array con las estudiantes activas, creamos un ciclo for que
lo recorra y nos diga cuales tienen puntajes técnicos altos en cada sprint */



var techSkillsAchivement = (function() {
	var arrayOfHighTechScores = [];
	for (var i = 0; i < arrayActiveStudents().length; i++) {
		for (var n = 0; n < arrayActiveStudents()[i].sprints.length; n++) {
			if (arrayActiveStudents()[i].sprints[n].score.tech >= 1260) {
				arrayOfHighTechScores.push(arrayActiveStudents()[i]);
			}
		}
	}
	return arrayOfHighTechScores;	
});

// var newStudent = {};
// data.SCL["2017-2"].students.push(newStudent);
// var total20172 = data.SCL["2017-2"].students.length;







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