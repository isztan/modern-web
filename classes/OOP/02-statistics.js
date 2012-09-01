function Statistics(data) {
    this.data = data;
}

Statistics.prototype.sum = function() {
    return this.data.reduce(function(u, v) {
        return u + v;
    }, 0);
};

Statistics.prototype.average = function() {
    return this.sum() / this.data.length;
};

Statistics.prototype.extent = function() {
    return {
        min: Math.min.apply(Math, this.data),
        max: Math.max.apply(Math, this.data)
    };
};

Statistics.prototype.sumOfSquares = function() {
    return this.data.map(function(current) {
        return current * current;
    }).reduce(function(u, v) {
        return u + v;
    }, 0);
};

Statistics.prototype.standardDeviation = function() {
    var n = this.data.length;
    return Math.sqrt(this.sumOfSquares() / n - Math.pow(this.sum() / n, 2));
};