
let bg, backgroundImg;
let StoneGroup, DiamondGroup, SpikeGroup;
let score = 0;
let gamemode = "play";
//preload function
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  player = loadImage("images/iron.png");
  stoneimage = loadImage("images/stone.png");
  dimaondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
  iron_man_collide = loadImage("images/boom.png");

  soundFormats('mp3');
  explosion = loadSound("sounds/Explosion");
  diamonds_sound = loadSound("sounds/Diamonds");
  electro_effect=loadSound("sounds/Electro effect 2");
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


  edge1 = createSprite(0, 5, 2000, 10);//top
  edge2 = createSprite(0, 565, 2000, 10);//bottom
  edge3 = createSprite(5, 0, 10, 2000);//left
  edge4 = createSprite(995, 0, 10, 2000);//right


  StoneGroup = new Group();
  DiamondGroup = new Group();
  SpikeGroup = new Group();
}

function draw() {

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
      score++;
      temp.destroy();
      diamonds_sound.play();
      temp = null;
    }
  }

  //IRON MAN INTERACTION WITH SPIKES
  for (let i = 0; i < SpikeGroup.length; i++) {
    let temp = SpikeGroup.get(i);
    if (temp.isTouching(iron_man)) {
      score -= 2;
      temp.destroy();
      electro_effect.play();
      temp = null;
    }
  }
  if (edge2.isTouching(iron_man)) {
    iron_man.changeImage("collide", iron_man_collide);
    explosion.play();

  }


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
    stone = createSprite(1100, 0, 10, 8);
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
    diamonds = createSprite(1100, 0, 5, 5);
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
    spike = createSprite(1100, 0, 5, 5);
    spike.x = random(50, 900);
    spike.addImage(spikeImage);
    spike.scale = 0.5;
    spike.velocityY = 5;
    spike.lifetime = 300;
    SpikeGroup.add(spike);
  }
}
/*
function menu(){

}*/