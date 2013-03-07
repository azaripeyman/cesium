/*global define*/
define(['../Core/DeveloperError'], function(DeveloperError) {
    "use strict";

    /**
     * Represents a command to the renderer for clearing.
     *
     * @alias ClearCommand
     * @constructor
     *
     * @param {ClearState} [clearState] The clear state.
     */
    var ClearCommand = function(clearState) {
        /**
         * The clear state.  If this property is undefined, a default clear state is used.
         * @type Object
         */
        this.clearState = clearState;

        /**
         * The framebuffer to clear.
         * @type Framebuffer
         */
        this.framebuffer = undefined;

        /**
         * TODO
         *
         * @type Object
         */
        this.owner = undefined;
    };

    /**
     * Executes the clear command.
     *
     * @memberof ClearCommand
     *
     * @param {Context} context The renderer context in which to clear.
     * @param {Framebuffer} [framebuffer] The framebuffer to clear if one is not specified by the command.
     */
    ClearCommand.prototype.execute = function(context, framebuffer) {
        context.clear(this, framebuffer);
    };

    return ClearCommand;
});