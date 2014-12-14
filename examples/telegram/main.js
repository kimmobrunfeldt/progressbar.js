window.onload = function onLoad() {
    var circle = new ProgressBar.Circle('#progress', {
        color: '#555',
        trailColor: '#eee',
        strokeWidth: 10,
        duration: 3000,
        easing: 'easeInOut'
    });

    circle.set(0.05);

    setTimeout(function() {
        circle.animate(0.3);
    }, 1000);

    setTimeout(function() {
        circle.animate(0.4);
    }, 2500);

    setTimeout(function() {
        circle.animate(0.8);
    }, 4500);

    setTimeout(function() {
        circle.animate(1);
    }, 6000);
};
