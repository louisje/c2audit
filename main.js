page$ = {
  grid_properties: {
    colModel: [
      {
        label:     'Server IP',
        name:      'ip',
        index:     'ip',
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
          maxlength: 100,
          disabled:  false
        },
        editrules: {
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
          edithidden: true
        }
      },
      {
        label:     'Password',
        name:      'password',
        index:     'password',
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
        label:    'Updated Time',
        name:     'update_date',
        index:    'update_date',
        width:    150,
        align:    'center',
        sortable: true
      }
    ],
    url:         'servers.json',
    datatype:    'json',
    caption:     'Server List',
    sortname:    'update_date',
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
      /*
      var imageUrl = $(this).jqGrid('getCell', rowId, 'imageUrl');
      $(this).jqGrid('setColProp', 'imageUrl', {
        editoptions: {
          style: 'max-height:100px',
          src: imageUrl
        }
      });
      $(this).jqGrid('editGridRow', rowId, {
        url:               '/admin/channel/modify',
        caption:           'Edit Channel Meta',
        width:             'auto',
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
          postData['imageUrl'] = $('#imageUrl', formId).attr('src');
          return postData;
        },
        beforeShowForm: function(formId) {
          $('#imageUrl', formId).click(function() {
            var imageUrl = prompt('Please enter new image URL', $(this).attr('src'));
            if (imageUrl != null) {
              $(this).attr('src', imageUrl);
            }
          });
        },
        afterclickPgButtons: function(whichButton, formId, rowId) {
          var imageUrl = $('#chn_table').jqGrid('getCell', rowId, 'imageUrl');
          $('#imageUrl', formId).attr('src', imageUrl);
        },
        afterComplete: utils.callbackAfterSubmitForm
      });
      */
    }
  },
  init: function() {
    $('#server_list').jqGrid(page$.grid_properties);
  }
};

$(page$.init);
