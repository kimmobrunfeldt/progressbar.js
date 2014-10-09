var element = document.getElementById('example-1-container');
var circle = new ProgressBar.Circle(element, {
    color: "#FCB03C",
    strokeWidth: 1,
    trailColor: "#ccc",
    fill: "#FFF9F0"
});

circle.animate(100, function() {
    circle.animate(0);
})
