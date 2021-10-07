export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", event => {
            switch (event.key) {
                case "ArrowLeft":
                    paddle.move_left();
                    break;
                case "ArrowRight":
                    paddle.move_right();
                    break;
                case 'P':
                case 'p':
                    game.toggle_pause();
                    break;
                case "Enter":
                    game.start();
            }
        });

        document.addEventListener("keyup", event => {
            switch (event.key) {
                case "ArrowLeft":
                    if (paddle.speed < 0)
                        paddle.stop();
                    break;
                case "ArrowRight":
                    if (paddle.speed > 0)
                        paddle.stop();
                    break;
            }
        });
    }
}