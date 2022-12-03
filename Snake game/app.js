let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');


let cellSize = 50;
let snakeBoard = [[0,0]];
let direction = "right";
let gameOver = false;
let boardWidth = 1000;
let boardHeight = 600;
let score = 0;

let foodGen = generateFood();

document.addEventListener('keydown',function(e){
    // console.log(e)
    if(e.key === "ArrowLeft"){direction = "left";}
    else if(e.key === "ArrowUp"){direction = "up";}
    else if(e.key === "ArrowDown"){direction = "down";}
    else{direction = "right"}
})

function draw(){

    if(gameOver === true){
        clearInterval(gameEnd);
        ctx.font = "60px sans-serif"
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER !!", 100,100)
        return;
    }

    ctx.clearRect(0,0,1000,600);
    for(let cell of snakeBoard){
        ctx.fillStyle = "violet";
        ctx.fillRect(cell[0], cell[1],cellSize,cellSize)
    }

    // make food
    ctx.fillStyle = "blue";
    ctx.fillRect(foodGen[0], foodGen[1] , cellSize,cellSize)

    //draw score
    ctx.font = "20px sans-serif";
    ctx.fillText(`score: ${score}` , 20,20);

}

function update(){

    let headX = snakeBoard[snakeBoard.length - 1][0]
    let headY = snakeBoard[snakeBoard.length - 1][1]
     
    let newHeadX ;
    let newHeadY ;
    if(direction === 'left'){
         newHeadX = headX - cellSize;
         newHeadY = headY;

         if(newHeadX < 0){gameOver = true;}

    }
    else if(direction === 'up'){
         newHeadX = headX;
         newHeadY = headY - cellSize;

         if(newHeadY < 0){gameOver = true;}
    }
    else if(direction === 'down'){
        newHeadX = headX;
        newHeadY = headY + cellSize;
        

        if(newHeadY ===  600){gameOver = true;}
    }
    else{
        newHeadX = headX + cellSize;
        newHeadY = headY ;

        if(newHeadX === 1000){gameOver = true;}
   }


   snakeBoard.push([newHeadX,newHeadY]);
   
   if(newHeadX == foodGen[0] && newHeadY == foodGen[1]){
    foodGen = generateFood();
    score++;
    }
    else{

        snakeBoard.shift();
    }


    
}


function generateFood(){
    return [
        Math.round((Math.random()*(boardWidth - cellSize))/cellSize)*cellSize , 
        Math.round((Math.random()*(boardHeight - cellSize))/cellSize)*cellSize
    ]
}

let gameEnd = setInterval(function(){
    update();
    draw();

},100)