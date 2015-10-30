$(document).ready(function() {
  // Define the initial tab to trigger show event
  $('.nav-sidebar a[href="#home"]').tab('show');
});

$(document).ready(function() {
    $("#new-template").click(function() {
        
        bootbox.dialog({
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
                      save_content();
                      close_tinymce();
                      //Workaroud, wait 0,5s to update list
                      setTimeout(update_template_list, 500);
                  }
              },

              "Cancel": {
                  className: "btn-danger btn-block",
                  callback: function() {
                      close_tinymce();
                  }
              },
          }
      });
      
      init_tinymce();
    });
});

function init_tinymce(){
  /* global tinymce */
  tinymce.init({
    selector: "#text-editor-input",
    min_height: 300});
}

function close_tinymce(){
  tinymce.EditorManager.execCommand('mceRemoveEditor',true, "text-editor-input");
}

function save_content(){
  var title = $("#text-editor-title").val();
  var content = tinyMCE.activeEditor.getContent();
  var raw_content = tinyMCE.activeEditor.getContent({format : 'raw'});
  
  var template = {
      title: title, 
      type: "plain-text", 
      text: raw_content};
  
  templatesStorage.update(template).then(function(t){
    //check for error or succes?
  });
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
        if(node == 'BUTTON'){
            var id = $(e.target).prev().attr("id");
            alert('clicked: ' + id + '   ' + node);
        }
        else{
            var id = $(e.target).attr("id");
            alert('clicked: ' + id + '   ' + node);
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
