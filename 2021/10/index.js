const fs = require("fs");

let lines = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split('\n')
  .map(line => line.split(''))
  
let opening = ['(', '[', '{', '<']

const findCorrupt = (lines) => {
    let open = []
    let corrupt = []
    for (let j = 0; j < lines.length; j++) {
        let line = lines[j]
        for (let i = 0; i < line.length; i++) {
            let char = line[i]
            if (opening.includes(char)) {
                open.push(char)
            } else {
                last = open.pop()
                if (last === '(' && char !== ')') {
                    corrupt.push(char)
                } else if (last === '[' && char !== ']') {
                    corrupt.push(char)
                } else if (last === '{' && char !== '}') {
                    corrupt.push(char)
                } else if (last === '<' && char !== '>') {
                    corrupt.push(char)
                }
            }
            
        }
        
    }
    return corrupt
}

const isCorrupt = (line) => {
    open = []
    let isCorrupt = false
    for (let i = 0; i < line.length; i++) {
        let char = line[i]
        if (opening.includes(char)) {
            open.push(char)
        } else {
            last = open.pop()
            if (last === '(' && char !== ')') {
                isCorrupt = true
                break
            } else if (last === '[' && char !== ']') {
                isCorrupt = true
                break
            } else if (last === '{' && char !== '}') {
                isCorrupt = true
                break
            } else if (last === '<' && char !== '>') {
                isCorrupt = true
                break
            }
        }
    }
    return isCorrupt
}

const sumError = (corrupt)  => {
    let sum = 0
    for (let i = 0; i < corrupt.length; i++) {
        if (corrupt[i] === ')') {
            sum += 3
        } else if (corrupt[i] === ']') {
            sum += 57
        } else if (corrupt[i] === '}') {
            sum += 1197
        } else if (corrupt[i] === '>') {
            sum += 25137
        }
    }
    return sum
}

const solve1 = (lines) => {
    const corruptChars = findCorrupt(lines)
    const errorSum = sumError(corruptChars)
    return errorSum
}

console.log(solve1(lines))

const getUnclosed = (line) => {
    let open = []
    for (let i = 0; i < line.length; i++) {
        let char = line[i]
        if (opening.includes(char)) {
            open.push(char)
        } else {
            open.pop()
        }
    }
    return open
}

const getIncomplete = (lines) => {
    let incomplete = []
    for (let i = 0; i < lines.length; i++) {
        line = lines[i]
        if (!isCorrupt(line)) {
            incomplete.push(getUnclosed(line))
        }
        
    }
    return incomplete
}

const autoCompleteSumCalc = (incomplete) => {
    sumDict = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
    }
    let sum = 0
    rev = incomplete.reverse()
    for (let i = 0; i < rev.length; i++) {
        sum *= 5
        sum += sumDict[rev[i]]
    }
    return sum
}

const autoCompleteSumsCalc = (incompleteList) => {
    sums = []
    for (let i = 0; i < incompleteList.length; i++) {
        sums.push(autoCompleteSumCalc(incompleteList[i]))
    }
    return sums
}

const solve2 = (lines) => {
    const incompleteLines = getIncomplete(lines)
    const autoCompleteSums = autoCompleteSumsCalc(incompleteLines)
    const sortedSums = autoCompleteSums.sort((a, b) => a - b)
    const idx = Math.ceil(sortedSums.length/2)
    return sortedSums[idx-1]
}

console.log(solve2(lines))