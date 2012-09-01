function DynamicList(list) {
    if (!list.jquery)
        list = $(list);

    this.$list = list;
    // we pass in a pointer to `this` so we can access our
    // object in the event handler
    this.$list.on('click', 'a.add', { component: this }, this.handleAddClick);

    /*
    // Alternatively, we could bind the function to the current
    // object, that way `this` always points to the current instance
    this.handleAddClick = Common.bind(this, this.handleAddClick);
    */
}

DynamicList.prototype.handleAddClick = function(ev) {
    ev.preventDefault();
    // In event handlers, `this` is bound to the element that
    // the event was triggered on. To access our object, we
    // passed it in the ev.data.component parameter in the
    // event attachment call.
    ev.data.component.addField('');

    /*
    // If you're using the above binding syntax for the event
    // handler, you could just use:
    this.addField('');
    */
};

DynamicList.prototype.addField = function(value) {
    if (typeof value == 'undefined') value = '';
    value = Common.escapeHtml(value.toString());
    $('<li><input value="' + value + '"/></li>').insertBefore(this.$list.find('li:last'));
};

DynamicList.prototype.removeField = function(idx) {
    if (idx >= 0 && idx < this.$list.children().size() - 2) {
        this.$list.children().eq(idx).remove();
    }
};

DynamicList.prototype.removeAllFields = function() {
    this.$list.children().has('input').remove();
}

DynamicList.prototype.getValues = function() {
    return this.$list.find('input').map(function() {
        return this.value;
    }).get();
};