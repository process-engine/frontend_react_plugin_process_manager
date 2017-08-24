export const applyTheme = (name) => {
    let themeName = (name || 'Default');
    
    if (themeName !== 'Default' && themeName.indexOf('.') === -1) {
        themeName = 'Default.' + themeName;
    }
    
    let mainThemeName = themeName;
    let section = null;
    let context = null;

    if (themeName && themeName.indexOf('.') !== -1) {
        mainThemeName = themeName.split('.')[0];
        section = themeName.split('.')[1];

        if (section && section.indexOf(':') !== -1) {
            context = section.split(':')[1];
            section = section.split(':')[0];
        }
    }
    
    const themeObj = require('../theme/' + mainThemeName + '/theme');
    themeObj.themeSection = section;
    themeObj.themeContext = context;
    return Object.assign({}, themeObj);
};
