/* Gráfico que representa la cantidad de estudiantes inscritas y las desertoras por sprint */
var chartEnrolled = (function(gen) {
    var chart = new CanvasJS.Chart("chart-enrollment", {
        height: 180,
        width: 300,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            title: "Students"
        },
        data: [{
            type: "column",
            color: "#599ae4",
            dataPoints: [{
                y: totalStudents(gen),
                label: "Sprint 1"
            }, {
                y: enrolledStudentsPerSprint(gen, 2),
                label: "Sprint 2"
            }, {
                y: enrolledStudentsPerSprint(gen, 3),
                label: "Sprint 3"
            }, {
                y: enrolledStudentsPerSprint(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Gráfico que representa la cantidad de estudiantes que cumplió la meta entre hse y tech por sprint */
var chartAchievement = (function(gen) {
    var chart = new CanvasJS.Chart("chart-achievement", {
        height: 180,
        width: 300,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: [{
                y: averageTotalStudents(gen, 1),
                label: "Sprint 1"
            }, {
                y: averageTotalStudents(gen, 2),
                label: "Sprint 2"
            }, {
                y: averageTotalStudents(gen, 3),
                label: "Sprint 3"
            }, {
                y: averageTotalStudents(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Gráfico que representa el NPS por sprint */
var chartNps = (function(gen) {
    var chart = new CanvasJS.Chart("chart-nps", {
        height: 180,
        width: 300,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: [{
                y: calculateNpsPerSprint(gen, 1),
                label: "Sprint 1"
            }, {
                y: calculateNpsPerSprint(gen, 2),
                label: "Sprint 2"
            }, {
                y: calculateNpsPerSprint(gen, 3),
                label: "Sprint 3"
            }, {
                y: calculateNpsPerSprint(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Gráfico que representa las alumnas que lograron cumplir el porcentaje mínimo de habilidades técnicas
por sprint */
var chartTechSkills = (function(gen) {
    var chart = new CanvasJS.Chart("chart-tech-skills", {
        height: 330,
        width: 590,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            title: "Students"
        },
        data: [{
            type: "column",
            color: "#599ae4",
            dataPoints: [{
                y: achieveTechSkillsPerSprint(gen, 1),
                label: "Sprint 1"
            }, {
                y: achieveTechSkillsPerSprint(gen, 2),
                label: "Sprint 2"
            }, {
                y: achieveTechSkillsPerSprint(gen, 3),
                label: "Sprint 3"
            }, {
                y: achieveTechSkillsPerSprint(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Gráfico que muestra el porcentaje promedio de estudiantes que logró cumplir el puntaje técnico y
las que no, según el total de estudiantes activas en promedio */
var pieChartTechSkills = (function(gen, totalSprints) {
        var chart = new CanvasJS.Chart("pie-chart-tech", {
        	width: 250,
        	height: 250,
            exportEnabled: true,
            animationEnabled: true,
            legend: {
                cursor: "pointer",
                itemclick: explodePie
            },
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                dataPoints: [{
                    y: Math.round((averageTechStudents(gen, totalSprints)*100)/ averageEnrolledStudents(gen, totalSprints)),
                    name: "% Students that meet the target"
                }, {
                    y: Math.round((averageFailsTechStudents(gen, totalSprints)*100)/ averageEnrolledStudents(gen, totalSprints)),
                    name: "% Students that don't meet the target"
                }, ]
            }]
        });
        chart.render();
    });

/* Gráfico que representa las alumnas que lograron cumplir el porcentaje mínimo de habilidades socioemocionales
por sprint */
var chartHseSkills = (function(gen) {
    var chart = new CanvasJS.Chart("chart-hse-skills", {
        height: 330,
        width: 590,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            title: "Students"
        },
        data: [{
            type: "column",
            color: "#599ae4",
            dataPoints: [{
                y: achieveHseSkillsPerSprint(gen, 1),
                label: "Sprint 1"
            }, {
                y: achieveHseSkillsPerSprint(gen, 2),
                label: "Sprint 2"
            }, {
                y: achieveHseSkillsPerSprint(gen, 3),
                label: "Sprint 3"
            }, {
                y: achieveHseSkillsPerSprint(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Gráfico que muestra el porcentaje promedio de estudiantes que logró cumplir el puntaje de habilidades
socioemocionales y las que no, según el total de estudiantes activas en promedio */
var pieChartHseSkills = (function(gen, totalSprints) {
        var chart = new CanvasJS.Chart("pie-chart-hse", {
        	width: 250,
        	height: 250,
            exportEnabled: true,
            animationEnabled: true,
            legend: {
                cursor: "pointer",
                itemclick: explodePie
            },
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                dataPoints: [{
                    y: Math.round((averageHseStudents(gen, totalSprints)*100)/ averageEnrolledStudents(gen, totalSprints)),
                    name: "% Students that meet the target"
                }, {
                    y: Math.round((averageFailsHseStudents(gen, totalSprints)*100)/ averageEnrolledStudents(gen, totalSprints)),
                    name: "% Students that don't meet the target"
                }, ]
            }]
        });
        chart.render();
    });

/* Gráfico que representa el porcentaje de satisfacción estudiantil por sprint */
var chartSatisfaction = (function(gen) {
    var chart = new CanvasJS.Chart("chart-satisfaction", {
        height: 180,
        width: 300,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: [{
                y: satisfactionPerSprint(gen, 1),
                label: "Sprint 1"
            }, {
                y: satisfactionPerSprint(gen, 2),
                label: "Sprint 2"
            }, {
                y: satisfactionPerSprint(gen, 3),
                label: "Sprint 3"
            }, {
                y: satisfactionPerSprint(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Gráfico que representa el rating promedio de los profesores por sprint */
var chartTeacherRating = (function(gen) {
    var chart = new CanvasJS.Chart("chart-teacher-rating", {
        height: 180,
        width: 300,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: [{
                y: teacherRatingPerSprint(gen, 1),
                label: "Sprint 1"
            }, {
                y: teacherRatingPerSprint(gen, 2),
                label: "Sprint 2"
            }, {
                y: teacherRatingPerSprint(gen, 3),
                label: "Sprint 3"
            }, {
                y: teacherRatingPerSprint(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Gráfico que representa el promedio de rating de los jedi master por sprint */
var chartJediRating = (function(gen) {
    var chart = new CanvasJS.Chart("chart-jedi-rating", {
        height: 180,
        width: 300,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: [{
                y: jediRatingPerSprint(gen, 1),
                label: "Sprint 1"
            }, {
                y: jediRatingPerSprint(gen, 2),
                label: "Sprint 2"
            }, {
                y: jediRatingPerSprint(gen, 3),
                label: "Sprint 3"
            }, {
                y: jediRatingPerSprint(gen, 4),
                label: "Sprint 4"
            }]
        }]
    });
    chart.render();
});

/* Función que le da animación al gráfico de torta */
function explodePie(e) {
    if (typeof(e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
       e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
      e.chart.render();
    }