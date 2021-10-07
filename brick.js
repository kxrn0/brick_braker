import { detect_collision } from "./collision_detection.js";

export default class Brick {
    constructor(game, position) {
        this.game = game;
        this.position = position;
        this.width = 80;
        this.height = 24;

        let red, green, blue;
        red = Math.floor(Math.random() * 50) + 185;
        green = Math.floor(Math.random() * 50) + 100;
        blue = Math.floor(Math.random() * 50) + 50;

        this.style = `rgb(${red}, ${green}, ${blue})`;
        this.hit = false;
    }

    update() {
        if (detect_collision(this.game.ball, this)) {
            this.game.ball.speed.y *= -1;
            this.hit = true;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.style;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeStyle = "#122342";
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}
