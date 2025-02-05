let colors = ['red', 'orange', 'yellow', 'blue', 'green', 'purple', 'black', 'brown', 'cyan', 'pink'];
let selectedColor = 'white';
let canvas;
let eraseIndex = colors.length;
let boxSize = 30;

function setup() {
  createCanvas(600, 400);
  background(255);
  
}

function draw() {

  fill(200);
  noStroke();
  rect(0,0, width, 25);

  fill(255, 50, 50);
  ellipse(15, 12, 12, 12);

  fill(0);
  textSize(14);
  textAlign(CENTER,CENTER);
  text("Paint App", width/2, 12);

  for (let i = 0; i < colors.length; i++){
    stroke(0);
    strokeWeight(2);
    fill(colors[i]);
    rect(5, i * boxSize + 30, boxSize);
  }
  stroke(0);
  strokeWeight(2);
  fill(255);
  rect(5, eraseIndex * boxSize + 40, boxSize, boxSize);
  fill(0);
  textSize(12);
  textAlign(CENTER,CENTER);
  text("Erase", 5 + boxSize/2, eraseIndex * boxSize + 40 + boxSize/2);

  stroke(0);
  strokeWeight(3);
  noFill();
  rect(40, 30, width - 40, height - 30);
  
}
function mousePressed(){
  if (mouseX < 40){
    let index = floor((mouseY - 30) / boxSize);
    if(index>=0 && index < colors.length){
      selectedColor = colors[index];
    } else if (index == eraseIndex) {
        selectedColor = 'white';
    }
  }
}
function mouseDragged(){
  if(mouseX > 40){
    stroke(selectedColor);

    if(selectedColor == 'white'){
      strokeWeight(20);
    } else{
    strokeWeight(5);
    }
    line(pmouseX, pmouseY, mouseX, mouseY);

  }
}