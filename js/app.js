// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);

// Creando las variables necesarias
var menu = document.getElementById("menu");
var city = document.getElementById("city");
var dropdownCity = document.getElementById("dropdown-city-menu");
var content = document.getElementById("content");
var navbar = document.getElementById("navbar");
var divData = document.getElementById("data");
var overview = document.getElementById("overview");
var overviewContent = document.getElementById("overview-content");
var timeSpan = document.getElementById("date-time");

/* Variables de Arequipa, 2º semestre 2016*/
var aqp20162 = document.getElementById("aqp-20162");
var genAQP20162 = data.AQP["2016-2"];
var sprintsAQP20162 = data.AQP["2016-2"].ratings.length;

/* Variables de Arequipa, 1º semestre 2017*/
var aqp20171 = document.getElementById("aqp-20171");
var genAQP20171 = data.AQP["2017-1"];
var sprintsAQP20171 = data.AQP["2017-1"].ratings.length;

/* Variables de CDMX, 1º semestre 2017*/
var cdmx20171 = document.getElementById("cdmx-20171");
var genCDMX20171 = data.CDMX["2017-1"];
var sprintsCDMX20171 = data.CDMX["2017-1"].ratings.length;

/* Variables de CDMX, 2º semestre 2017*/
var cdmx20172 = document.getElementById("cdmx-20172");
var genCDMX20172 = data.CDMX["2017-2"];
var sprintsCDMX20172 = data.CDMX["2017-2"].ratings.length;

/* Variables de Lima, 2º semestre 2016*/
var lim20162 = document.getElementById("lim-20162");
var genLIM20162 = data.LIM["2016-2"];
var sprintsLIM20162 = data.LIM["2016-2"].ratings.length;

/* Variables de Lima, 1º semestre 2017*/
var lim20171 = document.getElementById("lim-20171");
var genLIM20171 = data.LIM["2017-1"];
var sprintsLIM20171 = data.LIM["2017-1"].ratings.length;

/* Variables de Lima, 2º semestre 2017*/
var lim20172 = document.getElementById("lim-20172");
var genLIM20172 = data.LIM["2017-2"];
var sprintsLIM20172 = data.LIM["2017-2"].ratings.length;

/* Definiendo las variables del segundo semestre del 2016 en Santiago */
var scl20162 = document.getElementById("scl-20162");
var genSCL20162 = data.SCL["2016-2"];
var sprintsSCL20162 = data.SCL["2016-2"].ratings.length;
/* Definiendo las variables del primer semestre del 2017 en Santiago */
var scl20171 = document.getElementById("scl-20171");
var genSCL20171 = data.SCL["2017-1"];
var sprintsSCL20171 = data.SCL["2017-1"].ratings.length;
/* Definiendo las variables del segundo semestre del 2017 en Santiago */
var scl20172 = document.getElementById("scl-20172");
var genSCL20172 = data.SCL["2017-2"];
var sprintsSCL20172 = data.SCL["2017-2"].ratings.length;

var satisfaction = document.getElementById("student-sat-percentage");
var teacherRating = document.getElementById("teacher-rat-overall");
var jediRating = document.getElementById("jedi-rating-overall");

/* Agrega evento al div city. Si se hace click en elegir una locación, se abrirá un menú */
city.addEventListener("click", function(event) {
    if (dropdownCity.classList.contains("invisible")) {
        dropdownCity.classList.remove("invisible");
        dropdownCity.classList.add("visible");
    } else {
        dropdownCity.classList.add("invisible");
        dropdownCity.classList.remove("visible");
    }

});

/* Si se hace click fuera del menú, en la navbar o en el contenido del sitio
el menú anterior se cerrará */
window.onclick = function(event) {
    if (event.target == content || event.target == navbar && dropdownCity.classList.contains("visible")) {
        dropdownCity.classList.remove("visible");
        dropdownCity.classList.add("invisible");
    }
};

