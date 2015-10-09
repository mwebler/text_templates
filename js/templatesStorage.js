/*
Template definition
id - unique id
title - title
type - plain-text, html, etc
text - template content

*/

var templatesStorage = (function () {

    function getById(id){
    
    }
    
    function getAll(){
        
    }

    function update(template){
        //if exists template with same id, update it
        // else create a new one
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