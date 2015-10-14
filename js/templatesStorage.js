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
    function getById(id){
        var deferred = $.Deferred();
        
        chrome.storage.sync.get(storageTemplates, function(items) {
            if(chrome.runtime.lastError){
                deferred.reject('failed to get template');
                return;
            }
            else{
                var templates = items[storageTemplates];
                if(templates === undefined){
                    deferred.reject('failed to get template');
                    return;
                }
                
                var template = templates.filter(function( obj ) {
                    return obj.id == id;
                });
                if(template.length != 0)
                    deferred.resolve(template[0]);
                else
                    deferred.reject('failed to get template');
            }
        });
        
        return deferred.promise();
    }
    
    /* Return an array containing all the templates from storage */
    function getAll(){
        var deferred = $.Deferred();
        
        chrome.storage.sync.get(storageTemplates, function(items) {
            if(chrome.runtime.lastError){
                deferred.reject('failed to get all templates');
            }
            else{
                var templates = items[storageTemplates];
                if(templates === undefined)
                    deferred.resolve([]);
                else
                    deferred.resolve(templates);
            }
        });
        
        return deferred.promise();
    }

    /* Add a new template or update if there is already one with same ID */
    function update(template){
        var deferred = $.Deferred();
        
        var update_template = function(){
            var getPromise = getAll();
            
            getPromise.done(function(templates){
                templates.push(template);
                var obj = {};
                obj[storageTemplates] = templates;
                
                chrome.storage.sync.set(obj, function(){
                    deferred.resolve(template);
                });
            });
            
            getPromise.fail(function(){
                deferred.reject('failed to insert template into storage');
            });
        };
        
        if(template.id === undefined){
            var uidPromise = getUid();
            
            uidPromise.done(function(uid){
                template.id = uid;
                update_template();  
            });
            
            uidPromise.fail(function(){
                deferred.reject('failed getting uid for template');
            });
        }
        else{
            update_template();
        }
        
        return deferred.promise();
    }
    
    /* Delete item object that match the ID */
    function deleteById(id){
        
    }
    
    /* Delete all the templates from storage */
    function deleteAll(){
        var deferred = $.Deferred();
        
        chrome.storage.sync.remove(storageTemplates, function(){
            if(chrome.runtime.lastError){
                deferred.reject('failed removing all templates from storage');
            }
            else{
                deferred.resolve();
            }
        });
        
        return deferred.promise();
    }
    
    /* Return an unique id to be used in a template */
    function getUid(){
        var deferred = $.Deferred();
        
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
            deferred.resolve(next_uid);
        });
        
        return deferred.promise();
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