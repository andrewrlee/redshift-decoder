const { everyNth, range, chiSquared, letters, caesar } = require('./utils')

const findCharacterOfKey = (characters, keyLength, position) => {
    // split phrase into a slice of just the characters that would be encoded by a single character of the key 
    const charsInPosition = everyNth(characters.slice(position), keyLength)
    // try every shifting each letter of that slice by each letter and find lowest chi^2 to see which most matches english language distribution
    return range(25).reduce((prevResult, c) => {
        const [minChiScore] = prevResult
        const thisResult = chiSquared(caesar(charsInPosition, c))
        return (minChiScore > thisResult) ? [thisResult, c] : prevResult
    }, [Infinity, undefined])[1]
}

module.exports = (text, keyLength) => range(keyLength)
    .map(i => findCharacterOfKey(text, keyLength, i))
    .map(i => letters[i])
