
var ground,groundImage;
var cat,catImage;
var IVground,IVgroundImage;
var emy,emyImage;
var cloud,cloudImage;
var coin,coinImage;
var bullet,bulletImage;
var cute, cuteImage;

var bg;
var log,logImage;
var score = 5
var count = 0
var coinCount = 0
var restart, restartImage;
var gameOver, gameOverImage;


var PLAY = 1
var END = 0
var gameState = PLAY


function preload() {
bg = loadImage("bg.png")
groundImage = loadImage("ground.png")
catImage = loadAnimation("cat1.png","cat2.png","cat3.png","cat4.png","cat5.png","cat6.png")
emyImage = loadAnimation("emy1.png","emy2.png","emy3.png")
logImage = loadImage("log.png")
cloudImage = loadImage("cloud.png")
coinImage = loadImage("coin.png")
bulletImage = loadImage("bullet.png")
cuteImage = loadImage("cute.png")
gameOverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")

}


function setup() {
createCanvas(1200, 400);


ground = createSprite(600,390,1200,20)
ground.addImage("ground",groundImage)
ground.x = ground.width/2

cat = createSprite(50,330,20,20)
cat.addAnimation("cat",catImage)
cat.scale = 0.3

IVground = createSprite(600,370,1200,10)
IVground.visible = false

gameOver = createSprite(620,150)
gameOver.addImage("gameOver",gameOverImage)
gameOver.scale = 0.3
gameOver.visible = false

restart = createSprite(620,200)
restart.addImage("restart",restartImage)
restart.scale = 0.2
restart.visible = false

coin = createSprite(200,50,10,10)
coin.addImage("coin",coinImage)


logGroup = new Group()
cloudGroup = new Group()
bulletGroup = new Group()
emyGroup = new Group()
coinGroup = new Group()
cuteGroup = new Group()

}


function draw() {
  background(bg)
  
  fill("black")
  textSize(35)
  textFont("monospace")
  text("x",70,60)
  text(score,120,60)
 
  textSize(35)
  text("Score:"+Math.round(count),320,60)
  text(coinCount,250,60)
  text("x",200,60)
  

if(gameState===PLAY){
  
   ground.velocityX = -7
    count = count+0.1  
    if(ground.x<0){
    ground.x = ground.width/2
   }

   if(keyDown("space")&& cat.y>320){
    cat.velocityY = -20

   }

   if(keyWentDown("RIGHT_ARROW")){
     bullet = createSprite(cat.x, cat.y)
     bullet.addImage("bullet",bulletImage)
     bullet.velocityX = 4
     bulletGroup.add(bullet)

   }
    cat.velocityY = cat.velocityY +0.8

    spawnlog();
    spawnemy();
    spawnclouds();
    spawncoins();
    spawncute();

  if(logGroup.isTouching(cat)){
    score = score-1
    count = count -5
   
  }

  if(emyGroup.isTouching(cat)){
    score = score-1
    count = count -5
    
  }

  if(bulletGroup.isTouching(emyGroup)){
    emyGroup.destroyEach()
    bulletGroup.destroyEach()

  }

  for(var j=0;j<coinGroup.length;j++){
     if(coinGroup.isTouching(cat)){
       coinGroup.get(j).destroy()
       coinCount = coinCount+1
       }

     }

     
}
else if(gameState===END){
  ground.velocityX = 0
  cloudGroup.setVelocityXEach(0)
  emyGroup.setVelocityXEach(0)
  logGroup.setVelocityXEach(0)
  cloudGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)

  cloudGroup.setLifetimeEach(-1)
  coinGroup.setLifetimeEach(-1)
  logGroup.setLifetimeEach(-1)
  emyGroup.destroyEach();

  gameOver.visible = true
 restart.visible = true
 
  cat.velocityY = 0

}
if(gameState === END && score > 0){
   reset()
}

if(score === 0){
  gameState = END

}
 
  cat.collide(IVground)
 
  

  drawSprites();
}


function spawnlog() {
  //write code here to spawn the pipe
  if (frameCount % 200 === 0) {
    var log = createSprite(1200,310,40,10);
    log.addImage(logImage);
    log.scale = 0.3;
    log.velocityX = -6;
    logGroup.add(log)
  }
}

function spawnemy() {
  //write code here to spawn the enemy
  if (frameCount % 100 === 0) {
    var emy = createSprite(1200,340,40,10);
    emy.addAnimation("emy",emyImage);
    emy.scale = 0.5;
    emy.velocityX = -7;
    emyGroup.add(emy)
  }
}

function spawncoins() {
  //write code here to spawn the coin
  if (frameCount % 250 === 0) {
    for(var i=0;i<5;i++){
    coin = createSprite(1200+i*20,200,10,10);
   coin.addImage("coin",coinImage);
    //coin.scale = 0.9;
    coin.velocityX = -4;
    coin.lifetime = 400
    coinGroup.add(coin)
    }
  }
}

function spawnclouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 2.5;
    cloud.velocityX = -3;
    cloudGroup.add(cloud)

  }
}

function spawncute() {
  //write code here to spawn the enemy
  if (frameCount % 100 === 0) {
    var cute = createSprite(1200,random(50,150),40,10);
    cute.addAnimation("cute",cuteImage);
    cute.scale = 0.1;
    cute.velocityX = -7;
    cuteGroup.add(cute)
  }
}

function reset(){
 gameState = PLAY
 logGroup.destroyEach()
 cloudGroup.destroyEach()
 emyGroup.destroyEach()
 coinGroup.destroyEach()
 gameOver.visible = false
 restart.visible = false

}