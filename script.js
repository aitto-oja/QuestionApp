let score = 0;
let questionNumber = 0;
let questionCount = 0;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        const questionElement = document.getElementById('question');
        const buttons = [
            document.getElementById('optionA'),
            document.getElementById('optionB'),
            document.getElementById('optionC'),
            document.getElementById('optionD')
        ];

        const startBtnElement = document.getElementById('startBtn');
        startBtnElement.onclick = () => {
            loadQuestion(questionNumber);
        }

        function loadQuestion(index) {
            const questionData = questions[index];
            questionElement.textContent = questionData.question;
            buttons.forEach((button, index) => {
                button.textContent = '(' + String.fromCharCode(65 + index) + ') ' + questionData.options[index];
                button.onclick = () => {
                    if (index === questionData.correctIndex) {
                        score++;
                        alert('Correct!');
                    } else {
                        alert('Incorrect. Try again!');
                    }
                    questionCount++;
                    if (questionCount < 5) {
                        const questionAmount = questions.length;
                        const nNewQuestion = Math.floor(Math.random() * questionAmount);
                        loadQuestion(nNewQuestion);
                    } else {
                        questionElement.textContent = 'Quiz completed! Your score: ' + score + '/' + questionCount;
                        buttons.forEach(button => button.style.display = 'none');
                    }

                };
            });
        };


    });
