const fs = require("fs");

let notes = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .replaceAll("|\n", "|")
  .split("\n")
  .map((note) => {
      return {
          signal: note.split("|")[0].trim().split(" ").map(digit => sortStringAlphabetically(digit)),
          output: note.split("|")[1].trim().split(" ").map(digit => sortStringAlphabetically(digit)),
      }
  })

function sortStringAlphabetically(string) {
    return string.split('').sort().join('')
}


/* Part 1 */
count = 0;

for (let i = 0; i < notes.length; i++) {
    let out = notes[i].output
    for (let j = 0; j < out.length; j++) {
        let len = out[j].length
    if (len === 2 || len === 3 || len === 4 || len === 7) {
        count += 1
    }
    }
}


console.log(count)

/* Part 2 */

function findEasy(inputArray) {
    let one, four, seven, eight
    for (let i = 0; i < inputArray.length; i++) {
        let len = inputArray[i].length
        if (len === 2) {
            one = inputArray[i]
        } else if (len === 3) {
            seven = inputArray[i]
        } else if (len === 4) {
            four = inputArray[i]
        } else if (len === 7) {
            eight = inputArray[i]
        }
    }
    return [one, four, seven, eight]
}

function findUnknownDigits(inputArray, targetLen) {
    let digitArray = []
    for (let i = 0; i < inputArray.length; i++) {
        let len = inputArray[i].length
        if (len === targetLen) {
            if (!digitArray.includes(inputArray[i])){
                digitArray.push(inputArray[i])
            }
        } 
    }
    return digitArray
}

function digitContainsArray(digitString, segmentArray) {
    for (let i = 0; i < segmentArray.length; i++) {
        if (!digitString.includes(segmentArray[i])) {
            return false
        }
    }
    return true
}



function findDigitSix(digitArray, one) {
    let oneArray = one.split('')
    let six, c, f
    for (let i = 0; i < digitArray.length; i++) {
        if (!(digitContainsArray(digitArray[i], oneArray))) {
            six = digitArray[i]
        }
    }
    if (six.includes(oneArray[0])) {
        [f, c] = oneArray
    } else {
        [c, f] = oneArray
    }
    return [six, c, f]
}

function findDigitFive(digitArray, c) {
    let five
    for (let i = 0; i < digitArray.length; i++) {
        if (!digitArray[i].includes(c)){
            five = digitArray[i]
        }
    }
    return five
}

function findDigitZeroNine(zeroNineArray, four) {
    let fourArray = four.split('')
    let zero, nine
    if (digitContainsArray(zeroNineArray[0],fourArray)) {
            nine = zeroNineArray[0]
            zero = zeroNineArray[1]
    } else {
        nine = zeroNineArray[1]
        zero = zeroNineArray[0]
    }
    return [zero, nine]
}

function findDigitTwoThree(twoThreeArray, f) {
    let two, three
    if (twoThreeArray[0].includes(f)){
        three = twoThreeArray[0]
        two = twoThreeArray[1]
    } else {
        three = twoThreeArray[1]
        two = twoThreeArray[0]
    }
    return [two, three]
}

function getDigitsFromSignal(signal) {
    let digitObj = {}
    let zero, one, two, three, four, five, six, seven, eight, nine
    let c, f
    // Find digits 1, 4, 7 and 8
    let digitarray = findEasy(signal)
    one = digitarray[0]
    four = digitarray[1]
    seven = digitarray[2]
    eight = digitarray[3]

    // find digit 6 and segments c and f
    const unordered069 = findUnknownDigits(signal, 6)
    const digit6segmentcf = findDigitSix(unordered069, one)
    six = digit6segmentcf[0]
    c = digit6segmentcf[1]
    f = digit6segmentcf[2]

    // Find digit 0 and 9
    const unordered09 = unordered069.filter(digitString => digitString !== six)
    const digit09 = findDigitZeroNine(unordered09, four)
    zero = digit09[0]
    nine = digit09[1]

    // Find digit 5
    const unordered235 = findUnknownDigits(signal, 5)
    five = findDigitFive(unordered235, c)

    // Find digit 2 and 3
    const unordered23 = unordered235.filter(digitString => digitString !== five)
    const digit23 = findDigitTwoThree(unordered23, f)
    two = digit23[0]
    three = digit23[1]

    digitObj[zero] = 0
    digitObj[one] = 1
    digitObj[two] = 2
    digitObj[three] = 3
    digitObj[four] = 4
    digitObj[five] = 5
    digitObj[six] = 6
    digitObj[seven] = 7
    digitObj[eight] = 8
    digitObj[nine] = 9

    return digitObj
}



function decypherOutput(outputArray, digits) {
    let outputDigits = []
    for (let i = 0; i < outputArray.length; i++) {
        outputDigits.push(digits[outputArray[i]])
    }
    return parseInt(outputDigits.join(''))
}

function decypherSignal(notes) {
    let sum = 0;
    for (let i = 0; i < notes.length; i++) {
        let digits = getDigitsFromSignal(notes[i].signal)
        let decyheredOutput = decypherOutput(notes[i].output, digits)
        sum += decyheredOutput
    }
    console.log(sum)   
}

decypherSignal(notes)