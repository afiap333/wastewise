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
}

function draw() {
  switch(screen){
    case 0:
      showScreen0();
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
  startButton.x=width/2;
  startButton.y=height/2+150;
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
