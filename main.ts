input.onButtonPressed(Button.A, function () {
    if (stemmeUrneÅpen == true) {
        radio.sendString("ja")
        stemmeUrneÅpen = false
        mhm_ok("J")
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
    }
})
function mhm_ok (text: string) {
    list.push(text)
}
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
 * 
 * .
 * 
 * ... og noen ser ut til å ha programmert inn en sårbarhet i stemmegivningen.
 */
radio.onReceivedString(function (receivedString) {
    if (receivedString == "start") {
        stemmeUrneÅpen = true
        basic.showString("?")
    } else if (receivedString == "stopp" && stemmeUrneÅpen == true) {
        stemmeUrneÅpen = false
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
        mhm_ok("?")
    } else if (receivedString == "hack") {
        hack()
    }
})
input.onButtonPressed(Button.B, function () {
    if (stemmeUrneÅpen == true) {
        radio.sendString("nei")
        stemmeUrneÅpen = false
        mhm_ok("N")
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
    }
})
function hack () {
    for (let index = 0; index <= list.length - 1; index++) {
        basic.showString("" + convertToText(index + 1) + "=" + list[index])
        basic.clearScreen()
        basic.pause(400)
    }
}
let list: string[] = []
let stemmeUrneÅpen = false
radio.setGroup(1)
basic.showIcon(IconNames.Happy)
stemmeUrneÅpen = false
// Denne blokken ser helt uskyldig ut, ikke sant?
list = []
