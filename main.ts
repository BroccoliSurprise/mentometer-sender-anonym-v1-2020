input.onButtonPressed(Button.A, function () {
    if (stemmeUrneÅpen == true) {
        radio.sendString("ja")
        stemmeUrneÅpen = false
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
    }
})
/**
 * Dette er programmet til mentometer-senderen!
 * 
 * Trykk A for å stemme JA eller B for å stemme NEI.
 * 
 * For å forhindre valgjuks, går det kun an å stemme når mentometer-mottakeren har sendt startsignal, og man får kun avgi 1 stemme. 
 * 
 * Dette styres ved at micro:biten kun kjører kommandoene på A og B-knappene når "valgUrneÅpen"-variabelen er TRUE (når microbiten mottar "start"-signalet fra en annen micro:bit.)
 * 
 * Etter at stemme har blitt avgitt, settes denne tilbake til FALSE.
 */
radio.onReceivedString(function (receivedString) {
    if (receivedString == "start") {
        stemmeUrneÅpen = true
        basic.showString("?")
    } else if (receivedString == "stopp") {
        stemmeUrneÅpen = false
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
    }
})
input.onButtonPressed(Button.B, function () {
    if (stemmeUrneÅpen == true) {
        radio.sendString("nei")
        stemmeUrneÅpen = false
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
    }
})
let stemmeUrneÅpen = false
radio.setGroup(1)
basic.showIcon(IconNames.Happy)
stemmeUrneÅpen = false
