var variablesThemes = require('./variables');

module.exports = function() {
  var variables = variablesThemes[variablesThemes.theme];
  return {
    shadow: {
      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.06)',
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))',
      border: '1px solid ' + variables.borderColor
    },
    label: {
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontStyle: 'italic',
      padding: '0 5px',
      userSelect: 'none'
    },
    input: {
      margin: '0',
      border: '0',
      padding: '0',
      display: 'inline-block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      lineHeight: '1',
      boxSizing: 'content-box',
      outline: '0'
    }
  };
};
