export default () => {
  let searchIndex = null;
  const searchUI = document.querySelector('.search-ui');
  const resultsUI = document.querySelector('.search-results');
  const searchInput = document.querySelector('#search-str');

  // Clear current results (in the enhanced UI)
  const clearResults = () => {
    while (resultsUI.firstChild) {
      resultsUI.removeChild(resultsUI.firstChild);
    }
  }

  // search and display (in the enhanced UI)
  const find = (str) => {
    str = str.toLowerCase();

    // look for matches in the search JSON
    let results = [];
    for (let item in searchIndex) {
      const found = searchIndex[item].text.indexOf(str);
      if (found != -1) {
        results.push(searchIndex[item])
      }
    }

    // build and insert the new result entries
    clearResults();
    for (let item in results) {
      let listItem = document.createElement('li');
      let link = document.createElement('a');
      link.textContent = results[item].title;
      link.setAttribute('href', results[item].url);
      listItem.appendChild(link);
      resultsUI.appendChild(listItem);
    }
  }

  // Listen for "Search" nav item being clicked.
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#nav-search')) return;
    e.preventDefault();

    // get the data
    fetch('/search.json').then(function(response) {
      return response.json();
    }).then(function(response) {
      searchIndex = response.search;
    });

    // Show the enhanced UI
    searchUI.classList.toggle('invisible');
    searchInput.focus();

    // listen for input changes in the enhanced UI
    searchInput.addEventListener('keyup', () => {
      const str = searchInput.value;
      if(str.length > 2) {
        find(str);
      } else {
        clearResults();
      }
    });
  }, false);
}
