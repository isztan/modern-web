(function($) {

    $.expr[':'].inview = function(el) {
        var w = $(window),
            $el = $(el),
            viewport = {
                left   : w.scrollLeft(),
                top    : w.scrollTop(),
                right  : w.scrollLeft() + window.innerWidth,
                bottom : w.scrollTop() + window.innerHeight
            },
            element = {
                left   : $el.offset().left,
                top    : $el.offset().top,
                right  : $el.offset().left + $el.outerWidth(),
                bottom : $el.offset().top + $el.outerHeight()
            };

        return rangesOverlap(viewport.left, viewport.right, element.left, element.right) &&
               rangesOverlap(viewport.top, viewport.bottom, element.top, element.bottom);
    };

    function rangesOverlap(a, b, c, d) {
        var maxLeft = Math.max(a, c),
            minRight = Math.min(b, d);
        return maxLeft <= minRight;
    }

})(jQuery);