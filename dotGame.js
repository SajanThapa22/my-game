const canvas = document.querySelector("canvas")
canvas.height = 590
canvas.width = 1200
let c = canvas.getContext('2d')
let scoreTitle = document.querySelector("#score-title")
let highScoreTitle = document.querySelector("#high-score-title")
let startGame = document.querySelector('#starting')
let gameStatus = document.querySelector('.lifes')
let overBox = document.querySelector('#game-over-box')
let restartBtn = document.querySelector('#restart-btn')
let value = JSON.parse(localStorage.getItem('score'))
let isAlive = true

const game = {
    radius: 15,
    x: Math.random() * (canvas.width - 15 * 2) + 15,
    y: Math.random() * (canvas.height - 15 * 2) + 15,
    dx: 0,
    dy: 0,
    fx: 0,
    fy: 0,
    draw: function () {
        c.beginPath()
        c.fillStyle = '#fff'
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fill()
        c.stroke()
    },
    move: function () {
        this.x += this.dx
        this.y += this.dy
    },
    bounce: function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
    },
    score: function () {
        scoreTitle.innerHTML = `Score:  ${gameScore.point}`
    },
    decision: function () {
        this.move()
    },
    stop: function () {
        this.x += this.fx
        this.y += this.fy
    }
}

const color = ['red', 'green', 'blue', 'yellow', 'cyan', 'brown']
const brick = {
    x: Math.random() * (canvas.width - 20 * 2) + 20,
    y: Math.random() * (canvas.height - 20 * 2) + 20,
    radius: 20,
    circleColor: 'yellow',

    paint: function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.circleColor
        c.fill()
    }
}
function CreateDot(x, y, radius){
    this.x = x
    this.y = y
    this.radius = radius
    this.paint = function(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
    }
}
const villian = new CreateDot(200, 200, 20)
let countCollide = 0


function keyUp(e) {
}
function keyDown(e) {
    if (game.decision != game.stop){
        if (e.key === 'w' || e.key === 'ArrowUp') {
            if (game.dy >= 0) {
                game.dy = -game.dy
            }
        }
        else if (e.key === 'd' || e.key === 'ArrowRight') {
            if (game.dx < 0) {
                game.dx = -game.dx
            }
        }
        else if (e.key === 's' || e.key === 'ArrowDown') {
            if (game.dy < 0) {
                game.dy = -game.dy
            }
        }
        else if (e.key === 'a' || e.key === 'ArrowLeft') {
            if (game.dx >= 0) {
                game.dx = -game.dx
            }
        }
    }

    if (game.dx === 0 && game.dy === 0) {
    if (e.key === 'Enter') {
            countEnter++
            if (countEnter === 1) {
                game.dx = 5 * startArr[Math.floor(Math.random() * 2)]
                game.dy = 5 * startArr[Math.floor(Math.random() * 2)]
                startGame.style.visibility = "hidden"
            }

        }
    }
    
    if(countCollide <= 3){
        if(e.key === ' '){
            countSpace ++
            if(countSpace % 2 === 0){
                game.decision = game.move
            }else{
                game.decision = game.stop
            }
        }
    }

    
}
let startArr = [-1, 1]
let countSpace = 0

let countEnter = 0

function getDistance(x1, y1, x2, y2) {
    let xDis = x2 - x1
    let yDis = y2 - y1
    return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2))
}
function collide() {
    if (getDistance(game.x, game.y, brick.x, brick.y) < game.radius + brick.radius) {
        gameScore.point += 1
        if (gameScore.point > hiscoreval) {
            hiscoreval = gameScore.point
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            highScoreTitle.innerHTML = `Highest score: ${hiscoreval}`
        }
        brick.x = Math.random() * (canvas.width - brick.radius * 2) + brick.radius
        brick.y = Math.random() * (canvas.height - brick.radius * 2) + brick.radius
        brick.circleColor = 'red'
        speed()
        villian.x = Math.random() * (canvas.width - villian.radius * 2) + villian.radius
        villian.y = Math.random() * (canvas.height - villian.radius * 2) + villian.radius
    } else {
        brick.circleColor = 'yellow'
    }
}
function collideWithVillian(){
    if (getDistance(game.x, game.y, villian.x, villian.y) < game.radius + villian.radius ){
        countCollide ++ 
        if(countCollide < 3){
            villian.x = Math.random() * (canvas.width - villian.radius * 2) + villian.radius
            villian.y = Math.random() * (canvas.height - villian.radius * 2) + villian.radius
        }
        if(countCollide >= 3){
            isAlive = false
            game.decision = game.stop
            overBox.style.transform = 'translateY(200px)'
            overBox.style.visibility = 'visible'
            game.dx = 0
            game.dy = 0
        }
        if(countCollide == 1){
            document.querySelector(".lifes:nth-child(1)").style.backgroundColor = "red"
        }
        if(countCollide == 2){
            document.querySelector(".lifes:nth-child(2)").style.backgroundColor = "red"
        }
        if(countCollide == 3){
            document.querySelector(".lifes:nth-child(3)").style.backgroundColor = "red"
        }
    }
}
let gameScore = {
    point: 0
}
let hiscore = localStorage.getItem("hiscore")
let hiscoreval

if (hiscore === null) {
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore)
    highScoreTitle.innerHTML = `Highest score: ${hiscoreval}`
}

function restart(){
    isAlive = true
    brick.x = Math.random() * (canvas.width - brick.radius * 2) + brick.radius
    brick.y = Math.random() * (canvas.height - brick.radius * 2) + brick.radius
    villian.x = Math.random() * (canvas.width - villian.radius * 2) + villian.radius
    villian.y = Math.random() * (canvas.height - villian.radius * 2) + villian.radius
    game.x = Math.random() * (canvas.width - 15 * 2) + 15
    game.y = Math.random() * (canvas.height - 15 * 2) + 15
    gameScore.point = 0
    game.decision = game.move
    countEnter = 0  
    game.dx = 0
    game.dy = 0
    countCollide = 0
    overBox.style.transform = 'translateY(-300px)'
    overBox.style.visibility = 'hidden'
    document.querySelector(".lifes:nth-child(1)").style.backgroundColor = "white"
    document.querySelector(".lifes:nth-child(2)").style.backgroundColor = "white"
    document.querySelector(".lifes:nth-child(3)").style.backgroundColor = "white"
}


window.addEventListener('keyup', keyUp)
window.addEventListener("keydown", keyDown)
restartBtn.addEventListener('click', restart)



function speed() {
    let speedIncrease = .85

    if (gameScore.point !== 0) {
        if (gameScore.point % 5 === 0) {
            if (game.dx >= 0) {
                game.dx += speedIncrease
            } else {
                game.dx += -speedIncrease
            }
            if (game.dy >= 0) {
                game.dy += speedIncrease
            } else {
                game.dy += -speedIncrease
            }
        }
    }
}


function animation() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animation)
    brick.paint()
    game.draw()
    game.decision()
    game.bounce()
    collide()
    collideWithVillian()
    game.score()
    villian.paint()
}

animation()

