// Use ResizeObserver to apply the class .aboveMin to a given grid container when its width is greater than it’s data-min value.
// To Do: uncomment the check for CSS min() support once we’re using CSS min() in our CSS

function observeGrid(gridNode) {
  // Feature detect ResizeObserver
  //if ('ResizeObserver' in window) {
  if ('ResizeObserver' in window && !CSS.supports('width', `min(20rem, 100%)`)) { // ideally ${this.min} rather than 20rem

    console.log("resize observer grid JS is firing.");

    // Get the min value from data-min="[min]"
    const min = gridNode.dataset.min;
    // Create a proxy element to measure and convert
    // the `min` value (which might be em, rem, etc) to `px`
    const test = document.createElement('div');
    test.style.width = min;
    gridNode.appendChild(test);
    const minToPixels = test.offsetWidth;
    gridNode.removeChild(test);

    const ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Get the element's current dimensions
        const cr = entry.contentRect;
        // `true` if the container is wider than the minimum
        const isWide = cr.width > minToPixels;
        // toggle the class conditionally
        gridNode.classList.toggle('aboveMin', isWide);
      }
    });

    ro.observe(gridNode);

  } //else { console.log("resize observer grid JS is NOT firing."); }

}
