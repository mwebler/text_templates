
$( document ).ready(function() {
    $("#savetext").click(function() {
     // Initialize editor with custom theme and modules

    });
    

});




$(document).ready(function() {
	$("#new-template").click(function(){
	  $.get("editor.html").success(function(data) { 
	    console.log(data); 
	   bootbox.dialog({
  /**
   * @required String|Element
   */
  message: data,
  
  /**
   * @optional String|Element
   * adds a header to the dialog and places this text in an h4
   */
  title: "Custom title",
  
  /**
   * @optional Function
   * allows the user to dismisss the dialog by hitting ESC, which
   * will invoke this function
   */
  onEscape: function() {},
  
  /**
   * @optional Boolean
   * @default: true
   * whether the dialog should be shown immediately
   */
  show: true,
  
  /**
   * @optional Boolean
   * @default: true
   * whether the dialog should be have a backdrop or not
   */
  backdrop: true,
  
  /**
   * @optional Boolean
   * @default: true
   * show a close button
   */
  closeButton: true,
  
  /**
   * @optional Boolean
   * @default: true
   * animate the dialog in and out (not supported in < IE 10)
   */
  animate: true,
  
  /**
   * @optional String
   * @default: null
   * an additional class to apply to the dialog wrapper
   */
  className: "my-modal",
  
  /**
   * @optional Object
   * @default: {}
   * any buttons shown in the dialog's footer
   */
  buttons: {
    
    // For each key inside the buttons object...
    
    /**
     * @required Object|Function
     * 
     * this first usage will ignore the `success` key
     * provided and take all button options from the given object
     */
    success: {   
      /**
       * @required String
       * this button's label
       */
      label: "Success!",
      
      /**
       * @optional String
       * an additional class to apply to the button
       */
      className: "btn-success",
      
      /**
       * @optional Function
       * the callback to invoke when this button is clicked
       */
      callback: function() {}
    },
    
    /**
     * this usage demonstrates that if no label property is
     * supplied in the object, the key is used instead
     */
    "Danger!": {
      className: "btn-danger",
      callback: function() {}
    },
    
    /**
     * lastly, if the value supplied is a function, the options
     * are assumed to be the short form of label -> callback
     * this is the most condensed way of providing useful buttons
     * but doesn't allow for any configuration
     */
    "Another label": function() {}
  }
});

var fullEditor = new Quill('#full-editor', {
  modules: {
    'toolbar': { container: '#full-toolbar' },
    'link-tooltip': true
  },
  theme: 'snow'
});


	  });
	  
	  
	});
	
});