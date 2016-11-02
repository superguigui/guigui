var themes = {
  light: {
    backgroundMainColor: '#fafafa',
    backgroundDarkColor: '#eef0f1',
    labelBackgroundColor: '#eef0f1',
    fieldBackgroundColor: '#eef0f1',
    shadowColor: '#eef0f1',
    lightColor: '#FFFFFF',
    borderColor: '#eef0f1',
    textMainColor: '#90a4ae',
    textHighlightColor: '#80cbc4',
    textSecondaryColor: '#90a4ae',
    highlightColor: '#80cbc4',
    primaryValidColor: '#80cbc4',
    secondaryValidColor: '#80cbc4'
  },
  dark: {
    backgroundMainColor: '#292c33',
    backgroundDarkColor: '#22252b',
    labelBackgroundColor: '#30343c',
    fieldBackgroundColor: '#22252b',
    shadowColor: '#1d1f24',
    lightColor: '#36383f',
    borderColor: '#1d1f24',
    textMainColor: '#BBBDC0',
    textHighlightColor: '#6490cf',
    textSecondaryColor: '#6b6b6b',
    highlightColor: '#3d77eb',
    primaryValidColor: '#3d77eb',
    secondaryValidColor: '#00d2da'
  }
};

module.exports = {
  theme: 'dark',
  dark: themes.dark,
  light: themes.light
};
