function handleMultiValueClick(ev) {

    // check if the add button was clicked
    if (/\badd\b/.test(ev.target.className)) {

        // prevent navigation
        ev.preventDefault();

        // find the last <li> element; assuming it is the one
        // containing the button
        var lastLi = ev.target.parentNode;

        // create a new list item and input element
        var newLi = document.createElement('li');
        newLi.insertBefore(lastLi);
        newLi.innerHTML = '<input />';

    }
}