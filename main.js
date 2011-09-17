var callbackAfterSubmitForm = function(response, postData, formId) {
  if (response.responseText != 'OK') {
    if (response.responseText.length > 50)
      alert('Error Occurs');
    else
      alert(response.responseText);
  }
}

page$ = {
  grid_properties: {
    colModel: [
      {
        label:     'Host',
        name:      'host',
        index:     'host',
        align:     'center',
        width:     150,
        hidden:    false,
        sortable:  true,
        editable:  true,
        edittype:  'text',
        formatter: 'none',
        editoptions: {
          maxlength: 100,
          disabled:  false
        },
        editrules: {
          required:   true,
          edithidden: true
        }
      },
      {
        label:     'Port',
        name:      'port',
        index:     'port',
        align:     'center',
        width:     50,
        hidden:    false,
        sortable:  true,
        editable:  true,
        edittype:  'text',
        formatter: 'none',
        editoptions: {
          defaultValue: 1433,
          maxlength:    10,
          disabled:     false
        },
        editrules: {
          number:     true,
          edithidden: true
        }
      },
      {
        label:     'User',
        name:      'user',
        index:     'user',
        align:     'center',
        width:     100,
        hidden:    false,
        sortable:  true,
        editable:  true,
        edittype:  'text',
        formatter: 'none',
        editoptions: {
          maxlength: 100,
          disabled:  false
        },
        editrules: {
          required:   true,
          edithidden: true
        }
      },
      {
        label:     'Password',
        name:      'pass',
        index:     'pass',
        align:     'center',
        width:     100,
        hidden:    true,
        sortable:  false,
        editable:  true,
        edittype:  'password',
        formatter: 'none',
        editoptions: {
          maxlength: 100,
          disabled:  false
        },
        editrules: {
          edithidden: true
        }
      },
      {
        label:     'File Path',
        name:      'path',
        index:     'path',
        align:     'center',
        width:     100,
        hidden:    true,
        sortable:  false,
        editable:  true,
        edittype:  'text',
        formatter: 'none',
        editoptions: {
          maxlength: 100,
          disabled:  false
        },
        editrules: {
          required:   true,
          edithidden: true
        }
      },
      {
        label:    'Updated Time',
        name:     'updated',
        index:    'updated',
        width:    200,
        align:    'center',
        sortable: true
      },
      {
        label:     'Enabled',
        name:      'enabled',
        index:     'enabled',
        align:     'center',
        width:     100,
        hidden:    false,
        sortable:  true,
        editable:  true,
        edittype:  'checkbox',
        formatter: 'checkbox'
      }
    ],
    url:         'servers.php',
    datatype:    'json',
    caption:     'Server List',
    sortname:    'updated',
    sortorder:   'desc',
    rowNum:      10,
    rowList:     [10, 20, 30, 40, 50, 100],
    viewrecords: true,
    height:      'auto',
    hidegrid:    false,
    toppager:    true,
    gridComplete: function() {
    },
    onSelectRow: function(rowId, status) {
    },
    ondblClickRow: function(rowId) {
      $(this).jqGrid('editGridRow', rowId, {
        url:               'servers.php',
        caption:           'Edit Server Info',
        width:             400,
        top:               $(window).scrollTop() + 50, // $(this).offset().top - 50,
        left:              200, // $(this).offset().left + $(this).width() + 20,
        modal:             false,
        jqModal:           true,
        closeAfterEdit:    true,
        closeOnEscape:     true,
        reloadAfterSubmit: true,
        viewPagerButtons:  true,
        recreateForm:      true,
        beforeCheckValues: function(postData, formId, mode) {
        },
        beforeShowForm: function(formId) {
        },
        afterclickPgButtons: function(whichButton, formId, rowId) {
        },
        afterComplete: callbackAfterSubmitForm
      });
    }
  },
  init: function() {
    $('#server_list').jqGrid(page$.grid_properties);
  }
};

$(page$.init);
