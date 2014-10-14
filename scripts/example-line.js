var element = document.getElementById('example-line-container');
var line = new ProgressBar.Line(element, {
    color: "#FCB03C",
    trailColor: "#aaa"
});

line.animate(1, function() {
    line.animate(0);
})
