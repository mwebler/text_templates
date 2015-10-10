/*
Template definition
id - unique id
title - title
type - plain-text, html, etc
text - template content

*/

var templatesStorage = (function () {
    var templates = 'templates';

    function getById(id){
    
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
                items[templates].push(template);
                chrome.storage.sync.set(items);
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