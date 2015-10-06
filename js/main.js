$(document).ready(function() {
    $("#savetext").click(function() {
        // Initialize editor with custom theme and modules

    });
});

$(document).ready(function() {
    $("#new-template").click(function() {
        $.get("editor.html").success(function(data) {
            console.log(data);
            bootbox.dialog({
                message: data,
                title: '<input type="text" id="text-editor-title" placeholder="Template Title">',
                size: "large",
                onEscape: function() {},
                show: true,
                backdrop: true,
                closeButton: true,
                animate: true,
                buttons: {
                    "Save": {
                        className: "btn-success btn-block",
                        callback: function() {}
                    },

                    "Cancel": {
                        className: "btn-danger btn-block",
                        callback: function() {}
                    },
                }
            });

            /* global Quill*/
            var fullEditor = new Quill('#text-editor-input', {
                modules: {
                    'toolbar': {
                        container: '#text-editor-toolbar'
                    },
                    'link-tooltip': true
                },
                theme: 'snow'
            });


        });


    });

});