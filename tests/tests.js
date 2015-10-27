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

QUnit.test( "Create two and delete by id (plain-text)", function( assert ) {
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
        function del(t){
            return templatesStorage.deleteById(t.id);
        }
            
        add().then(add).then(del).then(function(){
            var getPromise = templatesStorage.getAll();
            getPromise.done(function(get_templates){
                assert.equal( get_templates.length, 1, "Insert and read all templates failed" );
                done();
            });
            
            getPromise.fail(function(msg){
                assert.ok(false, msg);
            });
        });
    }
    
    templatesStorage.deleteAll().then(do_test);
});

QUnit.test( "Check uid generation", function( assert ) {
    assert.expect(3);
    var done = assert.async();
    
    function do_test(){
        
        var expected_uid = 1;
    
        function inc_uid(uid){
            assert.equal(uid, expected_uid, 'received uid differs from expected' );
            expected_uid++;
            return templatesStorage.getUid();
        }
        
        templatesStorage.getUid().then(inc_uid).then(inc_uid).then(inc_uid).then(done);
    }
    
    templatesStorage.deleteAll().then(do_test);
});

QUnit.test( "Create and update template (plain-text)", function( assert ) {
    assert.expect(2);
    var done = assert.async();
    
    function do_test(){
    
        var template = {
            title:"test 2", 
            type:"plain-text", 
            text:"Template content"};
            
        function add(){
            return templatesStorage.update(template);
        }
            
        add().then(function(t){
            template.id = t.id;
            template.text = "content changed";
            add().then(function(t){
               var getPromise = templatesStorage.getAll();
               getPromise.done(function(get_templates){
                   assert.equal( get_templates.length, 1, "Length different than expected" );
                   var get_template = get_templates[0];
                   assert.equal( get_template.text, template.text, "Text different than expected" );
                   done();
               });
               
               getPromise.fail(function(msg){
                   assert.ok(false, msg);
               }); 
            });
        });
    }
    
    templatesStorage.deleteAll().then(do_test);
});

QUnit.done(function( details ) {
    templatesStorage.deleteAll();
});