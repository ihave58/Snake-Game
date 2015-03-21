(function(window, comp, $, undefined) {
    "use strict";

    var defaults = {};

    function Game(params) {
        var oThis = this;

        if(params.el === undefined) {
            throw new Error("invalidElReferenceException");
        }

        oThis._preInit(params);
        oThis._buildDOM();
        oThis._init();
    }

    Game.prototype = {
        constructor: Game,

        _preInit: function(params) {
            var oThis = this;

            oThis.config = $.extend(true, {}, defaults, params);
        },

        _buildDOM: function() {
        },

        _init: function() {
            var oThis = this,
                config = oThis.config;

            oThis.oSnakeBoard = new comp.GameBoard(config.gameBoard);
            oThis.oScoreBoard = new comp.ScoreCard(config.scoreCard);
        }
    };

    Game.directions = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3
    };

    comp.Game = Game;
})(window, CK12.components, jQuery);