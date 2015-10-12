
QUnit.test( "Create and get (plain-text)", function( assert ) {
    templatesStorage.setStorage('test1');
    
    var done = assert.async();
    
    var template = {
        title:"my first template", 
        type:"plain-text", 
        text:"Template content"};

    var update_done = function(template){
        templatesStorage.getById(template.id, function(get_template){
            assert.deepEqual( get_template, template, "Read tempalte different from inserted template" );
            done();
        });
    };

    templatesStorage.update(template, update_done);
});

QUnit.test( "Create two and get all (plain-text)", function( assert ) {
    templatesStorage.setStorage('test2');
    
    var done = assert.async();
    
    var template = {
        title:"my first template", 
        type:"plain-text", 
        text:"Template content"};

    var do_test = function(){
        templatesStorage.update(template, function(template){
            templatesStorage.update(template, function(template){
                templatesStorage.getAll(function(get_templates){
                    assert.equal( get_templates.length, 2, "Insert and read all templates failed" );
                    done();
                });
            });
        });
    };
    
    templatesStorage.deleteAll(do_test);
});

QUnit.done(function( details ) {
    templatesStorage.deleteAll();
});