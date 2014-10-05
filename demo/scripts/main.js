function randInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var square = document.getElementById('square-progress');
var squareProgress = new ProgressBar.Square(square, {
    color: "#6FD57F",
    strokeWidth: 1,
    trailColor: null
});

squareProgress.animate(100, {
    duration: 1200
});

var star = document.getElementById('star-path');
var starProgress = new ProgressBar.Path(star);

starProgress.animate(100, {
    duration: 1800
});
