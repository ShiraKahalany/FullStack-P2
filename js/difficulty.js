// Function to handle difficulty button clicks
function handleDifficultySelection(difficulty) {
    // Save the selected difficulty in localStorage
    localStorage.setItem('difficulty', difficulty);
    // Redirect the user to the memory game page
    window.location.href = '/html/memory.html';
  }
  
  // Add event listeners to the difficulty buttons
  document.getElementById('easy-btn').addEventListener('click', function() {
    handleDifficultySelection('easy');
  });
  
  document.getElementById('medium-btn').addEventListener('click', function() {
    handleDifficultySelection('medium');
  });
  
  document.getElementById('hard-btn').addEventListener('click', function() {
    handleDifficultySelection('hard');
  });
  