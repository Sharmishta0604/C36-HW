//Create variables here
var dog1,dog2;
var food,foodStock;
var database;
var dog;
var x;
var feedbutton,getbutton;
var feedtime,lastfed;
var foodObj;
var changeState,readState;
var bed,garden,washroom;
var gamestate;
function preload()
{
  //load images here
  bed=loadImage("virtual pet images/Bed Room.png");
  garden=loadImage("virtual pet images/Garden.png");
  washroom=loadImage("virtual pet images/Wash Room.png");
  dog1=loadImage("dogImg.png");
  dog2=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  dog=createSprite(250,150);
  dog.addImage(dog1);
  dog.scale=0.25;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food(10,10,250,250);
  feedbutton=createButton("Feed the dog");
  feedbutton.position(650,70);
  feedbutton.mousePressed(feedDog);

  getbutton=createButton("Get more food");
  getbutton.position(750,70);
  getbutton.mousePressed(addFood);
}


function draw() {  
background(46,139,87)
drawSprites();
  feedtime=database.ref('Feedtime');
  feedtime.on("value",function(data){
    lastfed=data.val();
  })

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gamestate=data.val();
  })
if(gamestate!="hungry"){
  feedbutton.hide();
  getbutton.hide();
  //dog.remove();
  ; 
}else{
  
  feedbutton.show();
  getbutton.show();
  /*dog=createSprite(650,250);
  dog.addImage(dog1);
  dog.scale=0.25;*/
}
console.log(foodObj.positionX);
//foodObj.display();

fill("white");
textSize(19);
//text("food="+food,200,400);
if(lastfed>=12){
  text("Last fed: "+(lastfed-12)+" PM",380,480);
}else if(lastfed===0){
  text("Last fed: 12 AM",380,480);
}else{
  text("Last fed: "+lastfed+" AM",380,480);

}
 currentTime=hour();
if(currentTime===(lastfed+1)){
  update("bedtime");
    foodObj.bedroom();
  }else if(currentTime===(lastfed+2)){
    update("bathroom");
    foodObj.washroom();
  }else if(currentTime>(lastfed+2) && currentTime<=(lastfed+4)){
    update("garden");
    foodObj.garden();
  }else{
    update("hungry");
    foodObj.display();
  }


}
function feedDog(){
  dog.addImage(dog2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
Food:foodObj.getFoodStock(),
Feedtime:hour()
  })
}
  function addFood(){
    food++;
    foodObj.updateFoodStock(foodObj.getFoodStock()+1)
    database.ref('/').update({
      Food:food
    })
  }
   //text("Good job!",250,250);
  function update(state){
    database.ref('/').update({
      gameState:state
    })

  }

  

function readStock(data){
  food=data.val();
}

function writeStock(data){
  database.ref('/').update({
     Food:x 
  })
}
  





