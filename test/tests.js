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


describe('02-inheritance.js', function() {

    it('should correctly return the score board', function() {

        var mySoccerGame = new Soccer('A', 'B');
        expect(mySoccerGame.getScore()).to.eql({ A: 0, B: 0 });

    });

    it('should correctly increment scores', function() {

        var myBasketballGame = new Basketball('A', 'B');
        myBasketballGame.homeScores();
        myBasketballGame.guestScores(3);
        expect(myBasketballGame.getScore()).to.eql({ A: 2, B: 3 });

    });

});

describe('03-statistics.js', function() {

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

describe('04-dom.js', function() {

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

describe('05-delegate.js', function() {

    it('should correctly work with adding new fields', function() {

        var list = document.createElement('ul');
        list.innerHTML = '<li><a href="#" class="add">Add</a></li>';
        document.body.appendChild(list);
        list.addEventListener('click', handleMultiValueClick, false);
        list.querySelector('.add').click();

        expect(list.querySelectorAll('input').length).to.equal(1);

        //list.parentNode.removeChild(list);
    });

});