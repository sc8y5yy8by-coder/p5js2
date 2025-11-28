function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(255); // 흰색 배경

  // 색상
  const skin  = color('#F2D3B1');
  const lineC = color(0, 0, 0, 40);
  const hairC = color('#161616');

  // 기준 좌표/크기
  const cx = width * 0.5;
  const cy = height * 0.55;
  const faceW = 210;
  const faceH = 270;

  // 머리 파라미터
  const hairParams = {
    templeX: 0.55,
    crownH : 0.69,
    fringeY: 0.18,
    splitW : 0.10,
    splitD : 0.055,
    scalpGap: 0.020,
    hairYOffset: 8
  };

  // 얼굴 윤곽 (턱 살짝 벌림)
  const P = [
    [ 0.00, -0.50], [-0.22, -0.48], [-0.40, -0.39], [-0.48, -0.06],
    [-0.36,  0.22], [ 0.00,  0.42], [ 0.36,  0.22], [ 0.48, -0.06],
    [ 0.40, -0.39], [ 0.00, -0.50]
  ];

  // 귀 (얼굴 뒤로 먼저)
  fill(skin);
  const earW = 30, earH = 50, earOverlap = 1;
  const earCX = faceW * hairParams.templeX - (earW/2 - earOverlap);
  const earY  = cy - faceH * 0.08;
  ellipse(cx - earCX, earY, earW, earH);
  ellipse(cx + earCX, earY, earW, earH);

  // 얼굴
  fill(skin);
  beginShape();
  curveVertex(cx + faceW * P[0][0], cy + faceH * P[0][1]);
  for (let i = 0; i < P.length; i++) curveVertex(cx + faceW * P[i][0], cy + faceH * P[i][1]);
  curveVertex(cx + faceW * P[P.length-1][0], cy + faceH * P[P.length-1][1]);
  endShape();

  noFill(); stroke(lineC); strokeWeight(2);
  beginShape();
  curveVertex(cx + faceW * P[0][0], cy + faceH * P[0][1]);
  for (let i = 0; i < P.length; i++) curveVertex(cx + faceW * P[i][0], cy + faceH * P[i][1]);
  curveVertex(cx + faceW * P[P.length-1][0], cy + faceH * P[P.length-1][1]);
  endShape();

  // 눈, 눈썹, 코, 입
  drawEyes(cx, cy, faceW, faceH);
  drawBrows(cx, cy, faceW, faceH);
  drawNose(cx, cy, faceW, faceH);
  drawMouthClosed(cx, cy, faceW, faceH, 0.12); // ← 곡선형 닫힌 입술

  // 머리
  drawHairTrimFit(cx, cy + hairParams.hairYOffset, faceW, faceH, hairC, hairParams);
}

/* 머리 — 좌우 대칭 */
function drawHairTrimFit(cx, cy, faceW, faceH, hairFill, p) {
  noStroke(); fill(hairFill);
  const { templeX, crownH, fringeY, splitW, splitD, scalpGap } = p;

  const foreheadL = { x: cx - faceW * 0.44, y: cy - faceH * (fringeY + scalpGap) };
  const foreheadR = { x: cx + faceW * 0.44, y: cy - faceH * (fringeY + scalpGap) };

  beginShape();
  // 좌측 관자
  curveVertex(cx - faceW * templeX, cy - faceH * 0.40);
  curveVertex(cx - faceW * templeX, cy - faceH * 0.40);

  // 좌측 상단 곡선
  curveVertex(cx - faceW * 0.42,    cy - faceH * 0.66);
  curveVertex(cx - faceW * 0.22,    cy - faceH * 0.72);

  // 정수리
  curveVertex(cx,                   cy - faceH * crownH);

  // 우측 상단 곡선 (좌측과 대칭)
  curveVertex(cx + faceW * 0.22,    cy - faceH * 0.72);
  curveVertex(cx + faceW * 0.42,    cy - faceH * 0.66);

  // 우측 관자
  curveVertex(cx + faceW * templeX, cy - faceH * 0.40);

  // 이마 + 가르마 (V자)
  curveVertex(foreheadR.x, foreheadR.y);
  curveVertex(cx + faceW * (splitW * 0.50), cy - faceH * (fringeY + splitD));
  curveVertex(cx,                           cy - faceH * (fringeY + splitD * 1.08));
  curveVertex(cx - faceW * (splitW * 0.50), cy - faceH * (fringeY + splitD));
  curveVertex(foreheadL.x, foreheadL.y);

  // 닫기
  curveVertex(cx - faceW * templeX, cy - faceH * 0.40);
  curveVertex(cx - faceW * templeX, cy - faceH * 0.40);
  endShape(CLOSE);
}

