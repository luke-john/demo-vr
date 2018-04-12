const path = require('path');
var svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  process(src: string, filePath: string) {
    // we can probably be smarter than this :)
    const imageKind = filePath.substr(filePath.length - 3);

    switch (imageKind) {
      case 'svg':
        return `module.exports = "${svgToMiniDataURI(src)}"`;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return `module.exports = "data:image/${imageKind};${btoa(src)}"`;
    }

    return `module.exports = "${filePath}"`;
  },
};
