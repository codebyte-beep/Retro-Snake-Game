let inpuDir = { x: 0, y: 0 }
let hiscore = 0
let score = 0
// console.log("rersusdsdjn");
let speed = 8
let snakeArr = [{ x: 18, y: 18 }]
let lastPaintTime = 0
let food = { x: 12, y: 9 }
const btn = document.getElementById("btn")
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const musicSound = new Audio('music/music.mp3');
const moveSound = new Audio('music/move.mp3');
// why is it not throwing error board not defined??????????
// let board = document.getElementById("board")
function main(ctime) {
    if(btn.innerHTML == "on") musicSound.play()
    window.requestAnimationFrame(main)
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}

function isCollide() {
    // if (snakeArr[0].x == 18 || snakeArr[0].x == 0 || snakeArr[0].y == 18 || snakeArr[0].y == 0) {
    //     return true
    // }
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    return false
}

function gameEngine() {
    // console.log(isCollide());

    if (isCollide()) {
        // console.log("hat");
        gameOverSound.play()
        musicSound.pause()
        alert("Game Over. Press any key to play again!");
        inpuDir = { x: 0, y: 0 }
        snakeArr = [{ x: 15, y: 16 }]
        musicSound.play()
        console.log("common");
    }
    // console.log("paint");
    // moving the snake
    if (snakeArr[0].x == 18 && inpuDir.x == 1) {
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] }
        }
        snakeArr[0].x = 1
    }
    else if (snakeArr[0].x == 0 && inpuDir.x == -1){
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] }
        }
        snakeArr[0].x = 18
    }
    else if(snakeArr[0].y == 18 && inpuDir.y == 1){
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] }
        }
        snakeArr[0].y = 1
    }
    else if(snakeArr[0].y == 0 && inpuDir.y == -1){
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] }
        }
        snakeArr[0].y = 18
    }
    else{
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] }
        }
        snakeArr[0].x += inpuDir.x
        snakeArr[0].y += inpuDir.y
    }
    // console.log(snakeArr[0].x);
    // console.log(snakeArr[0].y);
    // console.log(food.x);
    // console.log(food.y);
    // console.log("************");

    // if snake eats the food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        foodSound.play()
        snakeArr.unshift({ x: inpuDir.x + snakeArr[0].x, y: inpuDir.y + snakeArr[0].y })
        let a = 2
        let b = 16
        food.x = Math.round(a + (b - a) * Math.random())
        food.y = Math.round(a + (b - a) * Math.random())
        // console.log(snakeArr[0].x);
        // console.log(snakeArr[0].y);
        
    }
    // else{
    //     console.log("not hit");
    // }

    // displaying the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index == 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snakeBody")
        }
        board.appendChild(snakeElement)
    });
    // displaying the food
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}
window.requestAnimationFrame(main)
window.addEventListener("keydown", e => {
    moveSound.play()
    if (e.key == "ArrowUp") {
        inpuDir.x = 0
        inpuDir.y = -1
        // console.log("ArrowUp");
    }
    else if (e.key == "ArrowDown") {
        inpuDir.x = 0
        inpuDir.y = 1
        // console.log("ArrowDown");
    }
    else if (e.key == "ArrowRight") {
        inpuDir.x = 1
        inpuDir.y = 0
        // console.log("ArrowRight");
    }
    else if (e.key == "ArrowLeft") {
        inpuDir.x = -1
        inpuDir.y = 0
        // console.log("ArrowLeft");
    }
})
btn.addEventListener("click", () => {
    if (btn.innerHTML == "off") {
      musicSound.play();
      btn.innerHTML = 'on';
    } else {
      musicSound.pause();
      btn.innerHTML = 'off';
    }
  });
// always remember print statements are the best while debugging, that's why I have not removed commented print statements that I used while debugging
// things to learn from the above code: 
// 1. {...arr} triple dots
// 2. arr.unshift
// 3. gridRowStart..., look what other great things grid can do
// 4. gameLoop how to paint screen using js
// 5. et cetra