/* Función que determina el total de estudiantes inscritas en una generación determinada
de Laboratoria */
var totalStudents = (function(gen) {
    return gen.students.length;
});

/* Función que determina cuántas estudiantes están activas en determinada generación
en Laboratoria en la actualidad*/
var enrolledStudentsTotal = (function(gen) {
    var enrolledStudents = 0;
    for (var i = 0; i < gen.students.length; i++) {
        if (gen.students[i].active === true) {
            enrolledStudents++;
        }
    }
    return enrolledStudents;

});

/* Función que determina cuántas estudiantes han estado activas por sprint */
var enrolledStudentsPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined) {
            total++;
        }
    }
    return total;
});

/* Función que establece el promedio de estudiantes activas */
var averageEnrolledStudents = (function(gen, totalSprints) {
    var total = 0;
    for (var i = 1; i <= totalSprints; i++) {
        total += enrolledStudentsPerSprint(gen, i);
    }
    return total/totalSprints;
});


/* Función que determina cuántas estudiantes dejaron de estudiar en determinada generación
en Laboratoria, en total NO POR SPRINT */
var dropoutStudentsTotal = (function(gen) {
    var dropoutStudents = 0;
    for (var i = 0; i < gen.students.length; i++) {
        if (gen.students[i].active === false) {
            dropoutStudents++;
        }
    }
    return dropoutStudents;

});

/* Función que calcula cuál es el porcentaje de estudiantes que abandonaron Laboratoria
en determinada generación, en total NO POR SPRINT */

/* Math.round() es una función que sirve para redondear números */
var dropoutPercentage = (function(gen) {
    return Math.round((dropoutStudentsTotal(gen) * 100) / totalStudents(gen));
});

/* Función que convierte todos los elementos con clase "total" en el número total de
estudiantes inscritas en Laboratoria en x generación */
var changeTotalStudentsSpan = (function(gen) {
    var everyTotalSpan = document.getElementsByClassName("total-number");
    for (var i = 0; i < everyTotalSpan.length; i++) {
        everyTotalSpan[i].innerHTML = totalStudents(gen);
    }
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

/* Función que calcula el NPS global */
var calculateNPS = (function(gen) {
    return Math.round(promotersAveragePercentage(gen) - detractorsAveragePercentage(gen));
});

/* Función que calcula el NPS por sprint */

var calculateNpsPerSprint = (function(gen, sprint) {
    if (gen.ratings[sprint - 1] !== undefined) {
        var result = (gen.ratings[sprint - 1].nps.promoters - gen.ratings[sprint - 1].nps.detractors);
    }
    return result;
});

/* Función que crea un array con las estudiantes activas  */
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
determinada generación y determinado sprint.
Esta función irá sumando 1 a la variable total cada vez que una estudiante tenga x sprint no vacío y cumpla el porcentaje
requerido */
var achieveTechSkillsPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined && gen.students[i].sprints[sprint - 1].score.tech >= 1260) {
            total++;
        }
    }
    return total;
});

/* Función que calcula cuántas estudiantes no cumplen con la meta tech en determinada generación y determinado sprint */
var dontAchieveTechSkillsPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined && gen.students[i].sprints[sprint - 1].score.tech <= 1260) {
            total++;
        }
    }
    return total;
});


/* Función que crea un nuevo array con las estudiantes que cumplen la meta tech en Laboratoria
en determinada generación y determinado sprint */
var arrHighTechSkillsPerSprint = (function(gen, sprint) {
    var arr = [];
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined && gen.students[i].sprints[sprint - 1].score.tech >= 1260) {
            arr.push(gen.students[i]);
        }
    }
    return arr;
});

