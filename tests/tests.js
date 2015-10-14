function qunit_init(){
    //set timeout for 3seconds to avoid waiting for assynchronous functions
    QUnit.config.testTimeout = 3000; 
}

function storage_init(){
    //We don't want to sync test data. Use local storage instead of sync
    chrome.storage.sync = chrome.storage.local; 
    // do not mess up with productive storage
    templatesStorage.setStorage('test'); 
}

qunit_init();
storage_init();

QUnit.test( "Create and get (plain-text)", function( assert ) {
    assert.expect(1);
    var done = assert.async();
    
    function do_test(){
        var template = {
            title:"test 1", 
            type:"plain-text", 
            text:"Template content"};
    
        var updatePromise = templatesStorage.update(template);
        
        $.when(updatePromise).done(function(template){
            var getPromise = templatesStorage.getById(template.id);
            getPromise.done(function(get_template){
                assert.deepEqual( get_template, template, "Read template different from inserted template" );
                done();
            });
            
            getPromise.fail(function(msg){
                assert.ok(false, msg);
            });
        });
        
        updatePromise.fail(function(msg){
            assert.ok(false, msg);
        });
    }
    
    templatesStorage.deleteAll().then(do_test);
});

QUnit.test( "Create two and get all (plain-text)", function( assert ) {
    assert.expect(1);
    var done = assert.async();
    
    function do_test(){
    
        var template = {
            title:"test 2", 
            type:"plain-text", 
            text:"Template content"};
            
        function add(){
            return templatesStorage.update(template);
        }
            
        add().then(add).then(function(template){
            var getPromise = templatesStorage.getAll();
            getPromise.done(function(get_templates){
                assert.equal( get_templates.length, 2, "Insert and read all templates failed" );
                done();
            });
            
            getPromise.fail(function(msg){
                assert.ok(false, msg);
            });
        });
    }
    
    templatesStorage.deleteAll().then(do_test);
});

QUnit.done(function( details ) {
    templatesStorage.deleteAll();
});