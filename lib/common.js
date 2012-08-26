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

    this.Common = {
        inherit : inherit,
        extend  : extend
    };

})();