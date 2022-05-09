var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var path2;

var parede;
var parede2;

var buraco;
var barreira;
var poça;
var moeda;
var bolsa;

var buracoImg;
var barreiraImg;
var poçaImg;
var moedaImg;
var bolsaImg;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var Porrada;
var musica;

var moedaSom1;
var moedaSom2;
var moedaSom3;

var pinkCG, yellowCG,redCG; 

var barreiraGrupo;
var buracoGrupo;
var poçaGrupo;
var moedaGrupo;
var bolsaGrupo;

var END =0;
var PLAY =1;
var gameState = PLAY;

var Pontos=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("CENÁRIO.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");

  buracoImg=loadImage("BURACO.png");
  barreiraImg=loadImage("OBSTACULO.png");
  poçaImg=loadImage("POÇA.png");
  moedaImg=loadImage("MOEDA.png")
  bolsaImg=loadAnimation("Bolsa.png","Bolsa2.png","Bolsa3.png")

  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  Porrada=loadSound("Porrada.mp3");

  moedaSom1=loadSound("moeda.mp3");
  moedaSom2=loadSound("moeda2.mp3");
  moedaSom3=loadSound("moeda3.mp3");
  musica=loadSound("VirtualTrip.mp3");

  gameOverImg = loadImage("gameOver.png");
}
 
 
function setup(){
  
createCanvas(1200,300);
path=createSprite(490,150);
path.addImage(pathImg);
path.velocityX=-6;
path.scale=0.25

path2=createSprite(1690,150);
path2.addImage(pathImg);
path2.velocityX=-6;
path2.scale=0.25

parede=createSprite(100,265,500,10);
parede.visible=false;
parede2=createSprite(100,130,500,10);
parede2.visible=false;

mainCyclist  = createSprite(100,200);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.04;

mainCyclist.setCollider("rectangle",0,0,60,60);

gameOver = createSprite(650,140);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
gameOver.depth=mainCyclist.depth;
gameOver.depth=gameOver.depth-1;
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
barreiraGrupo= new Group();
poçaGrupo= new Group();
buracoGrupo= new Group();
moedaGrupo= new Group();
bolsaGrupo= new Group();

path.depth=mainCyclist.depth;
path.depth=path.depth-3;
path2.depth=mainCyclist.depth;
path2.depth=path2.depth-3;

musica.loop();
}

