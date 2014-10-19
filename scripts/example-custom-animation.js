var startColor = '#FC5B3F';
var endColor = '#6FD57F';

var element = document.getElementById('example-animation-container');
var circle = new ProgressBar.Circle(element, {
    color: startColor,
    trailColor: '#888',
    duration: 2000,
    easing: 'bounce',
    strokeWidth: 5,

    // Set default step function for all animate calls
    step: function(state, path) {
        path.setAttribute('stroke', state.color);
    }
});

circle.animate(1, {
    from: {color: startColor},
    to: {color: endColor}
});
