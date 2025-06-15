const quiz = document.getElementById("quiz");

const questions = [
    {
        id: 1,
        question: "What is the language used to create the structure of a webpage?",
        choices: ["CSS", "JavaScript", "Python", "HTML"],
        answerIndex: 3
    },
    {
        id: 2,
        question: "What is the language used to style a webpage?",
        choices: ["HTML", "JavaScript", "CSS", "Python"],
        answerIndex: 2
    },
    {
        id: 3,
        question: "What tag is used to create a hyperlink?",
        choices: ["<p>", "<a>", "<link>", "<div>"],
        answerIndex: 1
    },
    {
        id: 4,
        question: "Who is the creator of JavaScript?",
        choices: ["Brendan Eich", "Tim Berners-Lee", "Mark Zuckerberg", "Larry Page"],
        answerIndex: 0
    },
    {
        id: 5,
        question: "How do you insert a comment in HTML?",
        choices: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
        answerIndex: 1
    },
    {
        id: 6,
        question: "How do you select an element by its ID in JavaScript?",
        choices: ["getElementsByClass", "querySelector", "getElementById", "findId"],
        answerIndex: 2
    },
    {
        id: 7,
        question: "What is a semantic HTML tag?",
        choices: ["<div>", "<span>", "<header>", "<br>"],
        answerIndex: 2
    },
    {
        id: 8,
        question: "How to add a background color in CSS?",
        choices: ["color: red;", "font-size: 20px;", "background: red;", "border: 1px solid black;"],
        answerIndex: 2
    },
    {
        id: 9,
        question: "What JavaScript method converts a string into an array?",
        choices: ["parse()", "split()", "toArray()", "push()"],
        answerIndex: 1
    },
    {
        id: 10,
        question: "What does DOM stand for?",
        choices: ["Document Object Model", "Display Object Method", "Digital Operations Module", "Developer Oriented Model"],
        answerIndex: 0
    }
];


// Arrow function to create a fieldset for a single question
const createQuestion = (id) => {
    const question = questions.find(q => q.id === id);
    if (!question) return null;

    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = question.question;
    fieldset.appendChild(legend);

    question.choices.forEach((choice, index) => {
        const div = document.createElement('div');
        div.classList.add('question');

        const input = document.createElement('input');
        input.id = `q${question.id}${String.fromCharCode(97 + index)}`;

        input.name = `question${question.id}`;

        input.value = choice;
        input.type = 'radio';

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = choice;

        div.appendChild(input);
        div.appendChild(label);
        fieldset.appendChild(div);
    });

    return fieldset;
}

// Function to iterate through all questions and append to form
function displayQuestions() {
    const quiz = document.querySelector("#quiz");

    questions.forEach(question => {
        const fieldset = createQuestion(question.id);
        if (fieldset) {
            quiz.prepend(fieldset);
        }
    });
}

function calculateScore() {
    let score = 0;

    questions.forEach(question => {
        // Get all radio button options for this question
        const selected = document.querySelector(`input[name='question${question.id}']:checked`);

        if (selected) {
            // Find which choice was selected
            const selectedIndex = question.choices.indexOf(selected.value);

            // Check if it's the correct answer
            if (selectedIndex === question.answerIndex) {
                score++;
            }
        }
    });

    return score;
}

function displayScore() {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    // Create a new div element to show score
    const scoreDiv = document.createElement('div');
    scoreDiv.textContent = `Your score: ${score}/${questions.length} (${percentage.toFixed(2)}%)`;

    // Apply class based on percentage
    if (percentage >= 80) {
        scoreDiv.classList.add('success'); // Passed
    } else {
        scoreDiv.classList.add('failed'); // Failed
    }
    // Append it to the quiz
    document.querySelector("#quiz").appendChild(scoreDiv);
}


// Display questions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayQuestions();

    quiz.addEventListener('submit', (e) => {
        e.preventDefault();
        // Remove previously displayed score if any
        const previous = quiz.querySelector('.success') ||
            quiz.querySelector('.failed');
        if (previous) {
            previous.remove();
        }
        displayScore();
    });
});
