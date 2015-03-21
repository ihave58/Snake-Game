(function(window, comp, $, undefined) {
    "use strict";

    var defaults = {
            gridLineColor: "#f2f2f2",
            gridLineWidth: 0.5,
            cellSize: 10
        },
        const_AntiAliasingPixelFix = 0.5;

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomBlock(oCanvasGrid, rowFilter, colFilter) {
        return {
            row: rowFilter || getRandomNumber(0, oCanvasGrid.height),
            col: colFilter || getRandomNumber(0, oCanvasGrid.width)
        };
    }

    function CanvasGrid(params) {
        var oThis = this;

        if((params.width === undefined) || (params.height === undefined)) {
            throw new Error("invalidRowOrColumnException");
        }

        oThis._preInit(params);
        oThis._buildDOM();
        oThis.init();
    }

    CanvasGrid.prototype = {
        constructor: CanvasGrid,

        _preInit: function(params) {
            var oThis = this,
                config;

            config = oThis.config = $.extend(true, {}, defaults, params);

            oThis.el = config.el;
            oThis.width = config.width;
            oThis.height = config.height;
        },

        _buildDOM: function() {
            var oThis = this,
                config = oThis.config;

            oThis.canvas = $("<canvas></canvas>").attr({
                width: oThis.width,
                height: oThis.height
            });

            oThis.context = oThis.canvas.get(0).getContext("2d");
            oThis.drawGrid(oThis.context, config.width, config.height, config.cellSize);

            oThis.el.append(oThis.canvas);
        },

        drawGrid: function(context, width, height, cellSize) {
            var oThis = this,
                config = oThis.config,
                cPosition;

            for(cPosition = const_AntiAliasingPixelFix; cPosition <= (width + const_AntiAliasingPixelFix); cPosition += cellSize) {
                context.moveTo(cPosition, 0);
                context.lineTo(cPosition, height);
            }

            for(cPosition = const_AntiAliasingPixelFix; cPosition <= (height + const_AntiAliasingPixelFix); cPosition += cellSize) {
                context.moveTo(0, cPosition);
                context.lineTo(width, cPosition);
            }

            context.lineWidth = config.gridLineWidth;
            context.strokeStyle = config.gridLineColor;
            context.stroke();
        },

        drawLine: function(startBlockPosition, endBlockPosition) {
            var oThis = this;


        },

        init: function() {
            //To be Implemented
        },

        clear: function() {
            //To be Implemented
        },

        getRandomBlock: function(rowFilter, colFilter) {
            var oThis = this;

            return getRandomBlock(oThis, rowFilter, colFilter);
        }
    };

    comp.CanvasGrid = CanvasGrid;
})(window, CK12.components, jQuery);