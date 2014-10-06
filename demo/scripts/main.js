function randInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var circle = new ProgressBar.Circle('#landing-progress', {
    color: "#FCB03C",
    strokeWidth: 1.5,
    trailColor: null,
    fill: "#FFF9F0"
});

circle.animate(100, {
    duration: 1300
});

var landingContent = document.querySelector('#landing > .content');
landingContent.onclick = function() {
    circle.animate(randInt(0, 100), {
        duration: 1300
    });
}


var star = document.getElementById('star-path');
var starProgress = new ProgressBar.Path(star);

setInterval(function() {
    starProgress.set(0)
    starProgress.animate(100, {
        duration: 1800
    });

}, 2000);