function draw() {
  background(0);
  
  drawSprites(0);
  textSize(20);
  fill(255);
  text("Pontos: "+ Pontos,1000,30);
  
  if(gameState===PLAY){

   edges= createEdgeSprites();
   mainCyclist.collide(edges);
   mainCyclist.collide(parede);
   mainCyclist.collide(parede2);

  if(keyDown("RIGHT_ARROW")) {
    cycleBell.play();
  }
  
if (keyDown("UP_ARROW")){
  mainCyclist.velocityY=-4;
} else if (keyDown("DOWN_ARROW")){
  mainCyclist.velocityY=4;
} else {
  mainCyclist.velocityY=0;
}

  var select_oppPlayer = Math.round(random(1,3));
  var obstaculos = Math.round(random(1,3));
  var dinheiro = Math.round(random(1,4));
  var MS = Math.round(random(1,3));
  
if (path.x < -690){
  path.x=1920;
}

if (path2.x < -690){
  path2.x=1920;
}

  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }

  if (World.frameCount % 75 == 0) {
    if (obstaculos == 1){
      barreiras();
    } else if (obstaculos == 2){
      poças();
    } else {
      buracos();
    }
  }

  if (World.frameCount % 200 ==0){
    if (dinheiro == 1){
      moedas();
    } else if (dinheiro==2){
      moedas();
    } else if (dinheiro==3){
      moedas();
    } else {
      bolsas();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
     Porrada.play();
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
      Porrada.play();
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
      Porrada.play();
    }

     if(barreiraGrupo.isTouching(mainCyclist)){
      gameState = END;
      barreiraGrupo.velocityY = 0;
      Porrada.play();
    }

    if(buracoGrupo.isTouching(mainCyclist)){
      gameState = END;
      buracoGrupo.velocityY = 0;
      Porrada.play();
    }

    if(poçaGrupo.isTouching(mainCyclist)){
      gameState = END;
      poçaGrupo.velocityY = 0;
      Porrada.play();
    }

    if (moedaGrupo.isTouching(mainCyclist)){
      Pontos=Pontos+10;
      moedaGrupo.destroyEach();

       if (MS == 1){
        moedaSom1.play();
      } else if (MS==2){
        moedaSom2.play();
      } else {
        moedaSom3.play();
      }

    }

    if (bolsaGrupo.isTouching(mainCyclist)){
      Pontos=Pontos+100;
      bolsaGrupo.destroyEach();

      if (MS == 1){
        moedaSom1.play();
      } else if (MS==2){
        moedaSom2.play();
      } else {
        moedaSom3.play();
      }

    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(16);
    fill(255);
    text("APERTE ESPAÇO PARA REINICIAR", 510,215);
  
    path.velocityX = 0;
    path2.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    barreiraGrupo.setVelocityXEach(0);
    barreiraGrupo.setLifetimeEach(-1);

    buracoGrupo.setVelocityXEach(0);
    buracoGrupo.setLifetimeEach(-1);

    poçaGrupo.setVelocityXEach(0);
    poçaGrupo.setLifetimeEach(-1);

    moedaGrupo.setVelocityXEach(0);
    moedaGrupo.setLifetimeEach(-1);

    bolsaGrupo.setVelocityXEach(0);
    bolsaGrupo.setLifetimeEach(-1);
    
     if(keyDown("SPACE")) {
       reset();
     }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(160, 230)));
        player1.scale =0.04;
        player1.velocityX = -5
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(160, 230)));
        player2.scale =0.04;
        player2.velocityX = -5
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(160, 230)));
        player3.scale =0.04;
        player3.velocityX = -5
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function barreiras(){
        barreira=createSprite(1100,Math.round(random(160, 230)));
        barreira.scale =0.08;
        barreira.velocityX = -6
        barreira.addImage(barreiraImg);
        barreira.setLifetime=170;
        barreiraGrupo.add(barreira);
        barreira.depth=mainCyclist.depth;
        barreira.depth=barreira.depth-2;
}

function poças(){
         poça=createSprite(1100,Math.round(random(160, 230)));
         poça.scale =0.3;
         poça.velocityX = -6
         poça.addImage(poçaImg);
         poça.setLifetime=170;
         poçaGrupo.add(poça);
         poça.depth=mainCyclist.depth;
         poça.depth=poça.depth-2;
}

function buracos(){
        buraco=createSprite(1100,Math.round(random(160, 230)));
        buraco.scale =0.03;
        buraco.velocityX = -6
        buraco.addImage(buracoImg);
        buraco.setLifetime=170;
        buracoGrupo.add(buraco);
        buraco.depth=mainCyclist.depth;
        buraco.depth=buraco.depth-2;
}

function moedas(){
        moeda=createSprite(1100,Math.round(random(160, 230)));
        moeda.scale =0.04;
        moeda.velocityX = -6
        moeda.addImage(moedaImg);
        moeda.setLifetime=170;
        moedaGrupo.add(moeda);
        moeda.depth=mainCyclist.depth;
        moeda.depth=moeda.depth-2;
}

function bolsas(){
        bolsa=createSprite(1100,Math.round(random(160, 230)));
        bolsa.scale =0.1;
        bolsa.velocityX = -6
        bolsa.addAnimation("Bolsa.png","Bolsa2.png","Bolsa3.png");
        bolsa.setLifetime=170;
        bolsaGrupo.add(bolsa);
        bolsa.depth=mainCyclist.depth;
        bolsa.depth=bolsa.depth-2;
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();

  barreiraGrupo.destroyEach();
  buracoGrupo.destroyEach();
  poçaGrupo.destroyEach();
  moedaGrupo.destroyEach();
  bolsaGrupo.destroyEach();
  
  path.velocityX=-6;
  path2.velocityX=-6;

  Pontos = 0;
 }
