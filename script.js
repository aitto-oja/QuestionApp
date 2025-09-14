fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let nQuestions = data.questions.length;
        const n = Math.floor(Math.random() * nQuestions);
        const questionData = data.questions[n];
        document.getElementById('question').textContent = questionData.question;
        const buttons = [
            document.getElementById('optionA'),
            document.getElementById('optionB'),
            document.getElementById('optionC'),
            document.getElementById('optionD')
        ];

        buttons.forEach((button, index) => {
            button.textContent = "(" + String.fromCharCode(65 + index) + ") " + questionData.options[index];
            button.onclick = () => {
                if (index === questionData.correctIndex) {
                    alert("Correct!");
                } else {
                    alert("Incorrect. Try again!");
                }
            };
        });
    });
