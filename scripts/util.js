function playLoop(bar) {
  function animateBar() {
    bar.animate(1, () => {
      setTimeout(() => {
        bar.animate(0)
      }, 500);
    });
  }

  setInterval(() => {
    bar.set(0)
    animateBar();
  }, 4500);

  animateBar();
}

module.exports = {
  playLoop
};
