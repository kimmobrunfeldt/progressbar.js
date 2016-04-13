window.onload = function onLoad() {
    var circle = new ProgressBar.Circle('#progress', {
        color: '#555',
        trailColor: '#eee',
        strokeWidth: 10,
        duration: 2500,
        easing: 'easeInOut'
    });

    circle.set(0.05);

    setTimeout(function() {
        circle.animate(0.3);
    }, 1000);

    setTimeout(function() {
        circle.animate(0.4);
    }, 3500);

    setTimeout(function() {
        circle.animate(0.8);
    }, 5500);

    setTimeout(function() {
        circle.animate(1);
    }, 8000);
};
