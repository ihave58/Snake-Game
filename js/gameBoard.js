(function(window, comp, $, undefined) {
    "use strict";

    var defaults = {
            cellSize: 10
        },
        const_InitialStartDistance = 2;

    function GameBoard(params) {
        var oThis = this;

        if(params.el === undefined) {
            throw new Error("invalidElReferenceException");
        }

        oThis._preInit(params);
        oThis._buildDOM();
        oThis._init();
    }

    GameBoard.prototype = {
        constructor: GameBoard,

        _preInit: function(params) {
            var oThis = this,
                config;

            config = oThis.config = $.extend(true, {}, defaults, params);
            oThis.el = config.el;
            oThis.entities = [];
        },

        _buildDOM: function() {
        },

        _init: function() {
            var oThis = this,
                config = oThis.config,
                snakeLength = 1;

            oThis.oGrid = new comp.CanvasGrid({
                el: oThis.el,
                width: config.width,
                height: config.height,
                cellSize: config.cellSize
            });

            oThis.gemPosition = oThis.oGrid.getRandomBlock();

            oThis.oSnake = new comp.Snake({
                length: snakeLength,
                position: oThis.oGrid.getRandomBlock(oThis.height - (snakeLength + const_InitialStartDistance))
            });

            oThis.attachEntities(oThis.oSnake);
        },

        attachEntities: function(oEntity) {
            var oThis = this;

            oThis.entities.push(oEntity);
        },

        start: function() {

        },

        end: function() {

        }
    };

    comp.GameBoard = GameBoard;
})(window, CK12.components, jQuery);