function randInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var circle = new ProgressBar.Circle('#circle-progress', {
    color: "#6FD57F",
    strokeWidth: 1,
    trailColor: null
});

circle.animate(100, {
    duration: 1200
});


var star = document.getElementById('star-path');
var starProgress = new ProgressBar.Path(star);

setInterval(function() {
    starProgress.set(0)
    starProgress.animate(100, {
        duration: 1800
    });

}, 2000);
