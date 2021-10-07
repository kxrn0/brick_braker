import Paddle from "/paddle.js"
import InputHandler from "/input.js"
import Ball from "/ball.js"
import { build_level, level0, level1, level2, level3 } from "/levels.js"

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL : 4
};

export default class Game {
    constructor(canvas) {
        this.GAME_WIDTH = canvas.width;
        this.GAME_HEIGHT = canvas.height;
        this.gameState = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;

        this.levels = [level0, level1, level2, level3];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gameState !== GAMESTATE.MENU && this.gameState != GAMESTATE.NEWLEVEL) return;

        this.bricks = build_level(this, this.levels[this.currentLevel % 4]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];
        this.gameState = GAMESTATE.RUNNING;
    }

    update(dt) {
        if (this.lives == 0)
            this.gameState = GAMESTATE.GAMEOVER;

        if (this.gameState === GAMESTATE.PAUSED ||
            this.gameState === GAMESTATE.MENU ||
            this.gameState === GAMESTATE.GAMEOVER) return;

        if (this.bricks.length == 0) {
            this.currentLevel++;
            this.gameState = GAMESTATE.NEWLEVEL;
            this.start();
        }
        console.log(this.levels);


        [...this.gameObjects, ...this.bricks].forEach(gobo => {
            gobo.update(dt);
            if (gobo.hit) {
                let index = this.bricks.indexOf(gobo);
                this.bricks = this.bricks.slice(0, index).concat(this.bricks.slice(index + 1));
            }
        });
    }

    draw(ctx) {
        [...this.bricks, ...this.gameObjects].forEach(g => g.draw(ctx));

        if (this.gameState == GAMESTATE.PAUSED) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0, .3)";
            ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

            ctx.font = "60px monospace";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
        }
        else if (this.gameState == GAMESTATE.MENU) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(100, 190, 200)";
            ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

            ctx.font = "60px monospace";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER to start", this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
        }
        else if (this.gameState == GAMESTATE.GAMEOVER) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255, 50, 100)";
            ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

            ctx.font = "60px monospace";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
        }

        ctx.font = "10px monospace";
        ctx.fillStyle = "#103";
        ctx.fillText(`lives : ${this.lives}`, 30, 20);
    }

    toggle_pause() {
        if (this.gameState == GAMESTATE.PAUSED)
            this.gameState = GAMESTATE.RUNNING;
        else
            this.gameState = GAMESTATE.PAUSED;
    }

}