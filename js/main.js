$(document).ready(function() {
  // Define the initial tab to trigger show event
  $('.nav-sidebar a[href="#home"]').tab('show');
});

function edit_template(template){
    var new_template = template;
    function save(title, content){
        new_template.title = title;
        new_template.text = content;
        save_template(template);
    }
    create_editor(template.title, template.text, save, null);
}

function create_template(){
    function save(title, content){
        var template = {
            title: title, 
            type: "plain-text", 
            text: content};
        save_template(template);
    }
    
    create_editor(null, null, save, null);
}

function save_template(template){
  templatesStorage.update(template).then(function(t){
    //Workaroud, wait 0,5s to update list
    setTimeout(update_template_list, 500);
  });
}

function delete_template(id){
    templatesStorage.deleteById(id).then(function(){
       bootbox.alert({ 
           size: 'small',
           message: "Template succesfully deleted"
       });
       setTimeout(update_template_list, 500);
    });
}

function create_editor(title, content, save_callback, cancel_callback){
    var dialog = bootbox.dialog({
        message: '<textarea id="text-editor-input"></textarea>',
        title: '<input type="text" id="text-editor-title" placeholder="Template Title">',
        size: "large",
        onEscape: function() {
            close_tinymce();
        },
        show: true,
        backdrop: true,
        closeButton: true,
        animate: true,
        buttons: {
            "Save": {
                className: "btn-success btn-block",
                callback: function() {
                    if(save_callback){
                        var title = $("#text-editor-title").val();
                        var raw_content = tinyMCE.activeEditor.getContent({format : 'raw'});
                        save_callback(title, raw_content);
                    }
                    close_tinymce();
                }
            },

            "Cancel": {
                className: "btn-danger btn-block",
                callback: function() {
                    if(cancel_callback){
                        var title = $("#text-editor-title").val();
                        var raw_content = tinyMCE.activeEditor.getContent({format : 'raw'});
                        cancel_callback(title, content);
                    }
                    close_tinymce();
                }
            },
        }
    });
    if(content){
        $("textarea#text-editor-input").val(content);
    }
    if(title){
        $("input#text-editor-title").val(title);
    }
    init_tinymce();
    return dialog;
}

$(document).ready(function() {
    $("#new-template").click(function() {
        create_template();
    });
});

function init_tinymce(){
  /* global tinymce */
  tinymce.init({
    selector: "#text-editor-input",
    min_height: 300
  });
}

function close_tinymce(){
  tinymce.EditorManager.execCommand('mceRemoveEditor',true, "text-editor-input");
}

function get_template_list(callback){
  templatesStorage.getAll().done(function(items) {
    if(items.length == 0)
      return;
    var html_list = {'templates': items};
    
    callback(html_list);
  });
}

function update_template_list(){
  get_template_list(function(list){
      var template = $('#tmpl-template-list').html();
      Mustache.parse(template);   // optional, speeds up future uses
      var rendered = Mustache.render(template, list);
      $('#template-list').html(rendered);
  });
}

/* Each time a tab is selected */
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href"); // activated tab
  if(target == "#home"){
    update_template_list();
  }
});

$(document).ready(function () {
    
    $("#template-list").on('click', 'a.list-group-item', function(e) {
        e.preventDefault();
        var node = $(e.target).prop('nodeName');
        var del;
        if(node == 'BUTTON' || node == 'SPAN'){
            del = true;
        }
        var target = $(e.target).closest('a.list-group-item');
        var id = target.attr("id");
        if(del){
            delete_template(id);
        }
        else{
            templatesStorage.getById(id).done(function(item) {
              edit_template(item);
            });
        }
        return false;  
    });
    
    
    $('#filter').keyup(function () {
        var rex = new RegExp($(this).val(), 'i');
        $('.list-group-item').hide();
        $('.list-group-item').filter(function () {
            return rex.test($(this).text());
        }).show();
    
    });
});
