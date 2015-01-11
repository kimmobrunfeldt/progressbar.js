var circle = new ProgressBar.Circle('#example-percent-container', {
    color: '#FCB03C',
    strokeWidth: 3,
    trailWidth: 1,
    duration: 1500,
    text: {
        value: '0'
    },
    step: function(state, bar) {
        bar.setText((bar.value() * 100).toFixed(0));
    }
});

circle.animate(1, function() {
    circle.animate(0);
})
