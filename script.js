const form = document.getElementById('ask-form');
const questionInput = document.getElementById('question');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const question = questionInput.value.trim();

  if (question) {
    fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    })
    .then(response => response.json())
    .then(data => {
      responseDiv.textContent = data.response;
      questionInput.value = ''; // Clear the input field
    })
    .catch(error => {
      console.error('Error:', error);
      responseDiv.textContent = 'An error occurred. Please try again later.';
    });
  } else {
    responseDiv.textContent = 'Please enter a question.';
  }
});
