let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let paddleSpeed = 6;
let paddleWidth = 100;
let radius = 8;
let isMovingLeft = false;
let isMovingRight = false;
let isGameOver = false;
let xPaddle = 0;
let speed = 1;
let dx = -4;
let dy = 2;
let score = 0;
let count = 0;

const BOTTOM = 40;
const PADDLE_HEIGHT = 6;

setInterval(function () {
    score ++;
    count ++
    if (count >= 10) {
        speed += 0.3;
        dx = dx * speed;
        dy = dy * speed;
        paddleSpeed ++;
        count = 0;
    }
}, 1000);

let myBall = {
    ballX: 21,
    ballY: 21,
    ballRadius: radius,

    drawBall: function () {
        ctx.beginPath();
        ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    },

    changeBallPosition: function () {
        this.ballX += dx;
        this.ballY += dy;
        if (this.ballX + dx < this.ballRadius || this.ballX + dx > canvas.width - this.ballRadius) {
            dx = -dx;
        }
        if (this.ballY + dy < this.ballRadius) {
            dy = -dy;
        }
        if (dx > 0) {
            if (this.ballX + dx + this.ballRadius > myPaddle.paddleX && this.ballX + dx - this.ballRadius < myPaddle.paddleX + myPaddle.paddleWidth &&
                this.ballY + dy > canvas.height - BOTTOM - myPaddle.paddleHeight && this.ballY < canvas.height - BOTTOM - myPaddle.paddleHeight) {
                dy = -dy;
            }
            if (this.ballX + dx + this.ballRadius > myPaddle.paddleX && this.ballX + this.ballRadius < myPaddle.paddleX &&
                this.ballY + dy > canvas.height - BOTTOM - myPaddle.paddleHeight - this.ballRadius && this.ballY + dy < canvas.height - BOTTOM - myPaddle.paddleHeight) {
                dx = -dx;
                dy = -dy;
                console.log("2");
            }
            if (this.ballX + dx < myPaddle.paddleX && this.ballX + dx + this.ballRadius > myPaddle.paddleX &&
                this.ballY + dy > canvas.height - BOTTOM - myPaddle.paddleHeight && this.ballY + dy < canvas.height - BOTTOM + this.ballRadius) {
                dx = -dx;
                console.log("5");
            } //this.ballY + dy > canvas.height - BOTTOM - myPaddle.paddleHeight && this.ballY < canvas.height - BOTTOM - myPaddle.paddleHeight
        } else if (dx < 0) { //this.ballX - dx + this.ballRadius > myPaddle.paddleX && this.ballX - dx - this.ballRadius < myPaddle.paddleX + myPaddle.paddleWidth &&
            if (this.ballX - dx + this.ballRadius > myPaddle.paddleX && this.ballX - dx - this.ballRadius < myPaddle.paddleX + myPaddle.paddleWidth &&
                this.ballY + dy > canvas.height - BOTTOM - myPaddle.paddleHeight && this.ballY < canvas.height - BOTTOM - myPaddle.paddleHeight) {
                dy = -dy;
                console.log("3");
            }
            if (this.ballX - dx - this.ballRadius > myPaddle.paddleX + myPaddle.paddleWidth && this.ballX - this.ballRadius < myPaddle.paddleX + myPaddle.paddleWidth &&
                this.ballY + dy > canvas.height - BOTTOM - myPaddle.paddleHeight - this.ballRadius && this.ballY + dy < canvas.height - BOTTOM - myPaddle.paddleHeight) {
                dx = -dx;
                dy = -dy;
                console.log("4");
            }
            if (this.ballX - dx - this.ballRadius > myPaddle.paddleX + myPaddle.paddleWidth && this.ballX - this.ballRadius < myPaddle.paddleX + myPaddle.paddleWidth &&
                this.ballY + dy > canvas.height - BOTTOM - myPaddle.paddleHeight && this.ballY + dy < canvas.height - BOTTOM + this.ballRadius) {
                dx = -dx;
                console.log("6");
            }
        }
    },

    checkGameOver: function () {
        if (this.ballY > canvas.height - this.ballRadius) {
            isGameOver = true;
        }
    },

    showPoint: function () {
        ctx.beginPath()
        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.fillText("Score: " + score, 5, 30);
    }
};

document.addEventListener("keydown", function () {
    if (event.keyCode === 37) {
        isMovingLeft = true;
    }
    if (event.keyCode === 39) {
        isMovingRight = true;
    }
});

document.addEventListener("keyup", function () {
    if (event.keyCode === 37) {
        isMovingLeft = false;
    }
    if (event.keyCode === 39) {
        isMovingRight = false;
    }
});


let myPaddle = {
    paddleWidth: paddleWidth,
    paddleHeight: PADDLE_HEIGHT,
    paddleX: xPaddle,
    paddleY: canvas.height - BOTTOM - PADDLE_HEIGHT,

    drawPaddle: function () {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
    },

    changePaddlePosition: function () {
        if (isMovingLeft) {
            if (this.paddleX - paddleSpeed < 0) {
                this.paddleX = 0;
            } else {
                this.paddleX -= paddleSpeed;
            }
        }
        if (isMovingRight) {
            if (this.paddleX + paddleSpeed > canvas.width - this.paddleWidth) {
                this.paddleX = canvas.width - this.paddleWidth;
            } else {
                this.paddleX += paddleSpeed;
            }
        }
    }

}

function animate() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        myBall.drawBall();
        myPaddle.drawPaddle();
        myBall.changeBallPosition();
        myPaddle.changePaddlePosition();
        myBall.checkGameOver();
        myBall.showPoint();

        requestAnimationFrame(animate);
    } else {
        alert("Again?");
    }
}

animate();
