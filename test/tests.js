describe('common.js', function() {

    it('should do inheritance correctly', function() {

        function Entity(name) {
            this.name = name;
        }

        function Person(name, gender) {
            this.super.apply(this, arguments);
            this.gender = gender;
        }

        Common.inherit(Entity, Person);

        var mike = new Person('Mike', 'male');

        expect(mike.name).to.equal('Mike');
        expect(mike.gender).to.equal('male');
        expect(mike instanceof Person).to.equal(true);
        expect(mike instanceof Entity).to.equal(true);
        expect(mike.constructor).to.equal(Person);
        expect(mike.uberConstructor).to.equal(Entity);

    });

    it('should correctly extend objects', function() {

        function A() {}
        A.staticMethod = function() {};

        function B() {}

        Common.inherit(A, B);

        expect(B.staticMethod).to.exist;

    });
});


describe('01-inheritance.js', function() {

    it('should throw exceptions for abstract shapes', function() {
        var s = new Shape();
        expect(s.getArea).to.throw();
        expect(s.getPerimeterLength).to.throw();
    });

    it('should correctly work for vectors', function() {
        var v = new Vector2d(3, 4),
            u = new Vector2d(2, 6);

        expect(v.length()).to.equal(5);
        expect(v.add(u)).to.eql(new Vector2d(5, 10));
        expect(v.dot(u)).to.equal(30);
        expect(v.neg()).to.eql(new Vector2d(-3, -4));
        expect(v.sub(u)).to.eql(new Vector2d(1, -2));
    });

    it('should correctly calculate rectangles', function() {
        var r = new Rectangle(new Vector2d(1, 1), 3, 4);

        expect(r.corner).to.eql({x: 1, y: 1});
        expect(r.width).to.equal(3);
        expect(r.height).to.equal(4);

        expect(r.getArea()).to.equal(12);
        expect(r.getPerimeterLength()).to.equal(14);
        expect(r.getBoundingBox()).to.eql(r);
    });

    it('should correctly calculate circles', function() {
        var c = new Circle(new Vector2d(2, 2), 3);

        expect(c.getArea()).to.equal(Math.PI * 9);
        expect(c.getPerimeterLength()).to.equal(Math.PI * 6);
        expect(c.getBoundingBox()).to.eql(new Rectangle(new Vector2d(-1, -1), 6, 6));
    });

    it('should correctly calculate triangles', function() {
        var t = new Triangle([
            new Vector2d(1, 1),
            new Vector2d(3, 2),
            new Vector2d(4, 0)
        ]);

        expect(t.getArea()).to.be.within(2.499999, 2.500001);
        expect(t.getPerimeterLength()).to.be.within(7.63441361516794, 7.63441361516798);
        expect(t.getBoundingBox()).to.eql(new Rectangle(
            new Vector2d(1, 0),
            3, 2
        ));
    });

});

describe('02-statistics.js', function() {

    it('should correctly calculate sum', function() {
        var s = new Statistics([1,2,3,4,5,6,7,8,9]);
        expect(s.sum()).to.equal(45);
    });

    it('should correctly calculate average', function() {
        var s = new Statistics([1,2,3,4,5,6,7,8,9]);
        expect(s.average()).to.equal(5);
    });

    it('should correctly calculate extents', function() {
        var s = new Statistics([1,2,3,4,5,6,7,8,9]);
        expect(s.extent()).to.eql({ min: 1, max: 9 });
    });

    it('should correctly calculate sum of squares', function() {
        var s = new Statistics([1,2,3,4,5]);
        expect(s.sumOfSquares()).to.equal(55);
    });

    it('should correctly calculate standard deviation', function() {
        var s = new Statistics([1,2,3,4,5]);
        expect(s.standardDeviation()).to.equal(Math.sqrt(2));
    });

});

describe('03-dom.js', function() {

    it('should correctly apply styles to the element', function() {
        var el = document.createElement('p');
        el.textContent = 'Lorem ipsum dolor sit amet.';
        document.body.appendChild(el);

        setCSS(el, { fontSize: '24px', color: 'red' });

        var elStyles = getComputedStyle(el);
        expect(elStyles.getPropertyValue('font-size')).to.equal('24px');
        expect(elStyles.getPropertyValue('color').replace(/\s/g, '')).to.equal('rgb(255,0,0)');

        el.parentNode.removeChild(el);
    });

});

describe('04-delegate.js', function() {

    it('should correctly work with adding new fields', function() {

        var list = document.createElement('ul');
        list.innerHTML = '<li><a href="#" class="add">Add</a></li>';
        document.body.appendChild(list);

        list.addEventListener('click', handleMultiValueClick, false);
        list.querySelector('.add').click();

        expect(list.querySelectorAll('input').length).to.equal(1);

        list.parentNode.removeChild(list);
    });

    it('`closest` should correctly find parent', function() {

        var div = document.createElement('div');
        div.innerHTML = '<p>Lorem ipsum <a>dolor sit amet</a></p>';
        document.body.appendChild(div);
        var p = div.querySelector('p'), a = p.querySelector('a');

        expect(closest(a, 'p')).to.equal(p);
        expect(closest(a, 'div')).to.equal(div);
        
        div.parentNode.removeChild(div);
    });

    it('`closestFilter` should correctly find parent', function() {

        var div = document.createElement('div');
        div.innerHTML = '<p>Lorem ipsum <a>dolor sit amet</a></p>';
        document.body.appendChild(div);
        var p = div.querySelector('p'), a = p.querySelector('a');

        expect(closestFilter(a, function(el) {
            return el.nodeName == 'P';
        })).to.equal(p);

        expect(closestFilter(a, function(el) {
            return el.nodeName == 'DIV';
        })).to.equal(div);

        div.parentNode.removeChild(div);
    });

});