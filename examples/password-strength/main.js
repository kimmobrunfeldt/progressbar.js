var weakColor = [252, 91, 63];  // Red
var strongColor = [111, 213, 127];  // Green

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
    var strengthBar = new ProgressBar.Circle('#strength-bar', {
        color: weakColor,
        trailColor: '#f7f7f7',
        duration: 1000,
        easing: 'easeOut',
        strokeWidth: 5,
        step: function(state, line) {
            line.path.setAttribute('stroke', state.color);
        }
    });

    var input = document.querySelector('#password');
    input.addEventListener('input', function passwordChange() {
        var result = zxcvbn(input.value);
        var progress = result.score / 4;

        if (progress === 0 && input.value && input.value.length > 0) {
            progress = 0.1;
        }

        var startColor = rgbArrayToString(barColor(strengthBar.value()));
        var endColor = rgbArrayToString(barColor(progress));
        strengthBar.animate(progress, {
            from: { color: startColor },
            to: { color: endColor }
        });
    });
}

window.onload = onLoad;
