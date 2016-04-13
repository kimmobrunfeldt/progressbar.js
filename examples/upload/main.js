window.onload = onLoad;

// Disabling autoDiscover, otherwise Dropzone will try to attach twice
Dropzone.autoDiscover = false;
var DROPZONE_OPTIONS = {
    url: "https://shary.herokuapp.com/api/upload",
    paramName: 'file',  // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 100,  // MB
    dictDefaultMessage: '',
    createImageThumbnails: false,
    previewsContainer: '#dropzone__hidden',

}

function onLoad() {
    var rotatingBar = initProgressBar('#file-picker__progress');
    initDropzone(rotatingBar);
}

function initProgressBar(container) {
    var Shape = ProgressBar.Circle;

    var rotatingBar = new RotatingProgressBar(Shape, container, {
        color: '#333',
        trailColor: '#eee',
        strokeWidth: 1,
        duration: 500
    });
    rotatingBar.bar.set(1);

    return rotatingBar;
}

function initDropzone(rotatingBar) {
    Dropzone.options.dropzone = DROPZONE_OPTIONS;
    var dropzone = new Dropzone('#dropzone');
    var picker = document.querySelector('.file-picker');
    var overlay = document.querySelector('.file-picker__overlay');
    overlay.onclick = function() {
        dropzone.removeAllFiles(true);
    }

    var animateThrottled = _.throttle(
        _.bind(rotatingBar.bar.animate, rotatingBar.bar),
        500
    );

    dropzone.on('sending', function(file) {
        setLink('');
        addClass(picker, 'uploading');

        rotatingBar.bar.set(0.05);
        rotatingBar.rotate();
    });

    dropzone.on('uploadprogress', function(file, percent) {
        animateThrottled(percent / 100);
    });

    dropzone.on('success', function(file, response) {
        if (response.name === undefined) {
            window.alert('Unknown error while uploading');
            return;
        }

        var url = 'http://shary.in/' + response.name;
        uploadFinally(false, url);
    });

    dropzone.on('error', function(file, errorMessage) {
        uploadFinally(true);
    });

    function uploadFinally(err, url) {
        animateThrottled.cancel();

        if (err) {
            rotatingBar.bar.set(1);
            activateFilePicker();
        } else {
            rotatingBar.bar.animate(1, function() {
                dropzone.removeAllFiles();
                activateFilePicker();
                setLink(url);
            });
        }
    }

    function activateFilePicker() {
        removeClass(picker, 'uploading');
        rotatingBar.stopRotating();
    }
}

function setLink(url) {
    var aElement = document.querySelector('#file-link');
    setText(aElement, url);
    aElement.title = url;
    aElement.href = url;
}

// Small wrapper for ProgressBar

var RotatingProgressBar = function RotatingProgressBar(Shape, container, opts) {
    this._container = document.querySelector(container);
    this.bar = new Shape(container, opts);
};

RotatingProgressBar.prototype.rotate = function rotate() {
    addClass(this._container, 'rotating');
};

RotatingProgressBar.prototype.stopRotating = function stopRotating() {
    removeClass(this._container, 'rotating');
};


// Utils

function addClass(element, addName) {
    var classNames = element.className.split(' ');
    if (classNames.indexOf(addName) !== -1) {
        return;
    }

    element.className += ' ' + addName;
}

function removeClass(element, removeName) {
    var newClasses = [];
    var classNames = element.className.split(' ');
    for (var i = 0; i < classNames.length; ++i) {
        if (classNames[i] !== removeName) {
            newClasses.push(classNames[i]);
        }
    }

    element.className = newClasses.join(' ');
}

function setText(element, text) {
    element.textContent = text;
}
