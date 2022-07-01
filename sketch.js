var raccoon, raccoon_running, raccoon_collide;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImg1, cloudImg2;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var gameOver, gameOverImg;
var goldBar, goldBarImg;

var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    raccoon_running = loadAnimation("imagens/raccoon.png", "imagens/raccoon2.png", "imagens/raccoon3.png");
    raccoon_collide = loadAnimation("imagens/raccoonx.png");
    groundImage = loadImage("imagens/ground.png");
    cloudImg1 = loadImage("imagens/cloud1.png");
    cloudImg2 = loadImage("imagens/cloud2.png");
    obstacle1 = loadImage("imagens/obstacle1.png");
    obstacle2 = loadImage("imagens/obstacle2.png");
    obstacle3 = loadImage("imagens/obstacle3.png");
    goldBarImg = loadImage("imagens/goldbar.png");
    gameOverImg = loadImage("imagens/gameover.png");
}

function setup(){
    createCanvas(600, 300);

    ground = createSprite(300, 278, 600, 20);
    ground.addImage(groundImage);

    raccoon = createSprite(50, 260, 50, 50);
    raccoon.addAnimation("running", raccoon_running);
    raccoon.addAnimation("collided", raccoon_collide);

    gameOver = createSprite(300, 150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5; 

    invisibleGround = createSprite(200,310,400,10);
    invisibleGround.visible = false;
  
    obstaclesGroup = createGroup();
    cloudsGroup = createGroup();
}

function draw(){
    background("#ADD8E6");
    text("Score:" + score, 520, 40);

    if(gameState === PLAY){
        ground.velocityX = -4;
        score = score + Math.round(frameCount/60);
        
        if (ground.x < 280){
          ground.x = ground.width/2;
        }
        
        if(keyDown("space") && raccoon.y >= 250){
            raccoon.velocityY = -15;
        }
        
        raccoon.velocityY = raccoon.velocityY + 0.8;
        
        gameOver.visible = false;
            
        criarNuvens();
        criarObstaculos();
        
        if(obstaclesGroup.isTouching(raccoon)){
          gameState = END;

        }
    }

    if(gameState === END){
        ground.velocityX = 0;
        ground.x = 300
        
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);

        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);

        raccoon.changeAnimation("collided", raccoon_collide);
   
        gameOver.visible = true;

    }

    raccoon.collide(invisibleGround);
    drawSprites();
}

function criarObstaculos(){
    if (frameCount % 60 === 0){
        var obstacle = createSprite(600, 275, 10, 40);
        obstacle.velocityX = -6; 
      
        var number = Math.round(random(1,3));
        switch(number){
            case 1: obstacle.addImage(obstacle1);
                    break;
            case 2: obstacle.addImage(obstacle2);
                    break;
            case 3: obstacle.addImage(obstacle3);
                    break;
            default: break;
        }
      
        obstacle.scale = 0.1;
        obstacle.lifetime = 300;
      
        obstaclesGroup.add(obstacle);
    }
}

function criarNuvens(){
    if (frameCount % 60 === 0) {
        var cloud = createSprite(600, 100, 40, 10);
        cloud.y = Math.round(random(10,60));
        cloud.velocityX = -3;

        var number = Math.round(random(1,2));
        switch(number){
            case 1: cloud.addImage(cloudImg1);
                    break;
            case 2: cloud.addImage(cloudImg2);
                    break;
            default: break;
        }

        cloud.lifetime = 300;
        cloud.scale = 1.5;
        
        //  cloud.depth = trex.depth;
        //  trex.depth = trex.depth + 1;
        
        cloudsGroup.add(cloud);
    }
}

