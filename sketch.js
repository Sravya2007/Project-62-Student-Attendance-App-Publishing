const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
 
var engine, world;
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var ground;
var score = 0;
var particles = [];
var turn = 0;
var gameState = "start";
var line1;

function setup() {

    var canvas = createCanvas(480,800);
    engine = Engine.create();
    world = engine.world;
  
    ground = new Ground(240, 790, 480, 20);
    //line1 = new Ground(240, 480, width, 10);
  
    for(var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height - divisionHeight/2, 10, divisionHeight));
    }
    
    for(var j = 40; j <= width; j = j + 50){
      plinkos.push(new Plinko(j, 75));
    }
    
    for(var j = 15; j <= width - 10; j = j + 50){
      plinkos.push(new Plinko(j, 175));
    }
  
    for(var j = -10; j <= width - 20; j = j + 50){
      plinkos.push(new Plinko(j, 275));
    }
  
    for(var j = 15; j <= width - 10; j = j + 50){
      plinkos.push(new Plinko(j, 375));
    }
  }
 


function draw() {
  background("black");

  textSize(20);
  text("Score : " + score, 20, 30);
  text("100", 25, 700);
  text("50", 110, 700);
  text("25", 190, 700);
  text("20", 270, 700);
  text("25", 350, 700);
  text("80", 430, 700);

  Engine.update(engine);

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   for(var j = 0; j < plinkos.length; j ++){
    plinkos[j].display();
  }

  if(frameCount % 60 === 0) {
    particles.push(new Particle(random(width/2 - 30, width/2 + 30), 10, 10));
    score++
  }

  for(var a = 0; a < particles.length; a ++){
    particles[a].display();
  }

  ground.display();
  //line1.display();
}

function mousePressed() {
  if(gameState !== "end") {
    turn++;
  

  if(particles !== null) {
    particles.display();


  if(particles.body.position.y > 760) {
      if(particles.body.position.x < 80 && particles.body.position.x > 0){
        score = score + 100;
      }
      else if(particles.body.position.x < 160 && particles.body.position.x > 80){
        score = score + 50;
      }
      else if(particles.body.position.x < 240 && particles.body.position.x > 160){
        score = score + 25;
      }
      else if(particles.body.position.x < 320 && particles.body.position.x > 240){
        score = score + 20;
      }
      else if(particles.body.position.x < 400 && particles.body.position.x > 320){
        score = score + 80;
      } 

    }

  }

  particles = null;
    
    if(turn >= 5){
      gameState = "end";
      textSize(20);
      text("Game Over", 200, 200);
    }

  }
  
}