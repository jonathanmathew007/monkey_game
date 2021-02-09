
var monkey , monkey_running
var banana ;
var bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0;
var bg;
var PLAY=1;
var END=0;
var gameState=1;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_1 = 
    loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(500,200);
monkey=createSprite(90,150,20,20);
monkey.addAnimation("monkey1",monkey_running);
  
monkey.scale=0.11

bg=createSprite(200,180,950,5)
  bg.x = bg.width /2;
   
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  
  monkey.setCollider("rectangle",0,0,400,600)
  //monkey.debug=true;
}


function draw() {
  background("white")
  
  if (gameState===PLAY){
 if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
 if(monkey.isTouching(obstacleGroup)){
 gameState=END;
 } 
 
if(monkey.isTouching(foodGroup)){
  
 score=score+5
  foodGroup[0].destroy();
 } 
 
monkey.velocityY = monkey.velocityY + 0.8
  
    score = score + Math.round(getFrameRate()/60);
    
  if (bg.x < 0){
      bg.x = bg.width/2;
    }
  bg.velocityX=-2
  
    
    
 monkey.collide(bg);
  
  spawnObstacles()
  spawnFruits()
  }
  
  if (gameState===END){
     bg.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.addAnimation("monkey2",monkey_1);
    
    monkey.changeAnimation("monkey2",monkey_1)
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    foodGroup.destroyEach();
    if(keyDown("r")){
     gameState = PLAY;
      score=0;
      monkey.changeAnimation("monkey1",monkey_running)
      obstacleGroup.destroyEach();
    }
    
  }

  
  drawSprites(); 
  text("score:"+score,430,40);
  if (gameState===END){
    textSize(15)
    text("Game Over",250,100)
    text("Press 'r' to restart",230,130)
  }
  
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
 obstacle=createSprite(500,165,10,10);
  obstacle.addImage("obstacle",  obstaceImage);
  obstacle.scale=0.1
   obstacle.velocityX = -6 
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
   
 }
   
   
   
 
 }

function spawnFruits(){
 if (frameCount % 80 === 0){
 banana=createSprite(500,100,10,10);
  banana.addImage("banana",  bananaImage);
  banana.scale=0.1
  banana.velocityX = -6 
  banana.lifetime = 300;
 foodGroup.add(banana);
 }
 
}
   

