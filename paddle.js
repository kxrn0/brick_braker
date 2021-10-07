export default class Paddle {
    constructor(game) {
        this.GAME_WIDTH = game.GAME_WIDTH;
        this.GAME_HEIGHT = game.GAME_HEIGHT;
        this.width = 150;
        this.height = 20;
        this.position = {
            x : .5 * (this.GAME_WIDTH - this.width),
            y : this.GAME_HEIGHT - this.height - 10
        };
        this.maxSpeed = 7.23;
        this.speed = 0;
    }

    move_left() {
        this.speed = -this.maxSpeed;
    }

    move_right() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "#6c8f9a";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(dt) {
        this.position.x += this.speed;

        let space = 5;
        if (this.position.x < space)
            this.position.x = space;
        if (this.position.x + this.width + space > this.GAME_WIDTH)
            this.position.x = this.GAME_WIDTH - this.width - space;
    }
}