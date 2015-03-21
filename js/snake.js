(function(window, comp, $, undefined) {
    "use strict";

    var defaults = {
        length: 1,
        lengthToCellRatio: 3,
        startDirection: comp.Game.directions.Up,
        speed: 1
    };

    /*
     Represents a Snake.

     @class Snake
     @constructor
     @param {object} params - The configuration map for instantiating Snake.
     */
    function Snake(params) {
        var oThis = this;

        if(params.position === undefined) {
            throw new Error("invalidPositionValueException");
        }

        oThis._preInit(params);
        oThis._buildDOM();
        oThis._init();
    }

    /*
     Extending the prototype with the required functions.
     */
    Snake.prototype = {
        /*
         Rewriting the reference to the constructor,
         as we are overwriting the prototype of the class

         #Fix for instanceof on browsers < IE8
         */
        constructor: Snake,

        /*
         Deallocate your internal properties and variables here,
         so that the memory can be Garbage collected.

         The object reference for "this" cannot be GCed as "delete (this)",
         fails silently in all modern browsers.

         @destructor
         @method destroy
         @return {Boolean} Returns the success status.
         */
        destroy: function() {
            /*
             As we are ensuring, not to leak anything outside the Class,
             no need to run "delete (obj)" as Context will handle the memory deallocation automatically.
             */

            return true;
        },

        /*
         Mostly contains the initialization code of the constructor.

         @method preInitialize
         @return null
         */
        _preInit: function(params) {
            var oThis = this,
                config;

            config = oThis.config = $.extend(true, {}, defaults, params);

            oThis.snakeBodyVector = [];
            oThis.headPosition = config.position;
            oThis.direction = config.startDirection;
            oThis.length = config.length;
            oThis.size = (oThis.length * config.lengthToCellRatio);

            oThis.snakeBodyVector.push(
                {
                    row: oThis.headPosition.row - oThis.size,
                    col: oThis.headPosition.col
                },
                oThis.headPosition
            );
        },

        /*
         Provides the boiler plate initialization to the application.

         @method initialize
         @return null
         */
        _init: function() {
            var oThis = this;
        },

        /*
         Generates or References the actionable elements of the module DOM,
         to cache it at component instance for further use.

         #Hardcoding the contents in the HTML as of now, since the requirements are flexible.
         Alternatively, this function can be replaced by a client side templating engine.

         @privateMethod
         @return null
         */
        _buildDOM: function() {
        },

        _updateBodyVector: function() {
            var oThis = this;

            switch(oThis.direction) {
                case comp.Game.directions.Up:
                    oThis.headPosition.row -= 1;
                    break;

                case comp.Game.directions.Down:
                    oThis.headPosition.row += 1;
                    break;

                case comp.Game.directions.Left:
                    oThis.headPosition.col -= 1;
                    break;

                case comp.Game.directions.Right:
                    oThis.headPosition.col += 1;
                    break;
            }

            oThis.snakeBodyVector.push(oThis.headPosition);
        },

        draw: function(oCanvasGrid) {
            var oThis = this,
                edgeLength,
                headIndex = oThis.snakeBodyVector.length - 1,
                currentEdgeIndex = headIndex,
                currentEdge,
                nextEdge,
                parsedBlockLength = 0;

            while(parsedBlockLength < oThis.getSize()) {
                currentEdge = oThis.snakeBodyVector[currentEdgeIndex];
                nextEdge = oThis.snakeBodyVector[currentEdgeIndex - 1];

                edgeLength = oCanvasGrid.drawLine(currentEdge, nextEdge);

                currentEdgeIndex--;
                parsedBlockLength += edgeLength;
            }
        },

        /*
         Rotates the snake towards left

         @return {Boolean} Returns the success status.
         */
        turnLeft: function() {
            var oThis = this;

            oThis.direction = comp.Game.directions.Left;
            return true;
        },

        /*
         Rotates the snake by 90 degree to the clockwise direction, relative to the current direction.

         @return {Boolean} Returns the success status.
         */
        turnRight: function() {
            var oThis = this;

            oThis.direction = comp.Game.directions.Right;
            return true;
        },

        /*
         Rotates the snake towards up

         @return {Boolean} Returns the success status.
         */
        turnUp: function() {
            var oThis = this;

            oThis.direction = comp.Game.directions.Up;
            return true;
        },

        /*
         Rotates the snake towards down

         @return {Boolean} Returns the success status.
         */
        turnDown: function() {
            var oThis = this;

            oThis.direction = comp.Game.directions.Down;
            return true;
        },

        /*
         Keep moving the snake in the current direction

         @return {Boolean} Returns the success status.
         */
        move: function() {
            var oThis = this;

            oThis._updateBodyVector();
            return true;
        },

        /*
         Stops moving the snake

         @return {Boolean} Returns the success status.
         */
        stop: function() {
            return true;
        },

        getSize: function() {
            var oThis = this;

            return oThis.size;
        }
    };

    comp.Snake = Snake;
})(window, CK12.components, jQuery);