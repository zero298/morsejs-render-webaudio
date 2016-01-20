/*jslint node:true browser:true */
/*global define, module, AudioContext */

// Support UMD
(function (root, factory) {
    "use strict";

    /*istanbul ignore next*/
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["morsejs"], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node but not strict CommonJS
        module.exports = factory(require("morsejs"));
    } else {
        // Browser
        root.morsejsRenderWebAudio = factory(root.morsejs);
    }
}(this, function (morsejs) {
    "use strict";

    // Predefine our vars
    var exports,
        DURATION_LONG,
        DURATION_SHORT,
        SIGNAL_STRENGTH_OFF,
        SIGNAL_STRENGTH_ON;

    /**
     * Morse code WebAudio rendering module
     * @module morsejs-render-webaudio
     */
    exports = {};

    /**
     * The length of time a long signal lasts
     * @memberof module:morsejs-render-webaudio
     * @constant
     * @type {Number}
     * @default
     */
    DURATION_LONG = 100;
    /**
     * The length of time a short signal lasts
     * @memberof module:morsejs-render-webaudio
     * @constant
     * @type {Number}
     * @default
     */
    DURATION_SHORT = 50;
    /**
     * The frequency of the signal while off
     * @memberof module:morsejs-render-webaudio
     * @constant
     * @type {Number}
     * @default
     */
    SIGNAL_STRENGTH_OFF = 0;
    /**
     * The frequency of the signal while on
     * @memberof module:morsejs-render-webaudio
     * @constant
     * @type {Number}
     * @default
     */
    SIGNAL_STRENGTH_ON = 500;

    /**
     * Function figure out how long a signal should play
     * @memberof module:morsejs-render-webaudio
     * @param {Number} signal The signal to find the duration of
     * @returns {Number} The duration of the signal given
     */
    function getSignalTime(signal) {
        var timeDuration = 0;

        switch (signal) {
        case morsejs.signal.SHORT:
            timeDuration = DURATION_SHORT;
            break;
        default:
            timeDuration = DURATION_LONG;
            break;
        }
        return timeDuration;
    }

    /**
     * Function to determine the strength of a signal
     * @memberof module:morsejs-render-webaudio
     * @param {Number} signal The signal to find the strength of
     * @returns {Number} The frequency strength of the signal given
     */
    function getSignalStrength(signal) {
        var strength = SIGNAL_STRENGTH_OFF;
        switch (signal) {
        case morsejs.signal.SHORT:
        case morsejs.signal.LONG:
            strength = SIGNAL_STRENGTH_ON;
            break;
        default:
            break;
        }
        return strength;
    }

    /**
     * Recursive function to play a message over WebAudio
     * @memberof module:morsejs-render-webaudio
     * @param {String} message The message to play
     * @param {Number} index The index of the signal within the message to play
     * @param {OscillatorNode} oscillator The oscilator used to play the message
     */
    function transmitMessage(message, index, oscillator) {
        var signal = message[index];

        oscillator.frequency.value = getSignalStrength(signal);
        setTimeout(function () {
            if (index < message.length) {
                transmitMessage(message, (index + 1), oscillator);
                index += 1;
            } else {
                oscillator.stop();
            }
        }, getSignalTime(signal));
    }

    /**
     * Function to play a morse message over WebAudio
     * @memberof module:morsejs-render-webaudio
     * @param {AudioContext} actx The WebAudio context
     * @param {String} message The message to play
     */
    function playMorse(actx, message) {
        var mIndex, osc;

        // Set our message index
        mIndex = 0;

        // Create a sound and start it
        osc = actx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = SIGNAL_STRENGTH_OFF;
        osc.connect(actx.destination);
        osc.start();

        // Start the transmission
        transmitMessage(message, mIndex, osc);
    }

    // Export stuff
    exports.DURATION_LONG = DURATION_LONG;
    exports.DURATION_SHORT = DURATION_SHORT;
    exports.SIGNAL_STRENGTH_OFF = SIGNAL_STRENGTH_OFF;
    exports.SIGNAL_STRENGTH_ON = SIGNAL_STRENGTH_ON;
    exports.getSignalTime = getSignalTime;
    exports.getSignalStrength = getSignalStrength;
    exports.transmitMessage = transmitMessage;
    exports.playMorse = playMorse;

    // Return our module
    return exports;
}));