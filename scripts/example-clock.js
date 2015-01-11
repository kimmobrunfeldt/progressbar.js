var element = document.getElementById('example-clock-container');

var seconds = new ProgressBar.Circle(element, {
    duration: 200,
    color: "#FCB03C",
    trailColor: "#ddd"
});

setInterval(function() {
    var second = new Date().getSeconds();
    seconds.animate(second / 60, function() {
        seconds.setText(seconds;
    });
}, 1000);
