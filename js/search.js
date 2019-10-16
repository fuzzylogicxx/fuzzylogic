;(function () {

  var searchIndex = null;
  var searchUI = document.querySelector('.search-ui');
  var resultsUI = document.querySelector('.search-results');
  var searchInput = document.querySelector('#search-str');

  // Clear current results (in the enhanced UI)
  var clearResults = function(){
    while (resultsUI.firstChild) {
      resultsUI.removeChild(resultsUI.firstChild);
    }
  }

  // search and display (in the enhanced UI)
  var find = function(str) {
    str = str.toLowerCase();

    // look for matches in the search JSON
    var results = [];
    for (var item in searchIndex) {
      var found = searchIndex[item].text.indexOf(str);
      if (found != -1) {
        results.push(searchIndex[item])
      }
    }

    // build and insert the new result entries
    clearResults();
    for (var item in results) {
      var listItem = document.createElement('li');
      var link = document.createElement('a');
      link.textContent = results[item].title;
      link.setAttribute('href', results[item].url);
      listItem.appendChild(link);
      resultsUI.appendChild(listItem);
    }
  }

  // Listen for "Search" nav item being clicked.
  document.addEventListener('click', (e) => {
    if (!event.target.closest('#nav-search')) return;
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
    searchInput.addEventListener('keyup', function(event) {
      var str = searchInput.value;
      if(str.length > 2) {
        find(str);
      } else {
        clearResults();
      }
    });
  }, false);

})();
