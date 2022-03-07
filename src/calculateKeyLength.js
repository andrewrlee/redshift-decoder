const { arraysEqual, cartesianProduct, greatestCommonFactor, mode, windows } = require('./utils')

module.exports = (characters) => {
    const trigrams = windows(3, characters)
    const commonDifferencesBetweenOccurences = trigrams
        // Convert each trigram into an array of all of the indexes where it starts across entire text 
        .map(i => trigrams.flatMap((j, k) => arraysEqual(j, i) ? [k] : []))
        // Remove trigrams that only appear once
        .filter(i => i.length > 1)
        // Find greatest common divisor of length between appearances
        .map(arr => windows(2, arr).map(([a, b]) => Math.abs(a - b)).reduce(greatestCommonFactor))
        // Remove cases where there is no apparent pattern (no common difference size)
        .filter(i => i !== 1)

    // At this point there maybe some noise where some differences exist that don't fit the pattern.
    // To remove these we look for common factors across the differences and remove cases where they don't fit.

    // find common factor across common differences 
    const commonFactor = cartesianProduct(commonDifferencesBetweenOccurences).map(([a, b]) => greatestCommonFactor(a, b))
        // remove outliers that don't share significant common divisor
        .filter(i => i !== 1)

    // return most common difference between appearance
    return mode(commonFactor)
}

