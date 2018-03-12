//This program is a "hello world" type program for the beaglebone black.
//Code obtained from 30 BeagleBone Black Projects for the EVIL GENIUS by Christoper Rush
var b = require('bonescript');
var led = "USR3";

b.pinMode(led, b.OUTPUT);

var state = b.LOW;

b.digitalWrite(led, state);

setInterval(toggle, 1000);

function toggle() {
    if(state == b.LOW){
        state = b.HIGH;
        console.log("turning LED on.")
    }
    else{
        state = b.LOW;
        console.log("turning LED off.")
    }
    b.digitalWrite(led, state);
}