var container = document.getElementById('example-custom-container');
container.innerHTML = '<object id="scene" type="image/svg+xml" data="images/moon-scene.svg"></object>';

var scene = document.getElementById('scene');
scene.addEventListener('load', function() {
    var path = new ProgressBar.Path(scene.contentDocument.querySelector('#asterism-path'), {
        duration: 1000
    });

    path.animate(1, function() {
        path.animate(0);
    });
});

var bar = {
    destroy: function() {}
}