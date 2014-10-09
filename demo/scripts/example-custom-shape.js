var container = document.getElementById('example-2-container');
container.innerHTML = '<object id="scene" type="image/svg+xml" data="images/moon-scene.svg"></object>';

var scene = document.getElementById('scene');
scene.addEventListener('load', function() {
    var path = new ProgressBar.Path(scene.contentDocument.querySelector('#meteor-path'));
    console.log(path)

    path.animate(100, {
        duration: 300,
        easing: 'ease-out'
    },
    function() {
        path.set(0);
    });

});