/* 눈 */
function drawEyes(cx, cy, faceW, faceH) {
  const eyeY   = cy - faceH * 0.105;
  const eyeDX  = faceW * 0.230;
  const eyeW   = faceW * 0.20;
  const eyeH   = faceH * 0.066;

  noStroke(); fill(255);
  ellipse(cx - eyeDX, eyeY, eyeW, eyeH);
  ellipse(cx + eyeDX, eyeY, eyeW, eyeH);

  const irisR  = min(eyeW, eyeH) * 0.42;
  const pupilR = irisR * 0.48;
  fill(95, 110, 120);
  ellipse(cx - eyeDX, eyeY, irisR*2, irisR*2);
  ellipse(cx + eyeDX, eyeY, irisR*2, irisR*2);

  fill(20);
  ellipse(cx - eyeDX, eyeY, pupilR*2, pupilR*2);
  ellipse(cx + eyeDX, eyeY, pupilR*2, pupilR*2);

  fill(255, 230);
  ellipse(cx - eyeDX - irisR*0.25, eyeY - irisR*0.25, irisR*0.30, irisR*0.30);
  ellipse(cx + eyeDX - irisR*0.25, eyeY - irisR*0.25, irisR*0.30, irisR*0.30);

  stroke(0, 65); strokeWeight(1.8); noFill();
  arc(cx - eyeDX, eyeY, eyeW, eyeH, PI*0.92, PI*0.08);
  arc(cx + eyeDX, eyeY, eyeW, eyeH, PI*0.92, PI*0.08);
  stroke(0, 30); strokeWeight(1.5);
  arc(cx - eyeDX, eyeY+1, eyeW*0.98, eyeH*0.88, PI*0.08, PI*0.92);
  arc(cx + eyeDX, eyeY+1, eyeW*0.98, eyeH*0.88, PI*0.08, PI*0.92);
}

/* 눈썹 */
function drawBrows(cx, cy, faceW, faceH) {
  const browY  = cy - faceH * 0.17;
  const browDX = faceW * 0.240;
  const bw     = faceW * 0.22;
  const bh     = faceH * 0.026;

  fill('#222'); noStroke();
  push(); translate(cx - browDX, browY); rotate(radians(-3));
  rectMode(CENTER); rect(0, 0, bw, bh, bh*0.9); pop();

  push(); translate(cx + browDX, browY); rotate(radians(3));
  rectMode(CENTER); rect(0, 0, bw, bh, bh*0.9); pop();
}

/* 코 */
function drawNose(cx, cy, faceW, faceH) {
  const topY   = cy - faceH * 0.02;
  const tipY   = cy + faceH * 0.095;
  const width  = faceW * 0.08;

  stroke(0, 26); strokeWeight(2); noFill();
  beginShape();
  curveVertex(cx, topY - 8);
  curveVertex(cx, topY);
  curveVertex(cx - width*0.05, (topY + tipY)*0.56);
  curveVertex(cx, tipY);
  curveVertex(cx, tipY + 6);
  endShape();

  const nostrilY = tipY + faceH * 0.012;
  noStroke(); fill(0, 20);
  ellipse(cx - width*0.42, nostrilY, width*0.30, width*0.20);
  ellipse(cx + width*0.42, nostrilY, width*0.30, width*0.20);
  fill(0, 100);
  ellipse(cx - width*0.28, nostrilY, width*0.16, width*0.09);
  ellipse(cx + width*0.28, nostrilY, width*0.16, width*0.09);

  stroke(0, 18); strokeWeight(1.4);
  line(cx, tipY + faceH*0.02, cx, tipY + faceH*0.05);
}

/* 입 — 부드러운 곡선으로 다문 입술 */
function drawMouthClosed(cx, cy, faceW, faceH, smile=0.12) {
  const y   = cy + faceH * 0.200;   // 입 중심 높이
  const mw  = faceW * 0.28;         // 입 폭
  const thU = faceH * 0.020;        // 윗입술 두께(얇고 매끈)
  const thL = faceH * 0.030;        // 아랫입술 두께(둥글게)

  const colUpper = color(190, 100, 100, 230);
  const colLower = color(205, 130, 125, 230);
  const colLine  = color(80, 40, 40, 90); // 경계선

  noStroke();

  // 윗입술 — 중앙이 뾰족하지 않도록 완만한 곡선
  fill(colUpper);
  beginShape();
  vertex(cx - mw*0.50, y);
  bezierVertex(cx - mw*0.30, y - thU*0.2, cx - mw*0.10, y - thU*0.5, cx, y - thU*0.45);
  bezierVertex(cx + mw*0.10, y - thU*0.5, cx + mw*0.30, y - thU*0.2, cx + mw*0.50, y);
  bezierVertex(cx + mw*0.25, y - thU*0.05, cx - mw*0.25, y - thU*0.05, cx - mw*0.50, y);
  endShape(CLOSE);

  // 아랫입술 — 중앙을 둥글고 도톰하게
  fill(colLower);
  beginShape();
  vertex(cx - mw*0.50, y);
  bezierVertex(cx - mw*0.25, y + thL*0.2, cx - mw*0.10, y + thL*0.6, cx, y + thL*0.55);
  bezierVertex(cx + mw*0.10, y + thL*0.6, cx + mw*0.25, y + thL*0.2, cx + mw*0.50, y);
  bezierVertex(cx + mw*0.25, y + thL*0.05, cx - mw*0.25, y + thL*0.05, cx - mw*0.50, y);
  endShape(CLOSE);

  // 중앙 경계선 — 직선 대신 부드러운 곡선
  stroke(colLine); strokeWeight(1.2); noFill();
  bezier(cx - mw*0.48, y,
         cx - mw*0.15, y + thL*0.05,
         cx + mw*0.15, y + thL*0.05,
         cx + mw*0.48, y);
}

