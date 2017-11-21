var chartEnrolled = (function(gen) {
    var chart = new CanvasJS.Chart("chart-enrollment", {
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