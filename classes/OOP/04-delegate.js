function handleMultiValueClick(ev) {

    // check if the add button was clicked
    if (/\badd\b/.test(ev.target.className)) {

        // prevent navigation
        ev.preventDefault();

        // find the parent <li> element and its list parent
        var lastLi = closest(ev.target, 'li'),
            list = lastLi.parentNode;

        // create a new list item and input element
        var newLi = document.createElement('li');
        newLi.innerHTML += '<input />';
        list.insertBefore(newLi, lastLi);

    }

}

// Keeps walking up the DOM hierarchy from `el` until it reaches
// an element matching the node name specified. If the current
// element already matches the tagType, returns that element.
function closest(el, tagType) {
    while (el.nodeName != tagType.toUpperCase()) {
        el = el.parentNode;
    }
    return el;
}

function closestFilter(el, filter) {
    while (!filter(el)) {
        el = el.parentNode;
    }
    return el;
}