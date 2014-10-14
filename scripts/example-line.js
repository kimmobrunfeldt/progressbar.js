var element = document.getElementById('example-line-container');
var line = new ProgressBar.Line(element, {
    color: "#FCB03C",
    strokeWidth: 5,
    trailColor: "#888"
});

line.animate(1, function() {
    line.animate(0);
})
