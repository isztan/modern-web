describe('01-events.js', function() {

    it('should work for dynamic lists', function() {

        var list = $('<ul><li><a href="#" class="add">Add</a></li></ul>').appendTo('body');

        var dynamicList = new DynamicList(list.get(0));

        list.find('a.add').click();
        expect($('li input', list).size()).to.equal(1);

        list.find('a.add').click();
        expect($('li input', list).size()).to.equal(2);

        list.find('a.add').click();
        expect($('li input', list).size()).to.equal(3);

        dynamicList.removeAllFields();
        expect($('li input', list).size()).to.equal(0);

        dynamicList.addField('one');
        dynamicList.addField('two');
        dynamicList.addField('three');

        expect(dynamicList.getValues()).to.eql(['one', 'two', 'three']);

        dynamicList.removeField(1);
        expect(dynamicList.getValues()).to.eql(['one', 'three']);

        list.remove();

    });

    it('should correctly set height to largest', function() {

        var list = $('<ul><li style="height:30px">30</li><li style="height: 40px">40</li><li style="height:60px">60</li></ul>').appendTo('body');

        list.children().maximizeHeight();

        list.children().each(function() {
            expect($(this).innerHeight()).to.equal(60);
        });

        list.remove();

    });

    it('should correctly filter elements by viewport intersection', function() {

        var div = $('<div id="myPosDiv"></div>').css({
            position   : 'absolute',
            left       : 0,
            top        : 0,
            width      : '100px',
            height     : '100px',
            background : 'red'
        }).appendTo('body');

        expect($('#myPosDiv:inview').size()).to.equal(1);

        // completely move offscreen
        div.css({
            left : '-200px',
            top  : '-150px'
        });

        expect($('#myPosDiv:inview').size()).to.equal(0);

        // partially visible
        div.css({
            left : '-50px',
            top  : '-50px'
        });

        expect($('#myPosDiv:inview').size()).to.equal(1);

        div.remove();

    });

});