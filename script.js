let score = 0;
let questionNumber = 0;
let questionCount = 0;

function showAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').classList.remove('hidden');
}

function closeAlert() {
    document.getElementById('customAlert').classList.add('hidden');
}

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
        const progressElement = document.getElementById('progress');
        progressElement.textContent = 'Progress: ' + questionNumber + '/5     Score: ' + score;

        const startBtnElement = document.getElementById('startBtn');
        startBtnElement.onclick = () => {
            loadQuestion(questionNumber);
            document.getElementById('progress').classList.remove('hidden');
        }

        function loadQuestion(index) {
            const questionData = questions[index];
            questionElement.textContent = questionData.question;
            buttons.forEach((button, index) => {
                button.textContent = '(' + String.fromCharCode(65 + index) + ') ' + questionData.options[index];
                button.onclick = () => {
                    if (index === questionData.correctIndex) {
                        score++;
                        showAlert('Correct!');
                    } else {
                        showAlert('Incorrect. Try again!');
                    }
                    questionCount++;
                    document.getElementById('progress').textContent = 'Progress: ' + questionCount + '/5     Score: ' + score;
                    if (questionCount < 5) {
                        const questionAmount = questions.length;
                        const nNewQuestion = Math.floor(Math.random() * questionAmount);
                        loadQuestion(nNewQuestion);
                    } else {
                        showAlert('Quiz completed! Your score: ' + score + '/' + questionCount);
                        document.getElementById('nextBtn').disabled = true;
                    }

                };
            });
        };


    });
