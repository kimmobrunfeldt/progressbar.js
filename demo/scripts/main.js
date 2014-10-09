function onLoad() {
    initExternalLibs();
    initLanding();
    initStar();
}

function initExternalLibs() {
    smoothScroll.init({
        easing: 'easeOutCubic'
    });
}

function initLanding() {
    var circle = new ProgressBar.Circle('#landing-progress', {
        color: "#FCB03C",
        strokeWidth: 1.5,
        trailColor: null,
        fill: "#FFF9F0"
    });


    circle.animate(100, {
        duration: 1300
    }, function() {

        var elements = document.querySelectorAll('.content, .background');
        for (var i = 0; i < elements.length; ++i) {
            elements[i].className += ' animated pulse';
        }
    });

    var element = document.querySelector('#landing .landing-progress');
    element.onmouseover = function() {
        circle.animate(0, {
            duration: 3000,
            easing: 'linear'
        });
    }

    element.onmouseout = function() {
        circle.animate(100, {
            duration: 800
        });
    }
}

function initStar() {
    var star = document.getElementById('star');
    star.addEventListener('load', function() {
        var path = new ProgressBar.Path(star.contentDocument.querySelector('#star-path'));
        path.set(100);

        var element = document.querySelector('.social-links > .github');
        element.onmouseover = function() {
            path.animate(0, {duration: 800});
        }

        element.onmouseout = function() {
            path.animate(100, {duration: 600});
        }
    });
}

window.onload = onLoad();
