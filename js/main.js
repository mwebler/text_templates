
$( document ).ready(function() {
    $("#savetext").click(function() {
        var data = CKEDITOR.instances.editor1.getData(); /* global CKEDITOR */
        console.log(data);
    })
});