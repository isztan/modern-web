(function($) {
    $.fn.maximizeHeight = function() {
        var maxHeight = 0;
        this.each(function() {
            maxHeight = Math.max(maxHeight, $(this).innerHeight());
        });
        return this.css({'height' : maxHeight + 'px'});
    };
})(jQuery);