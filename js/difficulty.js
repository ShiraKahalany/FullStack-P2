// Function to handle difficulty button clicks and redirect to memory game page
function handleDifficultySelection(difficulty) {
  // Save selected difficulty in localStorage
  localStorage.setItem('difficulty', difficulty);
  // Redirect user to memory game page
  window.location.href = '/html/memory.html';
}

// Add event listeners to difficulty buttons
document.getElementById('easy-btn').addEventListener('click', function() {
  handleDifficultySelection('easy');
});

document.getElementById('medium-btn').addEventListener('click', function() {
  handleDifficultySelection('medium');
});

document.getElementById('hard-btn').addEventListener('click', function() {
  handleDifficultySelection('hard');
});
