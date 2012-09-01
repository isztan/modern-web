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

});