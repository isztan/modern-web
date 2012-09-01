function Shape() {}

Shape.prototype.getArea = function() {
    throw new Error('Cannot calculate area for abstract shapes!');
};

Shape.prototype.getPerimeterLength = function() {
    throw new Error('Cannot calculate perimiter length for abstract shapes!');
};

Shape.prototype.getBoundingBox = function() {
    throw new Error('Cannot calculate bounding box for abstract shapes!');
};


function Vector2d(x, y) {
    this.x = x;
    this.y = y;
}

Vector2d.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2d.prototype.add = function(v) {
    return new this.constructor(this.x + v.x, this.y + v.y);
};

Vector2d.prototype.sub = function(v) {
    return this.add(v.neg());
};

Vector2d.prototype.neg = function() {
    return new this.constructor(-this.x, -this.y);
};

Vector2d.prototype.dot = function(v) {
    return this.x * v.x + this.y * v.y;
};


Common.inherit(Shape, Rectangle);
function Rectangle(corner, width, height) {
    this.corner = corner;
    this.width  = width;
    this.height = height;
}

Rectangle.prototype.getArea = function() {
    return this.width * this.height;
};

Rectangle.prototype.getPerimeterLength = function() {
    return (this.width + this.height) * 2;
};

Rectangle.prototype.getBoundingBox = function() {
    return new Rectangle(this.corner, this.width, this.height);
};

Common.inherit(Shape, Circle);
function Circle(center, radius) {
    this.center = center;
    this.radius = radius;
}

Circle.prototype.getArea = function() {
    return Math.PI * this.radius * this.radius;
};

Circle.prototype.getPerimeterLength = function() {
    return Math.PI * this.radius * 2;
};

Circle.prototype.getBoundingBox = function() {
    return new Rectangle(
        new Vector2d(this.center.x - this.radius, this.center.y - this.radius),
        this.radius * 2, this.radius * 2
    );
};

Common.inherit(Shape, Triangle);
function Triangle(points) {
    // assuming it was passed an array of 3 Vector2d objects
    this.points = points;
}

Triangle.prototype.getArea = function() {
    var ab = this.points[1].sub(this.points[0]),
        ac = this.points[2].sub(this.points[0]);
    return 0.5 * Math.sqrt(Math.pow(ab.length(), 2) * Math.pow(ac.length(), 2) - Math.pow(ab.dot(ac), 2));
};

Triangle.prototype.getPerimeterLength = function() {
    var ab = this.points[1].sub(this.points[0]).length(),
        bc = this.points[2].sub(this.points[1]).length(),
        ca = this.points[0].sub(this.points[2]).length();
    return ab + bc + ca;
};

Triangle.prototype.getBoundingBox = function() {
    var x = this.points.map(function(v) { return v.x; }),
        y = this.points.map(function(v) { return v.y; }),
        minX = Math.min.apply(Math, x),
        minY = Math.min.apply(Math, y),
        maxX = Math.max.apply(Math, x),
        maxY = Math.max.apply(Math, y);

    return new Rectangle(new Vector2d(minX, minY), maxX - minX, maxY - minY);
};