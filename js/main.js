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
  
  var template = {title: title, content: content, raw: raw_content};
  
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.get("templates", function(items) {
    var templates;
    if($.isEmptyObject(items))
      templates = [];
    else
       templates = items.templates;
    templates.push(template);
    
    templates.sort(function(a, b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      return 0;
    });
    
    chrome.storage.sync.set({"templates": templates}, function() {
      update_template_list();
    });
  });
  
}

function build_list_item(title){
  return '<a class="list-group-item">' + 
    '<h4 class="list-group-item-heading">' + title + '</h4>' +
  '</a>';
}

function get_template_list(callback){
  chrome.storage.sync.get("templates", function(items) {
    if($.isEmptyObject(items) || chrome.runtime.lastError)
      return;
    
    var templates = items.templates;
    var html_list = "";
    
    templates.forEach(function(template){
      html_list = html_list + build_list_item(template.title);
    });
    
    callback(html_list);
  });
}

function update_template_list(){
  get_template_list(function(list){
    $("#template-list").html(list);
  });
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href"); // activated tab
  if(target == "#home"){
    update_template_list();
  }
});



