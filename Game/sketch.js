let screen = 0;
let bg;
let mainFont, secondaryFont, startButton, nextButton;
let questions, currentQuestionIndex = 0, score = 0;
let optionButtons = [];
let width=900, height=600;

function preload() {
  mainFont = loadFont("Game/libraries/Poppins-Bold.ttf");
  secondaryFont = loadFont("Game/libraries/Poppins-Regular.ttf");
  
  // Use a callback to ensure questions is populated after JSON is loaded
  loadJSON('Game/questions.json', (data) => {
    questions = data;
  });
  bg=loadImage("Game/gameBackground.png");
}

function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent("game-container");  // Attach canvas to the specified div

  // Create start and next buttons
  startButton = createButton("Click here to start");
  startButtonStyling();

  nextButton = createButton("Start Quiz");
  nextButtonStyling();
}


function draw() {
  if (!questions) {  // Show loading screen if questions are not loaded
    background(bg);
    fill("#16697A");
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Loading quiz...", width / 2, height / 2);
    return;
  }
  background(bg);
 // drawBackground();

  if (screen == 0) {
    showScreen0();  
  } else if (screen == 1) {
    showScreen1();  
  } else if (screen == 2) {
    displayQuestion();  
  } else if (screen == 3) {
    showEndScreen();  
  }
}

function drawBackground() {
  background(bg);
  fillGradient('linear', {
    'from': [20, 20],
    'to': [580, 580],
    'steps': [
      [color("purple"), 0],
      [color("teal"), .25],
      [color("purple"), .75],
    ]
  });
  rect(0, 0, width, height);
}

function showScreen0() {
  mainFontSetup();
  text("WASTE-WISE", width / 2, height / 2-50);
  secondaryFontSetup();
  text("An educational game experience", width / 2, height / 2 );
}

function showScreen1() {
  mainFontSetup();
  text("Instructions", width / 2, height / 2 - 100);
  secondaryFontSetup();
  text("Answer which choice you think\nis the most sustainable\nand avoids overconsumption", width / 2, height / 2);
}

function setUpQuestion() {
  optionButtons.forEach(button => button.remove());
  optionButtons = [];

  const currentQuestion = questions[currentQuestionIndex];
  mainFontSetup();
  text(currentQuestion.question, width / 2, 100);

  currentQuestion.options.forEach((option, index) => {
    let button = createButton(option);
    buttonStylingChoices(button,index);
    button.mousePressed(() => checkAnswer(option));
    optionButtons.push(button);
  });
}

function displayQuestion() {
  background(bg);
  const currentQuestion = questions[currentQuestionIndex];

  secondaryFontSetup();
  text(currentQuestion.question, width / 2, 100);
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correct) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < Object.keys(questions).length) {
    setUpQuestion();
  } else {
    screen = 3;
  }
}

function showEndScreen() {
  optionButtons.forEach(button => button.remove());
  
  secondaryFontSetup();
  text(`Quiz complete! Your score: ${score}/${Object.keys(questions).length}`, width / 2, height / 2);
}

function mainFontSetup() {
  textFont(mainFont);
  textAlign(CENTER, CENTER);
  fill("white");
  textSize(60);
}

function secondaryFontSetup() {
  textFont(secondaryFont);
  textAlign(CENTER, CENTER);
  fill("white");
  textSize(20);
}

function startButtonStyling(){
  startButton.position(width / 2 - 100, height / 2 + 50);
  buttonStyling(startButton);
  startButton.mousePressed(() => {
    screen = 1;
    startButton.hide();
    nextButton.show();
  });
}
function nextButtonStyling(){
  nextButton.position(width / 2, height / 2 + 50);
  nextButton.CENTER;
  buttonStyling(nextButton);
  nextButton.hide();
  nextButton.mousePressed(() => {
    if (questions) {  // Check if questions are loaded
      screen = 2;
      nextButton.hide();
      setUpQuestion();
    }
  });
}

function buttonStyling(button){
  button.style("font-size", "18px");
  button.style("padding", "10px 20px");
  button.style("background-color", "#499F68");
  button.style("color", "#ffffff");
  button.style("font-weight","bold");
  button.style('position', 'absolute');
  button.style('left', '50%');
  button.style('top', '70%');
  button.style('transform', 'translate(-50%, -70%)'); 
}

function buttonStylingChoices(button,index){
  button.style("font-size", "18px");
  button.style("padding", "10px 20px");
  button.style("background-color", "#499F68");
  button.style("color", "#ffffff");
  button.style("font-weight","bold");
  if(index==0){
  button.style('left', '40%');}
  if(index==1){
    button.style('right','40%');
  }
  button.style('top', '50%');
  button.style('position', 'absolute');
  button.style('transform', 'translate(-50%, -40%)'); 
}