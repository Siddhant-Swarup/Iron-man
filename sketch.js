
var bg, backgroundImg;
var StoneGroup, DiamondGroup, SpikeGroup;
var score = 0;
var gamemode = "play";
var restart, restart_image;
//preload function
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  player = loadImage("images/iron.png");
  stoneimage = loadImage("images/stone.png");
  dimaondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
  iron_man_collide = loadImage("images/boom.png");
  restart_image = loadImage("images/restart.png");

  soundFormats('mp3');
  explosion = loadSound("sounds/Explosion");
  diamonds_sound = loadSound("sounds/Diamonds");
  electro_effect = loadSound("sounds/Electro effect 2");
}


//s
function setup() {
  createCanvas(1000, 570);
  bg = createSprite(500, 300, 500, 500);
  bg.velocityY = -5;

  iron_man = createSprite(580, 500);
  iron_man.addImage("flying", player);
  iron_man.addImage("collide", iron_man_collide);
  iron_man.scale = 0.25;
  iron_man.debug=true;
  iron_man.setCollider("rectangle",100,0,450,450);

  //sprite for restart option
  restart = createSprite(500, 300);
  restart.addImage(restart_image);
  restart.scale = 0.3;
  restart.visible = false;

  //for the edges
  edge1 = createSprite(0, 5, 2000, 10);//top
  edge2 = createSprite(0, 565, 2000, 10);//bottom
  edge3 = createSprite(5, 0, 10, 2000);//left
  edge4 = createSprite(995, 0, 10, 2000);//right

  //for obstacles and rewards
  StoneGroup = new Group();
  DiamondGroup = new Group();
  SpikeGroup = new Group();
  //object of gamemode class
  mode=new Status();
  //Object of class Status
  decision = new Status();
}

function draw() {
  console.log(decision.getvalue());
  if (decision.getvalue() === "play") {
    bg.addImage(backgroundImg);
    bg.scale = 2;
    if (bg.y < 100) {
      bg.y = bg.height / 4;
    }



    //for the edges
    iron_man.collide(edge1);
    iron_man.collide(edge2);
    iron_man.collide(edge3);
    iron_man.collide(edge4);

    //IRON MAN INTERACTION WITH STONES
    for (let i = 0; i < StoneGroup.length; i++) {
      let temp = StoneGroup.get(i);
      if (temp.isTouching(iron_man)) {
        iron_man.collide(temp);
      }
    }

    //IRON MAN INTERACTION WITH DIAMONDS
    for (let i = 0; i < DiamondGroup.length; i++) {
      let temp = DiamondGroup.get(i);

      if (temp.isTouching(iron_man)) {
        diamonds_sound.play();
        temp.destroy();
        temp = null;
        score++;
      }
    }

    //IRON MAN INTERACTION WITH SPIKES
    for (let i = 0; i < SpikeGroup.length; i++) {
      let temp = SpikeGroup.get(i);

      if (temp.isTouching(iron_man)) {
        electro_effect.play();
        temp.destroy();
        temp = null;
        score -= 2;
      }
    }
    if (edge2.isTouching(iron_man)) {
      decision.setvalue("end");
      iron_man.changeImage("collide", iron_man_collide);
      explosion.play();
      restart.visible = true;

    }
  }

  else if (decision.getvalue() === "end") {
    bg.y = 0;
    DiamondGroup.setVelocityYEach(0);
    StoneGroup.setVelocityYEach(0);
    SpikeGroup.setVelocityYEach(0);
    SpikeGroup.setLifetimeEach(-1);
    DiamondGroup.setLifetimeEach(-1);
    StoneGroup.setLifetimeEach(-1);
    iron_man.velocityY = 0;
    iron_man.velocityX = 0;
    iron_man.setCollider("rectangle", 0, 0, 300, 10);
    if (mousePressedOver(restart)) {
      restart_game();
    }
  }

  // if(keyDown("esc")){
  //   decision.setvalue="paused";
  // }


  generatestone();
  generatediamonds();
  generateSpikes();

  controls();
  drawSprites();
  document.getElementById("Score").innerHTML = score;
}


//controls
function controls() {
  if (keyDown("up")) {
    iron_man.velocityY = -5;
  }
  if (keyDown("down")) {
    iron_man.velocityY = 5;
  }
  if (keyDown("left")) {
    iron_man.velocityX = -5;
  }
  if (keyDown("right")) {
    iron_man.velocityX = 5;
  }
}


//THIS FUNCTION WILL GENERATE STONE
function generatestone() {
  if (frameCount % 30 === 0) {
    stone = createSprite(1100, -670, 10, 8);
    stone.x = random(50, 900);
    stone.addImage(stoneimage);
    stone.scale = 0.5;
    stone.velocityY = 5;
    stone.lifetime = 500;
    StoneGroup.add(stone);
  }
}

//THIS FUNCTION WILL GENEARATE DIAMONDS
function generatediamonds() {
  if (frameCount % 100 === 0) {
    diamonds = createSprite(1000, -670, 5, 5);
    diamonds.x = random(50, 900);
    diamonds.addImage(dimaondImage);
    diamonds.scale = 0.5;
    diamonds.velocityY = 5;
    diamonds.lifetime = 400;
    DiamondGroup.add(diamonds)
  }
}

//THIS FUNCTION WILL GENERATE SPIKES
function generateSpikes() {
  if (frameCount % 100 === 0) {
    spike = createSprite(1100, -670, 5, 5);
    spike.x = random(50, 900);
    spike.addImage(spikeImage);
    spike.scale = 0.5;
    spike.velocityY = 5;
    spike.lifetime = 300;
    SpikeGroup.add(spike);
  }
}

//Restart function 
function restart_game() {
  decision.setvalue("play");
  iron_man.changeAnimation("flying", player);
  StoneGroup.destroyEach();
  SpikeGroup.destroyEach();
  DiamondGroup.destroyEach();
  score = 0;
  iron_man.x=300;
  iron_man.y=300;
  restart.visible = false;
  iron_man.setCollider("rectangle", 100, 0, 450, 450);
}