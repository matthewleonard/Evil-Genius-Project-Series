//This program creates a blinker that can be toggled with two switches

var b = require('bonescript');
var awValue = 0.01;
var awDirection = 1;
var awPin = "P8_13";

b.pinMode(awPin, b.OUTPUT);
b.pinMode("P8_19", b.INPUT);
b.pinMode("P8_18", b.INPUT);
setInterval(check, 100);

function check() {
    console.log("brightness: " + awValue * 100 + '%');
    b.digitalRead('P8_19', checkButton)
    b.digitalRead('P8_18', checkButton2);
}

function checkButton(x) {
    if (x.value == 0) {
        console.log("Button 1 Pushed: " + x.value);
        awValue = awValue +
            (awDirection * 0.1);
        if (awValue > 1) {
            awValue = 1 + (-1 * 0.1);
        }
    }
    b.analogWrite(awPin, awValue);
}

function checkButton2(x) {
    if (x.value == 0) {
        console.log("Button 2 Pushed: " + x.value);
        awValue = awValue + (-1 * 0.1);
        if (awValue <= 0.01) {
            awValue = 0 + (1 * 0.01);
        }
        // awValue = awValue + (awDirection * .01);
    }
    b.analogWrite(awPin, awValue);
}
