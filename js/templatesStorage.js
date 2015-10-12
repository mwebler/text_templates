/*
Template definition
id - unique id
title - title
type - plain-text, html, etc
text - template content

*/

var templatesStorage = (function () {
    var storage = 'development';
    var storageTemplates = storage + '-templates';
    var storageUid = storage + '-uid';
    var storageOptions = storage + '-options';
    
    function setStorage(local){
        storage = local;
        storageTemplates = storage + '-templates';
        storageUid = storage + '-uid';
        options = storage + '-options';
    }

    /* Return the item object that match the ID */
    function getById(id, callback){
        chrome.storage.sync.get(storageTemplates, function(items) {
            if(chrome.runtime.lastError){
                callback(undefined);
            }
            else{
                var item = items[storageTemplates].filter(function( obj ) {
                    return obj.id == id;
                });
                if(item.length != 0)
                    callback(item[0]);
                else
                    callback(undefined);
            }
        });
    }
    
    /* Return an array containing all the templates from storage */
    function getAll(callback){
        chrome.storage.sync.get(storageTemplates, function(items) {
            if(chrome.runtime.lastError){
                callback([]);
            }
            else{
                callback(items[storageTemplates]);
            }
        });
    }

    /* Add a new template or update if there is already one with same ID */
    function update(template, callback){
        var update_template = function(){
            chrome.storage.sync.get(storageTemplates, function(items) {
                if(chrome.runtime.lastError){
                    return;
                }
                else{
                    var templates = items[storageTemplates];
                    if(templates === undefined)
                        templates = [];
                        
                    templates.push(template);
                    var obj = {};
                    obj[storageTemplates] = templates;
                    
                    chrome.storage.sync.set(obj, function(){
                        if(callback)
                            callback(template);
                    });
                }
            });
        };
        
        if(template.id === undefined){
           getUid(function(uid){
              template.id = uid;
              update_template();
           });
        }
        else{
            update_template();
        }
    }
    
    /* Delete item object that match the ID */
    function deleteById(id){
        
    }
    
    /* Delete all the templates from storage */
    function deleteAll(callback){
        chrome.storage.sync.remove(storageTemplates, callback);
    }
    
    /* Return an unique id to be used in a template */
    function getUid(callback){
        chrome.storage.sync.get(storageUid, function(items) {
            var next_uid;
            if(chrome.runtime.lastError){
                next_uid = 1;
            }
            else{
                var last_uid = items[storageUid];
                if(last_uid === undefined)
                    next_uid = 1;
                else
                    next_uid = last_uid + 1;
                chrome.storage.sync.set({storageUid: next_uid});
            }
            callback(next_uid);
        });
    }
 
  // Return an object exposed to the public
  return {
      getById:      getById,
      getAll:       getAll,
      update:       update,
      deleteById:   deleteById,
      deleteAll:    deleteAll,
      getUid:       getUid,
      setStorage:   setStorage
  };
})();