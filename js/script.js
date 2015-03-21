(function(window, comp, $, undefined) {
    "use strict";

    $(document).ready(function() {
        var oSnakeGame,
            snakeBoardEl = $(".snakeBoard");

        oSnakeGame = new CK12.components.Game({
            el: $(".container"),
            gameBoard: {
                el: snakeBoardEl,
                width: 1000,
                height: 600,
                cellSize: 5
            },
            scoreCard: {
                el: $(".scoreBoard")
            }
        });

        //screenfull.enabled && screenfull.request(oSnakeGame.el);


        window.oSnakeGame = oSnakeGame;
    });
})(window, CK12.components, jQuery);