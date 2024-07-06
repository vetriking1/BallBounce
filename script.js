const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let bounceValueSlider = document.getElementById("bounceValueSlider");
let yPosSlider = document.getElementById("yPosSlider");
let radiusSlider = document.getElementById("radiusSlider");

const gravity = 0.2;
let bounce = parseFloat(bounceValueSlider.value);
let velocity = 0;

const ball = {
    x: c.width / 2,
    y: parseFloat(yPosSlider.value),
    r: parseFloat(radiusSlider.value),
    color: "red",
};

let animationFrameId;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawBall();
    velocity += gravity;
    ball.y += velocity;

    if (ball.y + ball.r > c.height) {
        velocity = -velocity * bounce;
        ball.y = c.height - ball.r;
    }

    animationFrameId = requestAnimationFrame(update);
}

function startSimulation() {
    ball.y = parseFloat(yPosSlider.value);
    ball.r = parseFloat(radiusSlider.value);
    bounce = parseFloat(bounceValueSlider.value);
    velocity = 0; // Reset velocity when restarting the simulation

    if (!animationFrameId) {
        update();
    }
}

bounceValueSlider.addEventListener('input', () => {
    bounce = parseFloat(bounceValueSlider.value);
});

yPosSlider.addEventListener('input', () => {
    ball.y = parseFloat(yPosSlider.value);
});

radiusSlider.addEventListener('input', () => {
    ball.r = parseFloat(radiusSlider.value);
});
