QUnit.test( "Create and get (plain-text)", function( assert ) {
    var template = {
        id: "0123456789", 
        title:"my first template", 
        type:"plain-text", 
        text:"Template content"};

    templatesStorage.update(template);
    
    var get_template = templatesStorage.getById(template.id);
    
    assert.deepEqual( template, get_template, "Read tempalte different from inserted template" );
});