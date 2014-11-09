var circle = new ProgressBar.Circle('#example-circle-container', {
    color: '#FCB03C',
    strokeWidth: 2,
    fill: '#aaa'
});

circle.animate(1, function() {
    circle.animate(0);
})
