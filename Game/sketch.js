let screen = 0;
let mainFont, secondaryFont, startButton;

function preload() {
  mainFont = loadFont("libraries/Poppins-Bold.ttf");
  secondaryFont = loadFont("libraries/Poppins-Regular.ttf");
}

function setup() {
  let width = 500;
  let height = 400;
  createCanvas(width, height);
  
  // Create the start button
  startButton = createButton("Click here to start");
  startButton.position(width / 2 - 100, height / 2 + 100);
  startButton.style("font-size", "18px");
  startButton.style("padding", "10px 20px");
  startButton.style("background-color", "#ffffff");
  startButton.style("color", "#000000");
  
  // Set the button to change the screen when clicked
  startButton.mousePressed(() => {
    screen = 1;
  });

  nextButton = createButton("Click here to go to question 1");
  nextButton.position(width / 2 - 100, height / 2 + 100);
  nextButton.style("font-size", "18px");
  nextButton.style("padding", "10px 20px");
  nextButton.style("background-color", "#ffffff");
  nextButton.style("color", "#000000");
  nextButton.hide();
}

function draw() {
  drawBackground();
  if (screen == 0) {
    showScreen0();
  } else {
    showScreen1();
  }
}

function drawBackground() {
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
  drawBackground();
  mainFontSetup();
  text("WASTE-WISE", width / 2, height / 2);
  secondaryFontSetup();
  text("An educational game experience", width / 2, height / 2 + 50);

  // Show the start button on screen 0
  startButton.show();
}

function showScreen1() {
  drawBackground();
  mainFontSetup();
  text("Instructions", width / 2, height / 2 - 100);
  secondaryFontSetup();
  text("Answer which choice you think\nis the most sustainable\nand avoids overconsumption", width / 2, height / 2);

  // Hide the start button on screen 1 
  startButton.hide();
  nextButton.show();
}

function showQuestionScreen(){
  drawBackground();
  mainFontSetup();
  text("Question 1", width / 2, height / 2 - 100);
  secondaryFontSetup();
  text("Question here", width / 2, height / 2);
  // Hide the start button on screen 1 
  startButton.hide();
  nextButton.show();
}

function mainFontSetup() {
  textFont(mainFont);
  textAlign("center");
  fill("white");
  textSize(50);
}

function secondaryFontSetup() {
  textFont(secondaryFont);
  textAlign("center");
  fill("white");
  textSize(20);
}
