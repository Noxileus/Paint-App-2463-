let colors = ['red', 'orange', 'yellow', 'blue', 'green', 'purple', 'black', 'brown', 'cyan', 'pink'];
let selectedColor = 'white';
let canvas;
let eraseIndex = colors.length;
let boxSize = 30;
let hasStartedPainting = false;
let isMuted = false;
let muteButton;
let clearButton;

const piano = new Tone.Synth({
  oscillator: {
    type: 'sine'},
  envelope:{
    attack: 0.5, 
    decay: 0.5, 
    sustain: 0.8,
    release: 2
  }
}).toDestination();

const guitar = new Tone.Synth({
  oscillator: {
    type: 'triangle'},
  envelope: {
    attack: 0.2, 
    decay: 0.3, 
    sustain: 0.6, 
    release: 1.5
  }
}).toDestination();

piano.volume.value = -15;
guitar.volume.value = -18;

const melody = new Tone.Sequence((time, note) => {
  piano.triggerAttackRelease(note, "4n", time);
  guitar.triggerAttackRelease(note, "8n", time + 0.25);
}, ["C5", "E5", "G5", "B4", "A4", "G4", "E4", "D4"]).start(0);

Tone.Transport.start();

const splatSound = new Tone.MembraneSynth({
  pitchDelay: 0.01, 
  octaves: 6, 
  envelope: {
    attack: 0.005,
    decay: 0.1, 
    sustain: 0, 
    release: 0.05, 
  }
}).toDestination();

const clearSound = new Tone.NoiseSynth({
  volume: -10, 
  envelope: {
    attack: 0.01, 
    decay: 0.2, 
    sustain: 0, 
    release: 0.1
  }
}).toDestination();

const changeColorSound = new Tone.Synth({
  oscillator: {
    type: 'square'},
  envelope: {
    attack: 0.01, 
    decay: 0.1, 
    sustain: 0, 
    release: 0.05
  }
}).toDestination();

function playSplat(){
  const randomPitch = Math.random() * 200 + 200;
  splatSound.triggerAttackRelease(randomPitch, "16n");
}

const pianoLoop = new Tone.Loop((time) => {
  piano.triggerAttackRelease("C4", "2n", time);
  piano.triggerAttackRelease("E4", "2n", time + 0.5);
  piano.triggerAttackRelease("G4", "2n", time + 1);
}, "2m").start(0);

Tone.Transport.start();

function setup() {
  createCanvas(600, 400);
  background(255);
  
  muteButton = createButton("Mute");
  muteButton.position(5, colors.length * boxSize + 70);
  muteButton.style('background-color', 'white');
  muteButton.style('border', '2px solid black');
  muteButton.style('padding', '5px');
  muteButton.style('font-weight', 'bold');
  muteButton.style('width', boxSize + 'px');
  muteButton.style('height', boxSize + 'px');
  muteButton.style('font-size', '10px');
  muteButton.mousePressed(toggleMusic);

  clearButton = createButton("Clear");
  clearButton.position(5, colors.length * boxSize + 110);
  clearButton.style('background-color', 'white');
  clearButton.style('border', '2px solid black');
  clearButton.style('padding', '5px');
  clearButton.style('font-weight', 'bold');
  clearButton.style('width', boxSize + 'px');
  clearButton.style('height', boxSize + 'px');
  clearButton.style('font-size', '10px');
  clearButton.mousePressed(clearCanvas);
}

function toggleMusic(){
  isMuted = !isMuted;

  if(isMuted){
    Tone.Transport.pause();
    this.html("Unmute");
  } else { 
    Tone.Transport.start();
    this.html("Mute");
  }
}

function clearCanvas(){
  background(255);
  hasStartedPainting = false; 
  clearSound.triggerAttackRelease("8n");
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
      changeColorSound.triggerAttackRelease("C6", "16n");
    } else if (index == eraseIndex) {
        selectedColor = 'white';
    } else if(mouseX > 40 && mouseY > 30){
      splatSound.triggerAttackRelease("C2", "16n");
    }
  }
}
function mouseDragged(){
  if(mouseX > 40 && mouseY > 30){
    stroke(selectedColor);

    if(selectedColor == 'white'){
      strokeWeight(20);
    } else{
    strokeWeight(5);
    }
    line(pmouseX, pmouseY, mouseX, mouseY);

  }
}
function keyPressed(){
  if(key === 'c' || key === 'C'){
    background(255);
    hasStartedPainting = false;
    clearSound.triggerAttackRelease("8n");
  }
}