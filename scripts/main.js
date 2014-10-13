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

    // jQuery is not needed anywhere else but here
    $('.fixed').midnight();
}

function initLanding() {
    var circle = new ProgressBar.Circle('#landing-progress', {
        color: "#FCB03C",
        strokeWidth: 1.5,
        trailColor: null,
        fill: "#FFF9F0"
    });

    circle.set(1);    
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

        var runButton = element.querySelector('.run');
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
    var path = new ProgressBar.Path(star.contentDocument.querySelector('#star-path'), {
        easing: "easeInOut"
    });
    path.set(1);

    var element = document.querySelector('.social-links > .github');
    element.onmouseover = function() {
        path.animate(0, {duration: 800});
    }

    element.onmouseout = function() {
        path.animate(1, {duration: 600});
    }
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

$(window).load(onLoad);
