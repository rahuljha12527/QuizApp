const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuentionsIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener('click',()=>{
    currentQuentionsIndex++;
    setNextQuestion()
})

function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuentionsIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuentionsIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
    clearStatusClass(document.body)
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
    const selectedButton=e.target
    const correct=selectedButton.dataset.correct
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct)
    })
    if(shuffledQuestions.length>currentQuentionsIndex+1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText='Restart'
        startButton.classList.remove('hide')
    }
   
}

function setStatusClass(element,correct){
   clearStatusClass(element)
   if(correct){
       element.classList.add('correct');
   }else{
       element.classList.add('wrong');
   }
}


function clearStatusClass(element){
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
const questions = [
  {
    question: "Who is the best cricketer in the world?",
    answers: [
      { text: "Sachin Tendulker", correct: true },
      { text: "Virat Kolli", correct: false },
      { text: "Adam Gilchirst", correct: false },
      { text: "Jacques Kallis", correct: false },
    ],
  },
  {
    question: "What are the colors in the Indian national flag? ",
    answers: [
      { text: "White", correct: true },
      { text: "Yellow", correct: false },
      { text: "Orange", correct: true },
      { text: "Green", correct: true },
    ],

  },

];
