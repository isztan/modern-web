function setCSS(el, styles) {
    for (var attr in styles) if (styles.hasOwnProperty(attr)) {
        el.style[attr] = styles[attr];
    }
}