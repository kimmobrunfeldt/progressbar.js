var element = document.getElementById('example-circle-container');
var circle = new ProgressBar.Circle(element, {
    color: "#FCB03C",
    strokeWidth: 5,
    fill: "#aaa"
});

circle.animate(1, function() {
    circle.animate(0);
})
