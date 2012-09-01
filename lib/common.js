(function() {

    // http://www.jspatterns.com/classical-inheritance/
    function inherit(P, C) {
        var F = function(){};
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;
        C.uberConstructor = C.prototype.uberConstructor = P;
        // convenience function for constructor inheritance
        C.prototype.super = function() {
            this.uberConstructor.apply(this, arguments);
        };
        C.prototype.constructor = C;
        extend(C, P);
    }

    function extend(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var name in source) if (source.hasOwnProperty(name))
                obj[name] = source[name];
        }
    }

    function bind(ctx, fn) {
        return function() {
            fn.apply(ctx, arguments);
        };
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function unescapeHtml(str) {
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    }

    this.Common = {
        inherit      : inherit,
        extend       : extend,
        bind         : bind,
        escapeHtml   : escapeHtml,
        unescapeHtml : unescapeHtml
    };

})();