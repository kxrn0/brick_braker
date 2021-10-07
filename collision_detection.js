function point_inside_rect(rect, point) {
    if (rect.x < point.x && point.x < rect.x + rect.width &&
        rect.y < point.y && point.y < rect.y + rect.height)
        return true;
    return false;
}

export function detect_collision(ball, rect) {
    let ballPoint1 = { x : ball.position.x - ball.radius, y : ball.position.y - ball.radius},
        ballPoint2 = { x : ball.position.x + ball.radius, y : ball.position.y - ball.radius},
        ballPoint3 = { x : ball.position.x + ball.radius, y : ball.position.y + ball.radius},
        ballPoint4 = { x : ball.position.x - ball.radius, y : ball.position.y + ball.radius},

        rectPoint1 = { x : rect.position.x, y : rect.position.y},
        rectPoint2 = { x : rect.position.x + rect.width, y : rect.position.y},
        rectPoint3 = { x : rect.position.x + rect.width, y : rect.position.y + rect.height},
        rectPoint4 = { x : rect.position.x, y : rect.position.y + rect.height},

        ballRect = { x : ballPoint1.x, y : ballPoint1.y, width : ball.radius * 2, height : ball.radius * 2},
        rectRect = { x : rectPoint1.x, y : rectPoint1.y, width : rect.width, height : rect.height};

        if (point_inside_rect(rectRect, ballPoint1) || point_inside_rect(rectRect, ballPoint2) ||
            point_inside_rect(rectRect, ballPoint3) || point_inside_rect(rectRect, ballPoint4) ||
            point_inside_rect(ballRect, rectPoint1) || point_inside_rect(ballRect, rectPoint2) || 
            point_inside_rect(ballRect, rectPoint3) || point_inside_rect(ballPoint4, rectPoint4))
            return true;
        return false;
}