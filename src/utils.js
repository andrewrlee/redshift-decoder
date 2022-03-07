// ([a, b], [a, b]) => true, ([a, b], [a, b, c]) => false, ([a, b], [c, b]) => true, 
const arraysEqual = (as, bs) => as.length === bs.length && as.every((a, i) => a === bs[i])

// [a, b, c] => [[a, b], [a, c], [b, c]]
const cartesianProduct = (as) => as.flatMap((a, i) => as.slice(i + 1).map(b => [a, b]))

// (9, 3) => 3, (12, 13) => 1
const greatestCommonFactor = (a, b) => (b === 0) ? a : greatestCommonFactor(b, a % b);

// ([a, b, c, d, e, f], 2) => [b, d, f]
const everyNth = (as, n) => as.filter((_, i) => i % n === 0)

// ('A') => 0, ('Z') => 24
const toLetterIndex = (c) => c.charCodeAt(0) - 65

// A - Z
const letters = Array.from(Array(26)).map((_, i) => i + 65).map((c) => String.fromCharCode(c));

// ([a, a, b, b, a]) => a 
const mode = as =>
    Object.values(
        as.reduce((count, e) => {
            if (!(e in count)) {
                count[e] = [0, e];
            }
            count[e][0]++;
            return count;
        }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
;

// ([a, b, c, d, e, f, g], 3) => [[a, b, c], [d, e, f], [g]] 
const windows = (l, xs, i = 0, out = []) =>
    i > xs.length - l
        ? out
        : windows(l, xs, i + 1, [...out, xs.slice(i, i + l)]);

// (5) => [1, 2, 3, 4, 5]
const range = (items) => [...Array(items).keys()];

const englishLetterFrequencies = [0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772,
    0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978,
    0.02360, 0.00150, 0.01974, 0.00074];

// http://practicalcryptography.com/cryptanalysis/text-characterisation/chi-squared-statistic/
const chiSquared = (text) => {
    const counts = new Array(26).fill(0);
    range(text.length).forEach(i => counts[toLetterIndex(text[i])]++)

    return range(26).reduce((acc, i) => {
        const expectedAmount = text.length * englishLetterFrequencies[i]
        return acc + Math.pow((counts[i] - expectedAmount), 2) / expectedAmount;
    }, 0)
}

// ([a, b, y, z], 2) => [c, d, a, b]  
const caesar = (arr, i) => arr.map(c => {
    let a = c.charCodeAt(0)
    range(i).forEach((_) => a = (a + 1 > 90) ? 65 : a + 1)
    return String.fromCharCode(a)
})


module.exports = { arraysEqual, cartesianProduct, greatestCommonFactor, everyNth, mode, windows, range, chiSquared, letters, caesar, toLetterIndex }
