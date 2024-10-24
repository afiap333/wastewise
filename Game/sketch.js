var screen=0;
function preload(){
  mainFont=loadFont("libraries/Poppins-Bold.ttf");
  secondaryFont=loadFont("libraries/Poppins-Regular.ttf")
}

function setup() {
  let width=500;
  let height=400;
  createCanvas(width, height);
  startButton=new Sprite();
  startButton.x=-1000;
  startButton.y=-1000;
  startButton.width=200;
  startButton.height=50;
  startButton.text="Click here to start";
  startButton.color="white";
}

function draw() {
  switch(screen){
    case 0:
      showScreen0();
      print(screen);
      break;
    case 1:
      showScreen1();
      break;
  }
}

function drawBackground(){
  fillGradient('linear',{'steps':[[color("#AA88A2")],[color("#401F3E")]]});
  ('linear', {
    'from' : [20, 20], // starting point [x, y] coords
    'to' : [580, 580], // ending point [x, y] coords
    'steps' : [
        [ color(255), 0 ], // p5Color Object, stopAt (0-1)
        [ color(0, 96, 164), .25 ],
        [ color(0, 128, 196), .75 ],
        [ color(0), 1 ]
    ]
})
  rect(0, 0, width, height);  
}

function showScreen0(){
  drawBackground();
  mainFontSetup();
  text("WASTE-WISE",width/2,height/2);
  secondaryFontSetup();
  text("An educational game experience",width/2,height/2+50);
  startButton.x=200;
  startButton.y=300;
  startButton.onMousePressed=showScreen1();
}

function showScreen1(){
  startButton.x=-1000;
  drawBackground();
  secondaryFontSetup();
  text("Screen 2",width/2,height/2+50);
}

function mainFontSetup(){
  textFont(mainFont);
  textAlign("center");
  fill("white");
  textSize(50);
}

function secondaryFontSetup(){
  textFont(secondaryFont);
  textAlign("center");
  fill("white");
  textSize(20);
}

function setUpStartButton(x,y){

}
