module.exports = function toPrecision(number, step) {
    return Math.round(number / step) * step;
};