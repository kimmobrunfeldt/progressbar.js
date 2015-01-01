var element = document.getElementById('example-clock-container');
element.innerHTML = '<header id="clock-seconds"></header>';
var textElement = document.getElementById('clock-seconds');

var seconds = new ProgressBar.Circle(element, {
    duration: 200,
    color: "#FCB03C",
    trailColor: "#ddd"
});

setInterval(function() {
    var second = new Date().getSeconds();
    seconds.animate(second / 60, function() {
        textElement.innerHTML = second;
    });
}, 1000);
var bar = seconds;