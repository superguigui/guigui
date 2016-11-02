function toFixed(number, precision) {
  var power = Math.pow(10, precision);
  return (Math.round(number * power) / power).toFixed(precision);
}

module.exports = function(number, format) {
  var precision = format.split('.')[1];
  return toFixed(number, precision ? precision.length : 0);
};
