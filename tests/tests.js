QUnit.test( "Create and get (plain-text)", function( assert ) {
    var done = assert.async();
    
    var template = {
        id: "0123456789", 
        title:"my first template", 
        type:"plain-text", 
        text:"Template content"};

    templatesStorage.update(template);
    
    templatesStorage.getById(template.id, function(get_template){
        assert.deepEqual( get_template, template, "Read tempalte different from inserted template" );
        done();
    });
    
});