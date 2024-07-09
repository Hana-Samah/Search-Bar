document.addEventListener('DOMContentLoaded', function() {
  let searchInput = document.getElementById('search-input');
  let searchButton = document.getElementById('search-button');
  let cleanButton = document.getElementById('clean-button');
  let searchResults = document.getElementById('search-results');
  const resumeSections = document.querySelectorAll('h2, h3, h4, li'); // All elements to search through
  let list = []; // Array to store matching sections

  function filterList() {
      let searchTerm = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      list = [];

      // Clear previous highlights
      clearHighlights();

      resumeSections.forEach(section => {
          const textContent = section.textContent.trim().toLowerCase();
          
          // Check if the section contains the search term
          if (textContent.includes(searchTerm)) {
              // Create a new element with marked search term
              const markedContent = markSearchTerm(section.cloneNode(true), searchTerm);
              section.innerHTML = markedContent.innerHTML; // Update the original section with marked content
              list.push({ element: markedContent, original: section }); // Store matching section and original element
          }
      });

      displayResults(); // Display the filtered results
  }

  // Function to mark search term within a section
  function markSearchTerm(element, searchTerm) {
      // Regex to find search term globally and case insensitively
      const regex = new RegExp(searchTerm, 'gi');
      element.innerHTML = element.innerHTML.replace(regex, match => `<span class="highlight">${match}</span>`);
      return element;
  }

  function displayResults() {
      // Clear previous results
      searchResults.innerHTML = '';

      // Display each matching section
      list.forEach((result, index) => {
          const li = document.createElement('li');
          li.innerHTML = result.element.innerHTML;
          li.addEventListener('click', () => handleResultClick(result, index)); // Bind original element to scrollToSection
          searchResults.appendChild(li);
      });
  }

  function handleResultClick(result, index) {
      scrollToSection(result.original);
      removeResult(index);
  }

  function scrollToSection(originalElement) {
      // Remove previous highlight
      let highlightedElements = document.querySelectorAll('.highlighted');
      highlightedElements.forEach(el => el.classList.remove('highlighted'));

      // Highlight clicked section
      originalElement.classList.add('highlighted');

      // Scroll to highlighted section
      originalElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function removeResult(index) {
      list.splice(index, 1);
      displayResults(); // Refresh the results list
  }

  function clearHighlights() {
      const highlightedElements = document.querySelectorAll('.highlight');
      highlightedElements.forEach(el => {
          const parent = el.parentNode;
          parent.replaceChild(document.createTextNode(el.textContent), el);
          parent.normalize();
      });
  }

  searchButton.addEventListener('click', filterList);
  cleanButton.addEventListener('click', function() {
      searchInput.value = ''; // Clear search input
      searchResults.innerHTML = ''; // Clear result list
      const highlightedElements = document.querySelectorAll('.highlighted');
      highlightedElements.forEach(el => el.classList.remove('highlighted')); // Remove highlight from previous results
      clearHighlights(); // Clear all highlights
  });
  searchInput.addEventListener('input', filterList);
});
