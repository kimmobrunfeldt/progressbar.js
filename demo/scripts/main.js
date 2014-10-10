// Global state
var state = {
    exampleCodes: {}
};


function onLoad() {
    initExternalLibs();
    initLanding();
    initExamples();
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

function initExamples() {
    var elements = document.querySelectorAll('.example');
    var elementsArray = Array.prototype.slice.call(elements, 0);

    elementsArray.forEach(function(element) {
        var codeContainer = element.querySelector('.code');

        var url = 'scripts/' + element.id + '.js';
        get(url, function(req) {
            var code = req.responseText;

            runExample(code);
            state.exampleCodes[element.id] = code;

            codeContainer.innerHTML = '<pre><code data-language="javascript"></code></pre>';
            element.querySelector('code').innerHTML = code;
            Rainbow.color();
        });

        var runButton = element.querySelector('button');
        runButton.onclick = function() {
            element.querySelector('.example-container').innerHTML = '';
            runExample(state.exampleCodes[element.id]);
        };
    });
}

function runExample(code) {
    // Run code in anonymous function scope
    var scopedCode = 'var exampleCode = function() {' + code + ';}; exampleCode();';

    try {
        eval(scopedCode);
    } catch(err) {
        var error = err.name + ': ' + err.message;
        window.alert(error);
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

function get(url, cb) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        cb(req);
    }

    req.open("GET", url, true);
    req.send();
}

window.onload = onLoad();
