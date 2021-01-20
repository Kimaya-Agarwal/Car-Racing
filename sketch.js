var car1,carImage;
var road,roadImage;
var coin,coinImage;
var gold,goldImage;
var rock,rockImage;
var over,overImage;

var score = 0;
var gameState = 1;
var PLAY = 1;
var END  = 0;

function preload()
{
  carImage = loadImage("car1.png");
  roadImage = loadImage("background.jpg");
  coinImage = loadImage("coin.png");
  goldImage = loadImage("gold_bar.png");
  rockImage = loadImage("rock.png");
  overImage = loadImage("game_over.png")

}

function setup() 
{
  createCanvas(600,500);
  
  road = createSprite(300,210,20,0);
  road.addImage(roadImage)
  road.scale = 1.1;
  road.velocityY = 2;
  road.y = road.height/2;
  
  car1 = createSprite(170,450,20,20);
  car1.addImage(carImage);
  car1.scale = 0.3;
  
  over = createSprite(300,200);
  over.addImage(overImage);
  
  
  coinGroup = createGroup();
  goldGroup = createGroup();
  rockGroup = createGroup();
}

function draw()
{
  background(180);
if(gameState === PLAY)
{
  over.visible = false;
  
  //create infinite background
  if (road.y > 250)
    {
    road.y = road.height/2;
    }
  //movement of car
  if(keyDown("left_arrow") && (car1.x = 450))
    {
      car1.x = 170;
    }
  if(keyDown("right_arrow") && (car1.x = 170))
    {
      car1.x = 450;
    }
  if(keyDown("space"))
    {
      car1.x = 300;
    }
  coinGroup.setVelocityYEach(3);
  coinGroup.setLifetimeEach(100);
  
  goldGroup.setVelocityYEach(3);
  goldGroup.setLifetimeEach(100);
  
  rockGroup.setVelocityYEach(3);
  rockGroup.setLifetimeEach(100);
  
  spawnCoins();
  spawnGold();
  spawnRock();
  //manage score
 if(coinGroup.isTouching(car1))
   {
     coinGroup.destroyEach();
     score = score+2;
   }
  if(goldGroup.isTouching(car1))
   {
     goldGroup.destroyEach();
     score = score+5;
   }
  if(rockGroup.isTouching(car1))
    {
      rockGroup.destroyEach();
      gameState = END;
    }
}
else if(gameState === END)
  {
   
    over.visible = true;
    road.velocityY = 0;
    car1.visible = false
    
    rockGroup.destroyEach();
    goldGroup.destroyEach();
    coinGroup.destroyEach();
    
    rockGroup.setVelocityYEach(0);
    rockGroup.setLifetimeEach(-1);
    coinGroup.setVelocityYEach(0);
    coinGroup.setLifetimeEach(-1);
    goldGroup.setVelocityYEach(0);
    goldGroup.setLifetimeEach(-1);
    

  }
  
  drawSprites();
  //display text
  stroke("black");
  fill("black");
  textSize(25)
  text("Score: "+ score , 200,50);
  
}
  function spawnCoins()
 {
  if(frameCount % 60 === 0)
   {
    coin = createSprite(170,100,20,20) 
    coin.x = Math.round(random(100,470));
    coin.addImage(coinImage);
    coinGroup.add(coin);
   }
 }
  function spawnGold()
 {
  if(frameCount % 60 === 0)
   {
    gold = createSprite(170,100,20,20) 
    gold.x = Math.round(random(100,470));
    gold.addImage(goldImage);
    gold.scale = 0.3;
    goldGroup.add(gold);
   }
 }
  function spawnRock()
{
  if(frameCount % 60 === 0)
   {
    rock = createSprite(170,100,20,20) 
    rock.x = Math.round(random(100,470));
    rock.addImage(rockImage)
    rockGroup.add(rock);
   }
}