/* Función que crea un array con la cantidad de estudiantes que obtuvieron altos puntajes en tech por sprint */
var averagesTechPerSprints = (function(gen, totalSprints) {
	var arr = [];
	for (var i = 1; i <= totalSprints; i++) {
		arr.push(achieveTechSkillsPerSprint(gen, i));
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
    return parseInt(total / totalSprints);
});

var averageFailsTechStudents = (function(gen, totalSprints) {
    var total = 0;
    for (var i = 1; i <= totalSprints; i++) {
        total += dontAchieveTechSkillsPerSprint(gen, i);
    }
    return parseInt(total / totalSprints);
});

/* Función que calcula el porcentaje de alumnas que cumplieron la meta tech durante todos
los sprints disponibles */
var percentageTechStudents = (function(gen, totalSprints) {
    return Math.round((averageTechStudents(gen, totalSprints) * 100) / totalStudents(gen));
});

/* Función que calcula cuántas estudiantes cumplen la meta hse en Laboratoria en
determinada generación y determinado sprint */
var achieveHseSkillsPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined && gen.students[i].sprints[sprint - 1].score.hse >= 840) {
            total++;
        }
    }
    return total;
});

var dontAchieveHseSkillsPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined && gen.students[i].sprints[sprint - 1].score.hse <= 840) {
            total++;
        }
    }
    return total;
});

/* Función que crea un nuevo array con las estudiantes que cumplen la meta hse en Laboratoria
en determinada generación y determinado sprint */
var arrHighHseSkillsPerSprint = (function(gen, sprint) {
    var arr = [];
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined && gen.students[i].sprints[sprint - 1].score.hse >= 840) {
            arr.push(gen.students[i]);
        }
    }
    return arr;
});

/* Función que crea un array con la cantidad de estudiantes que obtuvieron altos puntajes en HSE por Sprint */
var averagesHsePerSprints = (function(gen, totalSprints) {
    var arr = [];
    for (var i = 1; i <= totalSprints; i++) {
        arr.push(achieveHseSkillsPerSprint(gen, i));
    }
    return arr;
});

/* Función que cuenta cuantas estudiantes en promedio no cumplieron las metas de HSE */
var averageFailsHseStudents = (function(gen, totalSprints) {
    var total = 0;
    for (var i = 1; i <= totalSprints; i++) {
        total += dontAchieveHseSkillsPerSprint(gen, i);
    }
    return parseInt(total / totalSprints);
});

/* Función que calcula el promedio de estudiantes que cumplieron la meta hse durante
todos los sprints disponibles */
var averageHseStudents = (function(gen, totalSprints) {
    var total = 0;
    for (var i = 1; i <= totalSprints; i++) {
        total += achieveHseSkillsPerSprint(gen, i);
    }
    return parseInt(total / totalSprints);
});

/* Función que calcula el porcentaje promedio de estudiantes que cumplieron la meta hse
durante todos los sprints disponibles */
var percentageHseStudents = (function(gen, totalSprints) {
    return Math.round((averageHseStudents(gen, totalSprints) * 100) / totalStudents(gen));
});


/* Función que calcula cuántas estudiantes cumplen con el mínimo requerido, sumando tech y hse por sprint */
var averageTotalStudents = (function(gen, sprint) {
    var total = 0;
    var activeStudents = 0;
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i]. sprints[sprint - 1] !== undefined) {
            activeStudents++;
            if (gen.students[i].sprints[sprint - 1].score.tech >= 1260 && gen.students[i].sprints[sprint - 1].score.hse >= 840) {
                total++;
            }
        }
    }
    return Math.round(total*100)/100;
});

/* Función que calcula el porcentaje de estudiantes que cumplen con el mínimo requerido,
sumando tech y hse por sprint */
var percentageAchievementHsePlusTechPerSprint = (function(gen, sprint) {
    var total = 0;
    var activeStudents = 0;
    for (var i = 0; i < totalStudents(gen); i++) {
        if (gen.students[i].sprints[sprint - 1] !== undefined) {
            activeStudents++;
            if (gen.students[i].sprints[sprint - 1].score.tech >= 1260 && gen.students[i].sprints[sprint - 1].score.hse >= 840) {
                total++;
            }
        }
    }
    return Math.round((total * 100) / activeStudents);
});

