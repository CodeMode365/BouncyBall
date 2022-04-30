var canvX = document.getElementById('canva');
var contX = canvX.getContext('2d')

//width and height property

canvX.width = 680;
canvX.height = 400;


//Animation 1 (ball)

//rectangle
let player = {
    x: (canvX.width / 2) - 60,
    y: canvX.height - 30,
    h: 20,
    w: 120,
    speed: 4,
    dx: 0,
    dy: 0
}


// console.log(player.x)

function DrawBoat() {
    contX.beginPath();
    wallDetection();
    contX.fillStyle = 'rgb(150,0,144)'
    contX.fillRect(player.x, player.y, player.w, player.h);
    player.x += player.dx;


}




//circle

const circle = {
    x: 200,
    y: 200,
    size: 20,
    dx: 3,
    dy: 3
}




function drawCircle() {
    contX.beginPath();
    contX.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    // driver();
    contX.fillStyle = 'black';
    contX.fill();
    // fillStyle='red';
    // contX.fill();
    contX.clearRect(circle.x - 5, circle.y - 5, 10, 10);

}




//To paint the canvas screen continuously
function paint() {
    if(circle.y>canvX.height){
        GameOver();
    }else{
    contX.clearRect(0, 0, canvX.width, canvX.height);
    drawCircle();
    DrawBoat();
    circle.x += circle.dx;
    circle.y += circle.dy;
    requestAnimationFrame(paint);

    //Detect bouncing points X (left & right)
    if (circle.x + circle.size > canvX.width || circle.x - circle.size <= 0) {
        circle.dx *= -1;
    }
   //Bounction point form the character and top
    if (circle.y + circle.size > player.y && circle.x + circle.size > player.x && circle.x + circle.size < player.x + player.w || circle.y-circle.size<=0) {
        circle.dy *= -1;
    }
    
    }
}
paint();




//To move the character while the arrows are pressed
function moveRight() {
    player.dx = player.speed;
}
function moveLeft() {
    player.dx = -player.speed;
}

function keyPress(e) {
    if (e.key == 'ArrowRight') {
        moveRight();
    } if (e.key == 'ArrowLeft') {
        moveLeft();
    }
}
function keyNotPress(e) {
    if (e.key == 'ArrowRight' || e.key == "ArrowLeft") {
        player.dx = 0;
        player.dy = 0;
    }
}



//Wall detection for the character
function wallDetection(){
    //left
    if(player.x<0){
        player.x=0;
    }
    //right
    if(player.x+player.w>canvX.width){
        player.x = canvX.width-player.w;
    }
}


//Event listeners for the keys
document.addEventListener('keydown', keyPress)
document.addEventListener('keyup', keyNotPress)




//GameOver Function
function GameOver(){
    contX.font='70px cursive';
    contX.fillStyle='red';
    contX.fillText("Game Over", canvX.width/2-150, canvX.height/2)
    contX.font='50px cursive';
    contX.fillText("Reload Page to restart", canvX.width/2-240, canvX.height/2+50)    
}