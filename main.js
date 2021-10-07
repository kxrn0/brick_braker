import Game from "/game.js";

let canvas, ctx, game;

canvas = document.getElementById("game-screen");
ctx = canvas.getContext("2d");

game = new Game(canvas);

let lastTime = 0;
function anime(timeStamp) {
    let dt = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(dt);
    game.draw(ctx);

    requestAnimationFrame(anime);
}

requestAnimationFrame(anime);