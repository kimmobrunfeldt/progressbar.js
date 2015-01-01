var circle = new ProgressBar.Circle('#example-animation2-container', {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 10,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1000,

    from: { color: '#aaa', width: 1 },
    to: { color: '#666', width: 10 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    }
});

circle.animate(1, function() {
    circle.animate(0);
});
var bar = circle;