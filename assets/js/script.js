 // Sample question data
 const questions = [
    { text: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"] },
    { text: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
    { text: "What is the color of the sky?", options: ["Blue", "Green", "Red", "Yellow"] },
    { text: "What is the capital of Spain?", options: ["Madrid", "Rome", "Paris", "Berlin"] },
    { text: "What is the boiling point of water?", options: ["50°C", "100°C", "150°C", "200°C"] }
];
let currentQuestionIndex = 0;
let answers = Array(questions.length).fill(null);

// Function to display the current question
function displayQuestion(index) {
    const question = questions[index];
    document.getElementById("questionTitle").textContent = `Question ${index + 1}`;
    document.getElementById("questionText").textContent = question.text;
    question.options.forEach((option, i) => {
        const optionElement = document.getElementById(`option${i + 1}`);
        optionElement.nextElementSibling.textContent = `${String.fromCharCode(65 + i)}. ${option}`;
        optionElement.checked = answers[index] === i; // Retain selected answer
    });
}

// Function to go to a specific question
function goToQuestion(index) {
    currentQuestionIndex = index - 1;
    displayQuestion(currentQuestionIndex);
}

// Function to go to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

// Event listeners for answer options
document.querySelectorAll(".answer-option").forEach(option => {
    option.addEventListener("change", (e) => {
        const selectedOption = parseInt(e.target.value);
        answers[currentQuestionIndex] = selectedOption;
        
        // Change button color to green when answered
        const questionBtn = document.getElementById(`questionBtn${currentQuestionIndex + 1}`);
        if (questionBtn) {
            questionBtn.classList.remove("btn-outline-primary");
            questionBtn.classList.add("btn-success");
        }
    });
});

// Function to submit the exam
function submitExam() {
    if (answers.includes(null)) {
        alert("Please answer all questions before submitting.");
    } else {
        // Here, you can send answers to the server or display a confirmation
        alert("Exam submitted successfully!");
        console.log("Submitted Answers:", answers);
    }
}

// Display the first question on page load
displayQuestion(currentQuestionIndex);

// Initialize the countdown time in seconds (90 minutes = 5400 seconds)
let timeLeft = 90 * 60;

// Function to format the time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update the clock every second
const countdown = setInterval(() => {
    document.getElementById("clock").textContent = formatTime(timeLeft);
    
    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.getElementById("clock").textContent = "Time's up!";
    } else {
        timeLeft--;
    }
}, 1000);