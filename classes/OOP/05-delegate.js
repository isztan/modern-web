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

    // keeps walking up the DOM hierarchy from `el` until it reaches
    // an element matching the node name specified
    function closest(el, tagType) {
        while (el.nodeName != tagType.toUpperCase()) {
            el = el.parentNode;
        }
        return el;
    }
}