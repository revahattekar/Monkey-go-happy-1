var PLAY = 1;
var END = 0;
var monkey, monkey_running, monkeyCollided;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, invisibleGround, ground2, ground3;
var score;
var bananaScore;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  monkeyCollided = loadImage("sprite_1.png")

}



function setup() {

  ground = createSprite(200, 345, 400, 20);
  ground.shapeColor = "green";

  ground3 = createSprite(300, 345, 200, 20);
  ground3.shapeColor = "green";

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  invisibleGround = createSprite(200, 350, 400, 8);
  invisibleGround.visible = false;

  ground2 = createSprite(200, 380, 400, 55);
  ground2.shapeColor = "brown";

  score = 0;
  bananaScore = 0;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  background("lightBlue");
  fill("yellow");
  text("SURVIVAL TIME: " + score, 250, 28);
  text("BANANAS COLLECTED: " + bananaScore, 230, 50);

  obstacles();
  bananas();

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);

    ground.velocityX = -(4 + score * 1.5 / 100);

    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (bananaGroup.isTouching(monkey)) {
      bananaScore++;
      bananaGroup.destroyEach();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }

  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.visible=false;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    fill("black");
    textSize(20);
    text("-YOU HAVE LOST-", 120, 180);
    text("PRESS ENTER TO RESTART", 70, 210);

    if (keyDown("enter")) {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.visible=true;
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY;
    }
  }




  monkey.collide(invisibleGround);

  drawSprites();
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(620, 120, 50, 50)
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4 + score * 1.5 / 100);
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
  }
}


function obstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(620, 320, 50, 50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4 + score * 1.5 / 100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}