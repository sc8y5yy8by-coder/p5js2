let tilt = 0;
let faceOffsetY = 0;
let blinkFrames = 0;      
let browDownFrames = 0;  
let mood = 2;           
let mouthParams = { upperK: 0.2, lowerK: 0.2 };
let EYE_OPEN_BASE = 1.0;
let nodFrames = 0;       
let tiltWiggleFrames = 0; 

function setup() {
  createCanvas(600, 400);
  frameRate(30);
  pixelDensity(1);
}

function draw() {
  background(255);
  setMouthByMood(mood);

  let eyeFollowX = map(mouseX, 0, width, -7, 7, true);
  let eyeFollowY = map(mouseY, 0, height, -4, 4, true);
  let pressNarrow;

  if (mouseIsPressed) {
    pressNarrow = 0.85;
  } else {
    pressNarrow = 1.0;
  }

  if (blinkFrames > 0) blinkFrames--;
  let eyeOpenNow;
  if (blinkFrames > 0) {
    eyeOpenNow = 0.12 * pressNarrow; // 완전 감기
  } else {
    eyeOpenNow = EYE_OPEN_BASE * pressNarrow;
  }

  if (browDownFrames > 0) browDownFrames--;
  let browShiftY;
  if (browDownFrames > 0) {
    browShiftY = 2;
  } else {
    browShiftY = 0;
  }

  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW)  tilt = max(tilt - 0.6, -15);
    if (keyCode === RIGHT_ARROW) tilt = min(tilt + 0.6,  15);
    if (keyCode === UP_ARROW)    faceOffsetY = max(faceOffsetY - 0.6, -20);
    if (keyCode === DOWN_ARROW)  faceOffsetY = min(faceOffsetY + 0.6,  20);
  }

  let nodOffset = 0;
  if (nodFrames > 0) {
    nodFrames--;
    nodOffset = 8 * sin(frameCount * 0.35) * (nodFrames / 90);
  }

  let tiltWiggleOffset = 0;
  if (tiltWiggleFrames > 0) {
    tiltWiggleFrames--;
    tiltWiggleOffset = 6 * sin(frameCount * 0.25) * (tiltWiggleFrames / 90);
  }

  push();
  translate(width * 0.5, height * 0.55 + faceOffsetY + nodOffset);
  rotate(radians(tilt + tiltWiggleOffset));

  // 귀
  noStroke(); fill('#F2D3B1');
  ellipse(-(210*0.55 - (30/2 - 1)), -270*0.08, 30, 50);
  ellipse( (210*0.55 - (30/2 - 1)), -270*0.08, 30, 50);

  // 얼굴
  fill('#F2D3B1');
  beginShape();
  curveVertex( 210*0.00,  270*(-0.50));
  curveVertex( 210*0.00,  270*(-0.50));
  curveVertex( 210*(-0.22), 270*(-0.48));
  curveVertex( 210*(-0.40), 270*(-0.39));
  curveVertex( 210*(-0.48), 270*(-0.06));
  curveVertex( 210*(-0.36), 270*( 0.22));
  curveVertex( 210*( 0.00), 270*( 0.42));
  curveVertex( 210*( 0.36), 270*( 0.22));
  curveVertex( 210*( 0.48), 270*(-0.06));
  curveVertex( 210*( 0.40), 270*(-0.39));
  curveVertex( 210*( 0.00), 270*(-0.50));
  curveVertex( 210*( 0.00), 270*(-0.50));
  endShape();

  // 얼굴 외곽선
  noFill(); stroke(0,0,0,40); strokeWeight(2);
  beginShape();
  curveVertex( 210*0.00,  270*(-0.50));
  curveVertex( 210*0.00,  270*(-0.50));
  curveVertex( 210*(-0.22), 270*(-0.48));
  curveVertex( 210*(-0.40), 270*(-0.39));
  curveVertex( 210*(-0.48), 270*(-0.06));
  curveVertex( 210*(-0.36), 270*( 0.22));
  curveVertex( 210*( 0.00), 270*( 0.42));
  curveVertex( 210*( 0.36), 270*( 0.22));
  curveVertex( 210*( 0.48), 270*(-0.06));
  curveVertex( 210*( 0.40), 270*(-0.39));
  curveVertex( 210*( 0.00), 270*(-0.50));
  curveVertex( 210*( 0.00), 270*(-0.50));
  endShape();

  // 눈
  noStroke(); fill(255);
  ellipse(-210*0.230, -270*0.105, 210*0.20, 270*0.066 * eyeOpenNow);
  ellipse( 210*0.230, -270*0.105, 210*0.20, 270*0.066 * eyeOpenNow);

  // 동공
  fill(95,110,120);
  ellipse(-210*0.230 + eyeFollowX, -270*0.105 + eyeFollowY, 15, 15 * eyeOpenNow);
  ellipse( 210*0.230 + eyeFollowX, -270*0.105 + eyeFollowY, 15, 15 * eyeOpenNow);
  fill(20);
  ellipse(-210*0.230 + eyeFollowX, -270*0.105 + eyeFollowY, 7.2, 7.2 * eyeOpenNow);
  ellipse( 210*0.230 + eyeFollowX, -270*0.105 + eyeFollowY, 7.2, 7.2 * eyeOpenNow);

  // 눈 외곽선
  stroke(0,65); strokeWeight(1.8); noFill();
  arc(-210*0.230, -270*0.105, 210*0.20, 270*0.066 * eyeOpenNow, PI*0.92, PI*0.08);
  arc( 210*0.230, -270*0.105, 210*0.20, 270*0.066 * eyeOpenNow, PI*0.92, PI*0.08);
  stroke(0,30); strokeWeight(1.5);
  arc(-210*0.230, -270*0.105 + 1, 210*0.196, 270*0.058 * eyeOpenNow, PI*0.08, PI*0.92);
  arc( 210*0.230, -270*0.105 + 1, 210*0.196, 270*0.058 * eyeOpenNow, PI*0.08, PI*0.92);

  // 눈썹
  noStroke(); fill('#222');
  push(); translate(0, browShiftY);
  
  beginShape();
  curveVertex(-210*0.240 - 210*0.22*0.52*cos(PI/60), -270*0.17 - 210*0.22*0.52*sin(PI/60));
  curveVertex(-210*0.240 - 210*0.22*0.50*cos(PI/60) + 270*0.026*0.5*sin(PI/60),
              -270*0.17 - 210*0.22*0.50*sin(PI/60) - 270*0.026*0.5*cos(PI/60));
  curveVertex(-210*0.240 + 210*0.22*0.50*cos(PI/60) + 270*0.026*0.5*sin(PI/60),
              -270*0.17 + 210*0.22*0.50*sin(PI/60) - 270*0.026*0.5*cos(PI/60));
  curveVertex(-210*0.240 + 210*0.22*0.50*cos(PI/60) - 270*0.026*0.5*sin(PI/60),
              -270*0.17 + 210*0.22*0.50*sin(PI/60) + 270*0.026*0.5*cos(PI/60));
  curveVertex(-210*0.240 - 210*0.22*0.50*cos(PI/60) - 270*0.026*0.5*sin(PI/60),
              -270*0.17 - 210*0.22*0.50*sin(PI/60) + 270*0.026*0.5*cos(PI/60));
  curveVertex(-210*0.240 - 210*0.22*0.52*cos(PI/60), -270*0.17 - 210*0.22*0.52*sin(PI/60));
  endShape(CLOSE);
  
  beginShape();
  curveVertex( 210*0.240 + 210*0.22*0.52*cos(PI/60), -270*0.17 - 210*0.22*0.52*sin(PI/60));
  curveVertex( 210*0.240 + 210*0.22*0.50*cos(PI/60) - 270*0.026*0.5*sin(PI/60),
              -270*0.17 - 210*0.22*0.50*sin(PI/60) - 270*0.026*0.5*cos(PI/60));
  curveVertex( 210*0.240 - 210*0.22*0.50*cos(PI/60) - 270*0.026*0.5*sin(PI/60),
              -270*0.17 + 210*0.22*0.50*sin(PI/60) - 270*0.026*0.5*cos(PI/60));
  curveVertex( 210*0.240 - 210*0.22*0.50*cos(PI/60) + 270*0.026*0.5*sin(PI/60),
              -270*0.17 + 210*0.22*0.50*sin(PI/60) + 270*0.026*0.5*cos(PI/60));
  curveVertex( 210*0.240 + 210*0.22*0.50*cos(PI/60) + 270*0.026*0.5*sin(PI/60),
              -270*0.17 - 210*0.22*0.50*sin(PI/60) + 270*0.026*0.5*cos(PI/60));
  curveVertex( 210*0.240 + 210*0.22*0.52*cos(PI/60), -270*0.17 - 210*0.22*0.52*sin(PI/60));
  endShape(CLOSE);
  pop();

  // 코
  stroke(0,26); strokeWeight(2); noFill();
  beginShape();
  curveVertex(0, -270*0.02 - 8);
  curveVertex(0, -270*0.02);
  curveVertex(-(210*0.08)*0.05, ( -270*0.02 +  270*0.095)*0.56);
  curveVertex(0,  270*0.095);
  curveVertex(0,  270*0.095 + 6);
  endShape();
  noStroke(); fill(0,20);
  ellipse(-210*0.08*0.42, 270*0.095 + 270*0.012, 210*0.08*0.30, 210*0.08*0.20);
  ellipse( 210*0.08*0.42, 270*0.095 + 270*0.012, 210*0.08*0.30, 210*0.08*0.20);
  fill(0,100);
  ellipse(-210*0.08*0.28, 270*0.095 + 270*0.012, 210*0.08*0.16, 210*0.08*0.09);
  ellipse( 210*0.08*0.28, 270*0.095 + 270*0.012, 210*0.08*0.16, 210*0.08*0.09);

  // 입
  let smileK = mouthParams.upperK;
  let lowerK = mouthParams.lowerK;

  noStroke(); fill(190,100,100,230);
  beginShape();
  vertex(-(210*0.28)*0.50,  270*0.200);
  bezierVertex(
    -(210*0.28)*0.30,  270*0.200 - 270*0.020*(0.20 - smileK),
    -(210*0.28)*0.10,  270*0.200 - 270*0.020*(0.50 - smileK),
    0,                 270*0.200 - 270*0.020*(0.45 - smileK)
  );
  bezierVertex(
    (210*0.28)*0.10,  270*0.200 - 270*0.020*(0.50 - smileK),
    (210*0.28)*0.30,  270*0.200 - 270*0.020*(0.20 - smileK),
    (210*0.28)*0.50,  270*0.200
  );
  bezierVertex(
    (210*0.28)*0.25,  270*0.200 - 270*0.020*(0.05 - smileK),
   -(210*0.28)*0.25,  270*0.200 - 270*0.020*(0.05 - smileK),
   -(210*0.28)*0.50,  270*0.200
  );
  endShape(CLOSE);

  fill(205,130,125,230);
  beginShape();
  vertex(-(210*0.28)*0.50,  270*0.200);
  bezierVertex(
    -(210*0.28)*0.25,  270*0.200 + 270*0.030*(0.20 + lowerK),
    -(210*0.28)*0.10,  270*0.200 + 270*0.030*(0.60 + lowerK),
     0,                270*0.200 + 270*0.030*(0.55 + lowerK)
  );
  bezierVertex(
    (210*0.28)*0.10,  270*0.200 + 270*0.030*(0.60 + lowerK),
    (210*0.28)*0.25,  270*0.200 + 270*0.030*(0.20 + lowerK),
    (210*0.28)*0.50,  270*0.200
  );
  bezierVertex(
    (210*0.28)*0.25,  270*0.200 + 270*0.030*(0.05 + lowerK),
   -(210*0.28)*0.25,  270*0.200 + 270*0.030*(0.05 + lowerK),
   -(210*0.28)*0.50,  270*0.200
  );
  endShape(CLOSE);

  stroke(80,40,40,90); strokeWeight(1.2); noFill();
  bezier(
    -(210*0.28)*0.48,  270*0.200 + 270*0.010*lowerK,
    -(210*0.28)*0.15,  270*0.200 + 270*0.030*(0.05 + lowerK),
     (210*0.28)*0.15,  270*0.200 + 270*0.030*(0.05 + lowerK),
     (210*0.28)*0.48,  270*0.200 + 270*0.010*lowerK
  );

  // 머리
  noStroke(); fill('#161616');
  beginShape();
  curveVertex(-210*0.55,  8 - 270*0.40);
  curveVertex(-210*0.55,  8 - 270*0.40);
  curveVertex(-210*0.42,  8 - 270*0.66);
  curveVertex(-210*0.22,  8 - 270*0.72);
  curveVertex( 0,         8 - 270*0.69);
  curveVertex( 210*0.22,  8 - 270*0.72);
  curveVertex( 210*0.42,  8 - 270*0.66);
  curveVertex( 210*0.55,  8 - 270*0.40);
  curveVertex( 210*0.44,  8 - 270*(0.18+0.020));
  curveVertex( 210*(0.10*0.50), 8 - 270*(0.18+0.055));
  curveVertex( 0,          8 - 270*(0.18+0.055*1.08));
  curveVertex(-210*(0.10*0.50), 8 - 270*(0.18+0.055));
  curveVertex(-210*0.44,   8 - 270*(0.18+0.020));
  curveVertex(-210*0.55,   8 - 270*0.40);
  curveVertex(-210*0.55,   8 - 270*0.40);
  endShape(CLOSE);
  pop();
}


function setMouthByMood(m) {
  if (m === 1) {
    mouthParams.upperK = 0.80;
    mouthParams.lowerK = 0.75;
  } else if (m === 2) {
    mouthParams.upperK = 0.20;
    mouthParams.lowerK = 0.20;
  } else {
    mouthParams.upperK = -0.12;
    mouthParams.lowerK = -0.06;
  }
}

function keyPressed() {
  if (key === '1') mood = 1;
  if (key === '2') mood = 2;
  if (key === '3') mood = 3;

  if (key === 'Q' || key === 'q') nodFrames = 60;
  if (key === 'W' || key === 'w') tiltWiggleFrames = 60;

  if (key === 'S' || key === 's') {
    saveGif('mySketch', 10);
  }
}

function mousePressed() {
  blinkFrames = 4;   
  browDownFrames = 6; 
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}
0
