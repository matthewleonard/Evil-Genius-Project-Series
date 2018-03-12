//This program creates a blinker that can be toggled with two switches
//Programmer: Matthew Leonard

var b = require('bonescript');

//IO Constants
var LEFT_BUTTON = 'P8_18';
var RIGHT_BUTTON = 'P8_19';
var LEFT_LIGHT = 'P9_42';
var RIGHT_LIGHT = 'P8_13';

//Global Variables
var brightness = 0.01;
var blinkerMode = LEFT_LIGHT;
var ramp = 1;

//Initiate Pin Modes
b.pinMode(LEFT_BUTTON, b.INPUT);
b.pinMode(RIGHT_BUTTON, b.INPUT);
b.pinMode(LEFT_LIGHT, b.OUTPUT);
b.pinMode(RIGHT_LIGHT, b.OUTPUT);

//Start - Schedules a looping call to a function.
setInterval(checkModeChange, 10);

//checkModeChange: checks which button is pushed and puts the leds
//in the proper blinker mode and writes to the board.
function checkModeChange() {
    b.digitalRead(LEFT_BUTTON, checkLeftButtonPushed);
    b.digitalRead(RIGHT_BUTTON, checkRightButtonPushed);
    calculateBrightness();
    if (blinkerMode == 'P8_13') {
        b.analogWrite('P9_42', 0.01);
    }
    if (blinkerMode == 'P9_42') {
        b.analogWrite('P8_13', 0.01);
    }
    b.analogWrite(blinkerMode, brightness);

}

//Checks if the left button was pushed.
function checkLeftButtonPushed(x) {
    if (x.value == 0) {
        console.log("Changing blinker mode to " + LEFT_LIGHT)
        blinkerMode = LEFT_LIGHT;
    }
}

//Checks if the right button is pushed.
function checkRightButtonPushed(x) {
    if (x.value == 0) {
        blinkerMode = RIGHT_LIGHT;
        console.log("Changing blinker mode to " + RIGHT_LIGHT)
    }
}

//Updates the brightness value to write
function calculateBrightness() {
    if (ramp == 1) {
        brightness = brightness + 0.1;
        if (brightness >= 0.9) {
            ramp = 0;
        }
    }
    else {
        brightness = brightness - 0.1;
        if (brightness <= 0.1) {
            ramp = 1;
        }
    }
}
