import { detect_collision } from "./collision_detection.js";

export default class Ball {
    constructor(game) {
        this.GAME_WIDTH = game.GAME_WIDTH;
        this.GAME_HEIGHT = game.GAME_HEIGHT;
        this.radius = 8;
        this.reset();
        this.game = game;
    }

    reset() {
        this.position = {
            x: this.GAME_WIDTH / 2,
            y: this.GAME_HEIGHT / 2 + 100
        };
        this.speed = {
            x: 4,
            y: -2
        };

    }

    draw(ctx) {
        ctx.fillStyle = "#439a56";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(dt) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x < this.radius || this.position.x + this.radius > this.GAME_WIDTH)
            this.speed.x *= -1;
        if (this.position.y < this.radius)
            this.speed.y *= -1;

        if (this.position.y + this.radius > this.GAME_HEIGHT) {
            this.game.lives--;
            this.reset();
        }

        if (detect_collision(this, this.game.paddle)) {
            this.position.y = this.game.paddle.position.y - this.radius;
            this.speed.y *= -1;
        }
    }
}
