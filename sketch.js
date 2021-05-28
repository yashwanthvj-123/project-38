
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground,groundimage;
var survival_time;
var gameover,gameoverImage,replay,replayImage;
var PLAY=0;
var END=1;
var gameState=0;
var bg,bgImage;
var sound,sound3;
var sound2;
var wood,woodImage,woodGroup;
var edges;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundimage=loadImage("wood.jpg");
  
  bgImage=loadImage("Forest.jpg");
  
  gameoverImage=loadImage("Game Over image.jpg");
  
  replayImage=loadImage("Replay button.jpg");
 
  sound=loadSound("Game over 2.m4a");
  
  sound2=loadSound("Up sound.m4a");
  
  woodImage=loadImage("wood.jpg");
  
}

function setup() {
  
createCanvas(600,400);

edges=createEdgeSprites ();
  
bg=createSprite(500,230,600,100);
bg.addImage(bgImage);
bg.scale=1.9;
  
foodGroup = createGroup ();
obstacleGroup=createGroup ();
woodGroup=createGroup ();
  
gameover=createSprite(280,100,10,10);
gameover.addImage(gameoverImage); 
gameover.scale=0.75;
  
replay=createSprite(300,200,10,10);
replay.addImage(replayImage);
replay.scale=0.5;
  
ground=createSprite(100,410,600,25);
  
monkey=createSprite(85,230,10,10);
monkey.addAnimation("monkeyrunning",monkey_running);
monkey.scale=0.1;

//monkey.debug=true;  
  
score = 0;
  
survival_time=0;
  
}

function draw() {

background("lightgreen");

monkey.x=camera.position.x-250;
  
if(gameState===PLAY){

monkey.collide(edges[2]);

if(camera.position.x>ground.width/2+300) {
  camera.position.x=300;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  woodGroup.destroyEach();
}
  
gameover.visible=false;
replay.visible=false;

camera.position.x+=6;
  
survival_time = survival_time + Math.round(getFrameRate()/61);
  
switch (score){
    
  case 6: monkey.scale=0.12;
    
    break;
    
  case 12:monkey.scale=0.16
    
   break;  
   
   case 18: monkey.scale=0.19
    
    break;
    
    case 20 : monkey.scale=0.200
    
    break;
    
}
  
fruits () ;
  
rocks ();
  
platform ();
    
if (monkey.isTouching(woodGroup)) {
  monkey.collide(wood);
}
  
if (monkey.isTouching(foodGroup)){
  foodGroup.destroyEach();
  sound2.play();
  score=score + 2;}
  
if (monkey.isTouching(ground)){
  monkey.collide(ground);
}
  
if (keyDown("space") ){
  monkey.velocityY=-15;
}

if (keyCode===39) {
  monkey.velocityX=5;
}



monkey.velocityY=monkey.velocityY+0.8;
monkey.collide(ground);



if (monkey.isTouching(obstacleGroup)){
  sound.play();
  gameState=END; } 
  
}
  
if (gameState===END){
    
foodGroup.destroyEach ();
obstacleGroup.destroyEach ();
woodGroup.destroyEach ();

gameover.visible=true;
replay.visible=true;

gameover.x=camera.position.x;
replay.x=camera.position.x;
  
monkey.collide(ground);
monkey.visible=false;
  
bg.velocityX=0;
  
if (mousePressedOver(replay)){
  reset ();}
  
}
  
drawSprites();
  
fill("black");
textSize (17) ;
text(" Score : "+score, camera.position.x+200,20);
  
text(" Survival Time : "+survival_time,camera.position.x-300,20);

if (gameState===PLAY)
text ("Help the monkey to go happy! Press space to jump and collect bananas.",camera.position.x-280,40);
  
}

function fruits (){
  
if (frameCount % 80 === 0){
  
banana=createSprite(camera.position.x+300,100,10,10);
banana.addImage(bananaImage);
banana.scale=0.1;
banana.velocityX=-(10+3*score/4);
foodGroup.add(banana);
banana.lifetime=-1;
banana.y=Math.round(random(50,300));
  
}  
  
}

function rocks () {
  
if(frameCount % 300 === 0){
  
obstacle=createSprite(camera.position.x+300,360,10,10);
obstacle.addImage(obstacleImage);
obstacle.velocityX=-(10+3*survival_time/10);
obstacleGroup.add(obstacle);
obstacle.lifetime=-1;
obstacle.scale=0.15;
obstacle.debug=false;

}  
  
}

function platform () {
  
if(frameCount % 150 ===0){
    
wood=createSprite(camera.position.x+300,360,10,10);
wood.addImage(woodImage);
wood.scale=0.15;
wood.velocityX=-6;
wood.lifetime=-75;
wood.y=Math.round(random(50,300));
woodGroup.add(wood);
    
}
  
}

function reset () {
 
score=0;
survival_time=0;

monkey.x=85;

monkey.scale=0.1;
  
monkey.visible=true;
  
obstacleGroup.destroyEach();
foodGroup.destroyEach();
woodGroup.destroyEach ();

camera.position.x=300
  
gameState=PLAY;
  
}
