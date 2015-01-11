var circle = new ProgressBar.Circle('#example-percent-container', {
    color: '#FCB03C',
    strokeWidth: 2,
    text: '0.0',
    step: function(state, bar) {
        bar.setText((bar.value() * 100).toFixed(1));
    }
});

circle.animate(1, function() {
    circle.animate(0);
})
