/*jslint node:true*/
/*global morsejs, morsejsRenderWebAudio, describe, it, xit, expect, pending, fail*/

"use strict";

describe("Test WebAudio plaing", function () {
    it("Checks the returned signal time for audio", function () {
        // Test short signal
        expect(morsejsRenderWebAudio.getSignalTime(morsejs.signal.SHORT))
            .toEqual(morsejsRenderWebAudio.DURATION_SHORT);

        // Test long signal
        expect(morsejsRenderWebAudio.getSignalTime(morsejs.signal.LONG))
            .toEqual(morsejsRenderWebAudio.DURATION_LONG);

        // Test padding signal
        expect(morsejsRenderWebAudio.getSignalTime(morsejs.signal.PADD))
            .toEqual(morsejsRenderWebAudio.DURATION_LONG);
    });

    it("Checks the returned signal strength for audio", function () {
        // Test short signal
        expect(morsejsRenderWebAudio.getSignalStrength(morsejs.signal.SHORT))
            .toEqual(morsejsRenderWebAudio.SIGNAL_STRENGTH_ON);

        // Test long signal
        expect(morsejsRenderWebAudio.getSignalStrength(morsejs.signal.LONG))
            .toEqual(morsejsRenderWebAudio.SIGNAL_STRENGTH_ON);

        // Test padding signal
        expect(morsejsRenderWebAudio.getSignalStrength(morsejs.signal.PADD))
            .toEqual(morsejsRenderWebAudio.SIGNAL_STRENGTH_OFF);
    });

    it("Checks the message transmission for audio", function () {
        pending();
        fail("To be implemented");
    });

    it("Checks playing a morse message through WebAudio", function () {
        pending();
        fail("To be implemented");
    });
});