class Food {
constructor(x,y){
    this.foodstock=20;
    this.lastFed;
    this.image=loadImage("Milk.png");
}

updateFoodStock(foodStock){
    this.foodstock=foodStock;
}

getFoodStock(){
    return this.foodstock;
}

deductFoodStock(){
    if(this.foodstock>0){
        this.foodstock=this.foodstock-1;
    }
}

bedroom(){
    background(bed,displayWidth,displayHeight);
}

washroom(){
    background(washroom,displayWidth,displayHeight);
}

garden(){
    background(garden,displayWidth,displayHeight);
}

display(){
    var x=20,y=300;
imageMode(CENTER);

if(this.foodstock!=0){
    for(var i=0;i<this.foodstock;i++){
        if(i%10===0){
            x=100;
            y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
    }
}


}

}