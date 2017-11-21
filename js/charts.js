var chartEnrolled = (function(gen) {
    var chart = new CanvasJS.Chart("chart-enrollment", {
        height: 200,
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

var chartAchievement = (function(gen) {
    var chart = new CanvasJS.Chart("chart-achievement", {
        height: 200,
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

var chartNps = (function(gen) {
    var chart = new CanvasJS.Chart("chart-nps", {
        height: 200,
        width: 300,
        animationEnabled: true,
        theme: "light2",
        axisY: {
            includeZero: false
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
                    y: averageTechStudents(gen, totalSprints),
                    name: "# Students that meet the target"
                }, {
                    y: averageFailsTechStudents(gen, totalSprints),
                    name: "# Students that don't meet the target"
                }, ]
            }]
        });
        chart.render();
    });

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
                    y: averageHseStudents(gen, totalSprints),
                    name: "# Students that meet the target"
                }, {
                    y: averageFailsHseStudents(gen, totalSprints),
                    name: "# Students that don't meet the target"
                }, ]
            }]
        });
        chart.render();
    });

function explodePie(e) {
    if (typeof(e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
       e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
      e.chart.render();
    }