/* Función que calcula el porcentaje que cumple con el mínimo requerido en HSE y Tech en todos los sprints */
var percentageAchievementHsePlusTech = (function (gen, totalSprints) {
    var total = 0;
    for (var i = 1; i <= totalSprints; i++) {
        total += percentageAchievementHsePlusTechPerSprint(gen, i);
    }
    return Math.round((total / totalSprints) * 100) / 100;
});

/* Función que calcula el porcentaje promedio de satisfacción con Laboratoria */
var averageSatisfactionPercencentage = (function(gen) {
    var total = 0;
    for (var i = 0; i < gen.ratings.length; i++) {
        total += gen.ratings[i].student.cumple;
        total += gen.ratings[i].student.supera;
    }
    return Math.round(total / gen.ratings.length);
});

/* Función que calcula la satisfacción por sprint */
var satisfactionPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < gen.ratings.length; i++) {
        if (gen.ratings[sprint - 1] !== undefined) {
            total+= gen.ratings[sprint - 1].student.cumple;
            total += gen.ratings[sprint - 1].student.supera;
        }
    }
    return (total/ gen.ratings.length);
});

/* Función que calcula el puntaje promedio de profesores */
var averageTeacherRating = (function(gen) {
    var total = 0;
    for (var i = 0; i < gen.ratings.length; i++) {
        total += gen.ratings[i].teacher;
    }
    return Math.round((total / gen.ratings.length) * 100) / 100;
});

var teacherRatingPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < gen.ratings.length; i++) {
        if (gen.ratings[sprint - 1] !== undefined) {
            total+= gen.ratings[sprint - 1].teacher;
        }
    }
    return Math.round((total / gen.ratings.length) * 100) / 100;
});

/* Función que calcula el puntaje promedio de jedi masters */
var averageJediRating = (function(gen) {
    var total = 0;
    for (var i = 0; i < gen.ratings.length; i++) {
        total += gen.ratings[i].jedi;
    }
    return Math.round((total / gen.ratings.length) * 100) / 100;
});

/* Función que calcula el puntaje promedio de jedi masters por sprint */
var jediRatingPerSprint = (function(gen, sprint) {
    var total = 0;
    for (var i = 0; i < gen.ratings.length; i++) {
        if (gen.ratings[sprint - 1] !== undefined) {
            total+= gen.ratings[sprint - 1].jedi;
        }
    }
    return Math.round((total / gen.ratings.length) * 100) / 100;
})




/* Función que genera los títulos de cada sede */
var locationName = (function(gen) {
    if (gen == genAQP20162) {
        document.getElementById("location-name").innerHTML = "Arequipa, Perú 2016 - II";
    } else if (gen == genAQP20171) {
        document.getElementById("location-name").innerHTML = "Arequipa, Perú 2017 - I";
    } else if (gen == genCDMX20171) {
        document.getElementById("location-name").innerHTML = "Ciudad de México 2017 - I";
    } else if (gen == genCDMX20172) {
        document.getElementById("location-name").innerHTML = "Ciudad de México 2017 - II";
    } else if (gen == genLIM20162) {
        document.getElementById("location-name").innerHTML = "Lima, Perú 2016 - II";
    } else if (gen == genLIM20171) {
        document.getElementById("location-name").innerHTML = "Lima, Perú 2017 - I";
    } else if (gen == genLIM20172) {
        document.getElementById("location-name").innerHTML = "Lima, Perú 2017 - II";
    } else if (gen == genSCL20162) {
        document.getElementById("location-name").innerHTML = "Santiago de Chile 2016 - II";
    } else if (gen == genSCL20171) {
        document.getElementById("location-name").innerHTML = "Santiago de Chile 2017 - I";
    } else if (gen == genSCL20172) {
        document.getElementById("location-name").innerHTML = "Santiago de Chile 2017 - II";
    }
});

