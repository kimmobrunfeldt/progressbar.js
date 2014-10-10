var element = document.getElementById('example-1-container');
var circle = new ProgressBar.Circle(element, {
    color: "#FCB03C",
    strokeWidth: 2,
    trailColor: "#07A197",
    fill: "#666"
});

circle.animate(100, function() {
    circle.animate(0);
})
