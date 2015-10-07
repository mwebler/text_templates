$(document).ready(function() {
    $("#savetext").click(function() {
        // Initialize editor with custom theme and modules

    });
});

var cont = 0;
$(document).ready(function() {
    $("#new-template").click(function() {
        
        cont++;
        bootbox.dialog({
                message: '<textarea id="text-editor-input"></textarea>',
                title: '<input type="text" id="text-editor-title" placeholder="Template Title">',
                size: "large",
                onEscape: function() {
                    tinymce.EditorManager.execCommand('mceRemoveEditor',true, "text-editor-input");
                },
                show: true,
                backdrop: true,
                closeButton: true,
                animate: true,
                buttons: {
                    "Save": {
                        className: "btn-success btn-block",
                        callback: function() {
                            
                            tinymce.EditorManager.execCommand('mceRemoveEditor',true, "text-editor-input");
                        }
                    },

                    "Cancel": {
                        className: "btn-danger btn-block",
                        callback: function() {
                            tinymce.EditorManager.execCommand('mceRemoveEditor',true, "text-editor-input");
                        }
                    },
                }
            });
            


            /* global tinymce */
            tinymce.init({
                selector: "#text-editor-input",
                min_height: 300});

    });
});