/* Función que determina el color de los porcentajes */
var percentageColor = (function(percentageAchievement, element) {
	if (percentageAchievement >= 70) {
		element.style.color = "#68AD1C";
		var newSpan = document.createElement("span");
		element.appendChild(newSpan);
		newSpan.classList.add("icon-caret-up", "indicator");
	} else {
		element.style.color = "#CE2828";
		var newSpan = document.createElement("span");
		element.appendChild(newSpan);
		newSpan.classList.add("icon-caret-down", "indicator");
	}
});

/* Función que creará los datos necesarios por sede */
var addEvent = (function(id, gen, totalSprints) {
    id.addEventListener("click", function() {
        locationName(gen);
        document.getElementById("enrolled").innerHTML = enrolledStudentsTotal(gen);
        document.getElementById("drop-percentage").innerHTML = dropoutPercentage(gen) + "%";
        changeTotalStudentsSpan(gen);
        chartEnrolled(gen);
        document.getElementById("promoters").innerHTML = promotersAveragePercentage(gen) + "% ";
        document.getElementById("passive").innerHTML = passiveAveragePercentage(gen) + "% ";
        document.getElementById("detractors").innerHTML = detractorsAveragePercentage(gen) + "% ";
        document.getElementById("nps-counter").innerHTML = calculateNPS(gen) + "%";
        chartNps(gen);
        percentageColor(calculateNPS(gen), document.getElementById("nps-counter"));
        document.getElementById("target").innerHTML = averageTotalStudents(gen, totalSprints);
        chartAchievement(gen);
        document.getElementById("total-percentage").innerHTML = percentageAchievementHsePlusTech(gen, totalSprints) + "%";
        percentageColor(percentageAchievementHsePlusTech(gen, totalSprints), document.getElementById("total-percentage"));
        document.getElementById("tech-skills-count").innerHTML = averageTechStudents(gen, totalSprints);
        document.getElementById("tech-skills-percentage").innerHTML = percentageTechStudents(gen, totalSprints) + "%";
        percentageColor(percentageTechStudents(gen, totalSprints), document.getElementById("tech-skills-percentage"));
        chartTechSkills(gen);
        pieChartTechSkills(gen, totalSprints);
        document.getElementById("life-skills-counter").innerHTML = averageHseStudents(gen, totalSprints);
        document.getElementById("life-skills-percentage").innerHTML = percentageHseStudents(gen, totalSprints) + "%";
        percentageColor(percentageHseStudents(gen, totalSprints), document.getElementById("life-skills-percentage"));
        chartHseSkills(gen);
        pieChartHseSkills(gen, totalSprints);
        document.getElementById("student-sat-percentage").innerHTML = averageSatisfactionPercencentage(gen) + "%";
        chartSatisfaction(gen);
        document.getElementById("teacher-rat-overall").innerHTML = averageTeacherRating(gen);
        chartTeacherRating(gen);
        document.getElementById("jedi-rating-overall").innerHTML = averageJediRating(gen);
        chartJediRating(gen);
        dropdownCity.classList.remove("visible");
        dropdownCity.classList.add("invisible");
        overviewContent.style.display = "none";
    })
});







/* Agregando los datos que se mostrarán al hacer click en cada una de las sedes,
en cada semestre */
addEvent(aqp20162, genAQP20162, sprintsAQP20162);
addEvent(aqp20171, genAQP20171, sprintsAQP20171);
addEvent(cdmx20171, genCDMX20171, sprintsCDMX20171);
addEvent(cdmx20172, genCDMX20172, sprintsCDMX20172);
addEvent(lim20162, genLIM20162, sprintsLIM20162);
addEvent(lim20171, genLIM20171, sprintsLIM20171);
addEvent(lim20172, genLIM20172, sprintsLIM20172);
addEvent(scl20162, genSCL20162, sprintsSCL20162);
addEvent(scl20171, genSCL20171, sprintsSCL20171);
addEvent(scl20172, genSCL20172, sprintsSCL20172);