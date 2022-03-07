
const calculateKeyLength = require('./calculateKeyLength')
const findKey = require('./findKey')
const { letters, caesar, toLetterIndex } = require('./utils')

const decode = (input, key) =>
    input.split("").reduce(([idx, result], c) => {
        if (!/[A-Z]/.test(c)) {
            // maintain any non-letter characters
            return [idx, result + c]
        }
        const shift = toLetterIndex(key[idx % key.length])
        const letter = toLetterIndex(c)
        return [++idx, result + caesar(letters, shift)[letter]]
    }, [0, ""])[1]

module.exports = (input) => {
    const text = input.replace(/[\s|\W]+/g, "").split("")
    const keyLength = calculateKeyLength(text)
    const key = findKey(text, keyLength)

    return decode(input, key)
}
