var weakColor = [252, 91, 63];  // Red
var strongColor = [111, 213, 127];  // Green
var defaultColor = [204, 204, 204];

var passwordGrades = {
    0: 'Very weak',
    1: 'Weak',
    2: 'Average',
    3: 'Strong',
    4: 'Very strong'
};

// Interpolate value between two colors.
// Value is number from 0-1. 0 Means color A, 0.5 middle etc.
function interpolateColor(rgbA, rgbB, value) {
    var rDiff = rgbA[0] - rgbB[0];
    var gDiff = rgbA[1] - rgbB[1];
    var bDiff = rgbA[2] - rgbB[2];
    value = 1 - value;
    return [
        rgbB[0] + rDiff * value,
        rgbB[1] + gDiff * value,
        rgbB[2] + bDiff * value
    ];
}

function rgbArrayToString(rgb) {
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

function barColor(progress) {
    return interpolateColor(weakColor, strongColor, progress);
}

function onLoad() {
    var body = document.querySelector('body');
    var barContainer = document.querySelector('#strength-bar');
    var strengthBar = new ProgressBar.Circle(barContainer, {
        color: '#ddd',
        trailColor: '#f7f7f7',
        duration: 1000,
        easing: 'easeOut',
        strokeWidth: 5
    });
    barContainer.style.visibility = 'hidden';

    var input = document.querySelector('#password');
    var inputLabel = document.querySelector('#password-label');

    input.onfocus = function(event) {
        var result = zxcvbn(input.value);
        inputLabel.dataset.info = passwordGrades[result.score];
        barContainer.style.visibility = 'visible';
    };

    input.onblur = function(event) {
        inputLabel.dataset.info = 'New password';
        barContainer.style.visibility = 'hidden';
    };

    input.addEventListener('input', function passwordChange() {
        var result = zxcvbn(input.value);
        var progress = result.score / 4;
        inputLabel.dataset.info = passwordGrades[result.score];

        if (progress === 0 && input.value && input.value.length > 0) {
            progress = 0.1;
        }

        var startColor = +strengthBar.value().toFixed(3) === 0
            ? rgbArrayToString(defaultColor)
            : rgbArrayToString(barColor(strengthBar.value()));

        var endColor = progress === 0
            ? rgbArrayToString(defaultColor)
            : rgbArrayToString(barColor(progress));

        strengthBar.animate(progress, {
            from: { color: startColor },
            to: { color: endColor },
            step: function(state, bar) {
                input.style.color = state.color;
                bar.path.setAttribute('stroke', state.color);
            }
        });
    });
}

window.onload = onLoad;
