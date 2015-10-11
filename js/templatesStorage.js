/*
Template definition
id - unique id
title - title
type - plain-text, html, etc
text - template content

*/

var templatesStorage = (function () {
    var templates = 'templates';

    function getById(id, callback){
        chrome.storage.sync.get(templates, function(items) {
            if(chrome.runtime.lastError){
                callback([]);
            }
            else{
                var item = items[templates].filter(function( obj ) {
                    return obj.id == id;
                });
                if(item.length == 1)
                    item = item[0];
                callback(item);
            }
        });
    }
    
    function getAll(callback){
        chrome.storage.sync.get(templates, function(items) {
            if(chrome.runtime.lastError){
                callback([]);
            }
            else{
                callback(items[templates]);
            }
        });
    }

    function update(template){
        chrome.storage.sync.get(templates, function(items) {
            if(chrome.runtime.lastError){
                return;
            }
            else{
                var t = [];
                t.push(template);
                var x = {'templates': t};
                
                chrome.storage.sync.set(x);
            }
        });
    }
    
    function deleteById(id){
        
    }
    
    function deleteAll(){
        
    }
    
    function generateUid(){
        
    }
 
  // Return an object exposed to the public
  return {
      getById:      getById,
      getAll:       getAll,
      update:       update,
      deleteById:   deleteById,
      deleteAll:    deleteAll,
  };
})();