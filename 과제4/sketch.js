function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
}

function draw() {
  background('#111425');
  noStroke();

  // 시간 변수
  let t = frameCount * 0.005;   
  let t2 = frameCount * 0.01;   
  let orbit = frameCount * 0.007;  
  let rot = frameCount * 0.015;   
  let s = 1 + 0.02 * sin(frameCount * 0.03); 


  // 색상 변화

  colorMode(RGB);

  let cA = color(255, 100, 80, 120);
  let cB = color(100, 150, 255, 120);

  let mix = (sin(millis() * 0.0006) + 1) / 2;
  let dynamicColor = lerpColor(cA, cB, mix);

  
  fill(dynamicColor);
  ellipse(300, 200, 900, 650);

  
 

  fill(70, 60, 160, 70);   ellipse(180, 90, 420, 260);
  fill(40, 120, 220, 60);  ellipse(430, 70, 360, 200);
  fill(160, 60, 160, 55);  ellipse(360, 260, 500, 220);
  fill(30, 60, 140, 60);   rect(300, 140, 620, 60);
  fill(200, 120, 255, 40); rect(300, 200, 620, 70);

  // 해·달
  let cx = 300, cy = 200;
  let r1 = 75;
  let r2 = 115;

  let sunX  = cx + r2 * cos(orbit);
  let sunY  = cy + r2 * sin(orbit);
  let moonX = cx + r1 * cos(orbit + PI);
  let moonY = cy + r1 * sin(orbit + PI);

  // 달
  fill(90, 130, 255, 80);   ellipse(moonX + 65, moonY - 10, 260, 260);
  fill(150, 190, 255, 110); ellipse(moonX + 65, moonY - 10, 200, 200);
  fill(230, 240, 255, 200); ellipse(moonX + 65, moonY - 10, 140, 140);
  fill(200, 220, 255, 120);
  ellipse(moonX + 35, moonY - 25, 30, 22);
  ellipse(moonX + 90, moonY + 10, 24, 18);
  ellipse(moonX + 55, moonY + 15, 18, 14);

  // 해
  fill(255, 130, 40, 90);   ellipse(sunX - 45, sunY, 300, 300);
  fill(255, 170, 60, 130);  ellipse(sunX - 45, sunY, 220, 220);
  fill(255, 200, 100, 200); ellipse(sunX - 45, sunY, 150, 150);

  fill(200, 120, 255, 60);
  ellipse(310, 195, 170, 170);

  //앙중앙
  push();
  translate(cx, cy);
  rotate(rot);

  noFill();
  stroke(255, 210, 120, 120); ellipse(0, 0, 270, 270);
  stroke(255, 160, 80, 90);   ellipse(0, 0, 330, 330);
  stroke(140, 180, 255, 110); ellipse(0, 0, 300, 300);

  pop();
  noStroke();

  // 바닥
  fill(70, 60, 160, 50);   ellipse(300, 420, 700, 200);
  fill(160, 60, 160, 40);  ellipse(300, 440, 650, 180);
  fill(30, 60, 140, 50);   rect(300, 360, 620, 60);
  fill(200, 120, 255, 35); rect(300, 400, 620, 70);
  fill(255, 170, 70, 30);  quad(0, 350, 180, 330, 220, 370, 0, 390);
  fill(90, 170, 255, 30);  quad(600, 340, 420, 310, 380, 360, 600, 380);

  // 반사
  fill(255, 195, 110, 140); rect(300, 300 + sin(t)*2, 150, 6);
  fill(255, 175, 95, 120);  rect(300, 314 + cos(t)*2, 120, 5);
  fill(140, 190, 255, 110); rect(300, 328 + sin(t2)*2, 100, 4);
  fill(255, 165, 85, 100);  rect(300, 342 + cos(t2)*2, 80, 4);

  // 빛 파편
  push();
  translate(cx, cy);
  rotate(-rot * 0.8);

  fill(255, 210, 140, 110);
  triangle(0, 0, -60, -130, -40, -90);
  triangle(0, 0, -120, -40, -100, 0);
  triangle(0, 0, -80, 50, -50, 90);

  fill(255, 170, 90, 100);
  triangle(0, 0, -150, -80, -110, -60);
  triangle(0, 0, -110, 100, -80, 140);

  fill(140, 200, 255, 110);
  triangle(0, 0, 60, -130, 40, -90);
  triangle(0, 0, 120, -40, 100, 0);
  triangle(0, 0, 80, 50, 50, 90);

  fill(120, 170, 255, 100);
  triangle(0, 0, 150, -80, 110, -60);
  triangle(0, 0, 110, 100, 80, 140);

  pop();

  // 별 깜빡임
  let blink = 180 + 40 * sin(frameCount * 0.4);

  fill(255, 255, 255, blink);
  ellipse(120, 80, 3, 3);
  rect(180, 60, 2, 2);
  ellipse(480, 90, 2, 2);
  rect(520, 140, 2, 2);
  ellipse(400, 40, 3, 3);
  ellipse(90, 160, 2, 2);

  
  fill(255, 255, 255, 100);
  triangle(300, 200, 270, 120, 290, 130);
  triangle(300, 200, 330, 120, 310, 130);
  triangle(300, 200, 260, 240, 280, 250);
  triangle(300, 200, 340, 240, 320, 250);
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch',10);
  }
}
