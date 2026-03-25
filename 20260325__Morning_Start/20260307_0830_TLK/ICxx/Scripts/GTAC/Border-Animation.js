// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.59/runtimes/native1.12-tchmi/TcHmi.d.ts" />


// Fun Script to add a 'bit' zing to a boarder. 
// Created - 20250912, r.jones


// A global object to hold our animation intervals so we can stop them later if needed
var borderAnimationIntervals = {};

/**
 * Starts a rainbow border animation on a TcHmi control by directly setting its border color.
 * @param {string} controlId The ID of the control to animate (e.g., 'TcHmiButton_63').
 */
function startBorderAnimation(controlId) {
    var control = TcHmi.Controls.get(controlId);

    if (!control) {
        console.error('Border Animation: Control with ID "' + controlId + '" not found.');
        return;
    }

    // Verify that the control has the 'setBorderColor' function before we try to call it
    if (typeof control.setBorderColor !== 'function') {
        console.error('Border Animation: The control "' + controlId + '" does not have a setBorderColor method and cannot be animated this way.');
        return;
    }

    // Stop any existing animation on this control before starting a new one
    if (borderAnimationIntervals[controlId]) {
        clearInterval(borderAnimationIntervals[controlId]);
    }

    var hue = 0;
    var intervalId = setInterval(function () {
        // Cycle through the hue values (0-360) to create a rainbow effect
        hue = (hue + 5) % 360;

        // TcHmi expects colors to be passed as an object
        var newColor = {
            'color': 'hsl(' + hue + ', 100%, 50%)'
        };

        // Use the control's own API to set the border color
        control.setBorderColor(newColor);

    }, 50); // Update the color every 50ms

    // Store the interval ID so we can stop the animation later if needed
    borderAnimationIntervals[controlId] = intervalId;
}

/**
 * Stops the rainbow border animation on a TcHmi control.
 * @param {string} controlId The ID of the control.
 */
function stopBorderAnimation(controlId) {
    if (borderAnimationIntervals[controlId]) {
        clearInterval(borderAnimationIntervals[controlId]);
        delete borderAnimationIntervals[controlId];
    }
}