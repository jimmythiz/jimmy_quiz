const quiz = [
    {
        q:`Which month comes right before June?`,
        options:[`May`,`September`,`July`,`August`],
        answer:0
    },
    {
        q:`What Color is a Banana`,
        options:[`Red`,`Yellow`,`White`,`Blue`],
        answer:1
    },
    {
        q:`3 + 4 = 7 ?`,
        options:[`true`,`False`],
        answer:0
    },
    {
        q:`What time of the Day do we have Breakfast?`,
        options:[`In the afternoon`,`In the evening`,`In the morning`],
        answer:2
    },
    {
        q:`What is 22 + 6?`,
        options:[`99`,`56`,`16`,`28`],
        answer:3
    },
]

const questionNumber = document.querySelector(`.question-number`)
const questionText = document.querySelector(`.question-text`)
const optionContainer = document.querySelector(`.option-container`)
const nextQuestionbtn = document.querySelector(`#next`)
const answesIndicatorContainer = document.querySelector(`.answers-indicator`)
const homebox = document.querySelector(`.home-box`)
const quizbox = document.querySelector(`.quiz-box`)
const resultbox = document.querySelector(`.result-box`)
const tryAgain = document.querySelector(`#tryagain`)
const gohome = document.querySelector(`#gohome`)
const startQuiz = document.querySelector(`#startQuiz`)

let questionCounter = 0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[]
let correctAnswers = 0
let attempts = 0
let wrongAnswers =0

function setAvailablequestions (){
    const totalQuestions = quiz.length;
    for (let i =0;i < totalQuestions;i++){
        availableQuestions.push(quiz[i])
    }
    console.log(availableQuestions);
}
function getNewQuestion(){
    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quiz.length}`
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    const index1 = availableQuestions.indexOf(questionIndex)
    availableQuestions.splice(index1,1)
    const optionLenght = currentQuestion.options.length
    for (let i=0;i<optionLenght;i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = ``
    let animationDelay = 0.2
    for (let i=0;i<optionLenght;i++){
        const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)]
        const index2 = availableOptions.indexOf(optionIndex)
        availableOptions.splice(index2,1)
        const option = document.createElement("div")
        option.innerHTML = currentQuestion.options[i]
        option.className = "option"
        option.id = i
        option.style.animationDelay = `${animationDelay}s`
        animationDelay = animationDelay + 0.2
        optionContainer.appendChild(option)
        option.setAttribute(`onclick`,`getResult(this)`)
    } 


    questionCounter++
}

function getResult(optionElement){
    const id = parseInt(optionElement.id)
    if (id===currentQuestion.answer){
        optionElement.classList.add("correct")
        updateAnswerIndicator("correct")
        correctAnswers ++
        console.log(correctAnswers)
    } else {
        optionElement.classList.add("wrong")
        updateAnswerIndicator("wrong")
        const optionLenght = optionContainer.children.length
        for (let i=0;i<optionLenght;i++){
            if (parseInt (optionContainer.children[i].id)=== currentQuestion.answer){
                optionContainer.children[i].classList.add("correct")
            }
        }
        
    }
    attempts ++
    unclickableOptions();
}

function unclickableOptions(){
    const optionLenght = optionContainer.children.length
    for (let i=0;i<optionLenght;i++){
        optionContainer.children[i].classList.add("already-answered")
    }
}
function answersIndicator(){
    answesIndicatorContainer.innerHTML = ``
    const totalQuestion = quiz.length
    for (i=0;i<totalQuestion;i++){
        const indicator = document.createElement("div")
        answesIndicatorContainer.appendChild(indicator)
    }
}
function next (){
    if (questionCounter === quiz.length){
        quizOver()
    } else {
        getNewQuestion()
    }
}
function updateAnswerIndicator(marktype){
    answesIndicatorContainer.children[questionCounter-1].classList.add(marktype)
}
function quizResult(){
    resultbox.querySelector(`.total-question`).innerHTML = quiz.length
    resultbox.querySelector(`.total-attempt`).innerHTML = attempts
    resultbox.querySelector(`.total-correct`).innerHTML = correctAnswers
    resultbox.querySelector(`.total-wrong`).innerHTML = attempts - correctAnswers
    const percentage = (correctAnswers/quiz.length) * 100
    resultbox.querySelector(`.percentage`).innerHTML = percentage.toFixed(2) + "%"
    resultbox.querySelector(`.total-score`).innerHTML = `${correctAnswers} / ${quiz.length}` 
}
function quizOver(){
    quizbox.classList.add("hide")
    resultbox.classList.remove("hide")
    quizResult()
}
function resetQuiz(){
    
    questionCounter = 0;
    currentQuestion;
    correctAnswers = 0
    attempts = 0
    availableQuestions = [];
    availableOptions = [];
    answesIndicatorContainer.innerHTML = ``;


}
function tryAgainQuiz(){
    resultbox.classList.add("hide")
    quizbox.classList.remove("hide");
    resetQuiz();
    setAvailablequestions()
    startQuizFunction()
}
function goTohome(){
    resultbox.classList.add("hide")
    homebox.classList.remove("hide")
    resetQuiz();
    setAvailablequestions()
}

function startQuizFunction(){
    homebox.classList.add("hide")
    quizbox.classList.remove("hide")
    setAvailablequestions ();
    getNewQuestion();
    answersIndicator();
}
nextQuestionbtn.addEventListener(`click`,next)
tryAgain.addEventListener(`click`,tryAgainQuiz)
gohome.addEventListener(`click`,goTohome)
startQuiz.addEventListener(`click`,startQuizFunction)