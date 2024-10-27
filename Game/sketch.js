let screen = 0;
let mainFont, secondaryFont, startButton, nextButton;
let questions, currentQuestionIndex = 0, score = 0;
let optionButtons = [];

function preload() {
  mainFont = loadFont("libraries/Poppins-Bold.ttf");
  secondaryFont = loadFont("libraries/Poppins-Regular.ttf");
  
  // Use a callback to ensure questions is populated after JSON is loaded
  loadJSON('questions.json', (data) => {
    questions = data;
  });
}

function setup() {
  createCanvas(500, 400);

  // Create the start button
  startButton = createButton("Click here to start");
  startButton.position(width / 2 - 100, height / 2 + 100);
  startButton.style("font-size", "18px");
  startButton.style("padding", "10px 20px");
  startButton.style("background-color", "#ffffff");
  startButton.style("color", "#000000");
  startButton.mousePressed(() => {
    screen = 1;
    startButton.hide();
    nextButton.show();
  });

  // Create the next button for advancing to the first question
  nextButton = createButton("Start Quiz");
  nextButton.position(width / 2 - 100, height / 2 + 150);
  nextButton.style("font-size", "18px");
  nextButton.style("padding", "10px 20px");
  nextButton.style("background-color", "#ffffff");
  nextButton.style("color", "#000000");
  nextButton.hide();
  nextButton.mousePressed(() => {
    if (questions) {  // Check if questions are loaded
      screen = 2;
      nextButton.hide();
      setUpQuestion();
    }
  });
}

function draw() {
  if (!questions) {  // Show loading screen if questions are not loaded
    background(50);
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Loading quiz...", width / 2, height / 2);
    return;
  }
  
  drawBackground();

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
  background(50);
  fillGradient('linear', {
    'from': [20, 20],
    'to': [580, 580],
    'steps': [
      [color(255), 0],
      [color(0, 96, 164), .25],
      [color(0, 128, 196), .75],
      [color(0), 1]
    ]
  });
  rect(0, 0, width, height);
}

function showScreen0() {
  mainFontSetup();
  text("WASTE-WISE", width / 2, height / 2);
  secondaryFontSetup();
  text("An educational game experience", width / 2, height / 2 + 50);
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
    button.position(150, 200 + index * 40);
    button.mousePressed(() => checkAnswer(option));
    optionButtons.push(button);
  });
}

function displayQuestion() {
  background(50);
  drawBackground();
  const currentQuestion = questions[currentQuestionIndex];

  mainFontSetup();
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
  
  mainFontSetup();
  text(`Quiz complete! Your score: ${score}/${Object.keys(questions).length}`, width / 2, height / 2);
}

function mainFontSetup() {
  textFont(mainFont);
  textAlign(CENTER, CENTER);
  fill("white");
  textSize(30);
}

function secondaryFontSetup() {
  textFont(secondaryFont);
  textAlign(CENTER, CENTER);
  fill("white");
  textSize(20);
}
