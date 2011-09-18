/**
 * Main
 */

var callbackAfterSubmitForm = function(response, postData, formId) {
  if (response.responseText != 'OK') {
    if (response.responseText.length > 50)
      alert('Error Occurs');
    else
      alert(response.responseText);
  }
}

page$ = {
  subgridProperties: {
    colModel: [
      {
        label:     'Server ID',
        name:      'serverid',
        index:     'serverid',
        align:     'center',
        width:     200,
        hidden:    true,
        sortable:  true,
        editable:  false,
        edittype:  'text',
        formatter: 'none',
        editoptions: {
          maxlength: 100,
          disabled:  true
        },
        editrules: {
          number:     true,
          required:   true,
          edithidden: true
        }
      },
      {
        label:     'Event ID',
        name:      'eventid',
        index:     'eventid',
        align:     'center',
        width:     200,
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
          number:     true,
          required:   true,
          edithidden: true
        }
      },
      {
        label:     'Column ID',
        name:      'columnid',
        index:     'columnid',
        align:     'center',
        width:     200,
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
          number:     true,
          required:   true,
          edithidden: true
        }
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
        formatter: 'checkbox',
        editoptions: {
          value: '1:0'
        }
      }
    ],
    datatype:    'json',
    caption:     'Trace Properties',
    sortname:    'eventid',
    sortorder:   'asc',
    rowNum:      10,
    rowList:     [10, 20, 30, 40, 50, 100],
    viewrecords: true,
    height:      'auto',
    hidegrid:    false,
    toppager:    true,
    gridComplete: function() {
    },
    onSelectRow: function(rowId, status) {
    }
  },
  gridProperties: {
    colModel: [
      {
        label:     'Host',
        name:      'host',
        index:     'host',
        align:     'center',
        width:     200,
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
        width:     100,
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
        formatter: 'checkbox',
        editoptions: {
          value: '1:0'
        }
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
        editCaption:       'Edit Server Info',
        width:             400,
        top:               $(window).scrollTop() + 50,
        left:              150,
        modal:             false,
        jqModal:           true,
        closeAfterEdit:    true,
        closeOnEscape:     true,
        reloadAfterSubmit: true,
        viewPagerButtons:  true,
        recreateForm:      true,
        afterComplete:     callbackAfterSubmitForm,
        beforeCheckValues: function(postData, formId, mode) {
        },
        beforeShowForm: function(formId) {
        },
        afterclickPgButtons: function(whichButton, formId, rowId) {
        }
      });
    }
  },
  initSubgrid: function(subgridId, parentRowId) {
    var subgridTableId = subgridId + '_t';
    var subgridTableSelector = '#' + subgridTableId;
    var subgridSelector = '#' + subgridId;
    var subgridProperties = page$.subgridProperties;
    var traceUrl = 'trace.php?serverid=' + parentRowId;

    $(subgridSelector).html('<table id="' + subgridTableId + '" class="scroll"></table>');
    $(subgridSelector).attr('style', 'padding: 5px 5px 5px 5px');

    subgridProperties.url = traceUrl;
    subgridProperties.ondblClickRow = function(subRowId) {
      $(this).jqGrid('editGridRow', subRowId, {
        url:               traceUrl,
        editCaption:       'Edit A Trace Property',
        width:             400,
        top:               $(window).scrollTop() + 50,
        left:              150,
        modal:             false,
        jqModal:           true,
        closeAfterEdit:    true,
        closeOnEscape:     true,
        reloadAfterSubmit: true,
        viewPagerButtons:  true,
        recreateForm:      true,
        afterComplete:     callbackAfterSubmitForm,
        beforeCheckValues: function(postData, formId, mode) {
        },
        beforeShowForm: function(formId) {
          $('#tr_serverid').hide();
          //$('#serverid', formId).val(parentRowId);
        }
      });
    };
    $(subgridTableSelector).jqGrid(subgridProperties);
    $(subgridTableSelector).jqGrid('navGrid', subgridTableSelector + '_toppager', {
      edit:     false,
      add:      true,
      del:      true,
      search:   false,
      view:     false,
      addtitle: 'Add A New Trace',
      deltitle: 'Remove A Trace'
    }, { }, {
      // 'add' properties
      url:               traceUrl,
      addCaption:        'Add A New Trace',
      width:             '400',
      top:               $(window).scrollTop() + 50,
      left:              150,
      modal:             false,
      jqModal:           true,
      closeAfterAdd:     true,
      closeOnEscape:     true,
      reloadAfterSubmit: true,
      recreateForm:      true,
      afterComplete:     callbackAfterSubmitForm,
      beforeShowForm: function(formId) {
        $('#tr_serverid').hide();
      }
    }, {
      // 'del' properties
      url:               traceUrl,
      caption:           'Remove A Trace',
      msg:               'Do you want to remove this trace from list ?',
      width:             '400',
      top:               $(window).scrollTop() + 50,
      left:              150,
      modal:             false,
      jqModal:           true,
      closeOnEscape:     true,
      reloadAfterSubmit: true,
      afterComplete:     callbackAfterSubmitForm,
    });
  },
  init: function() {
    page$.gridProperties.subGridRowExpanded = page$.initSubgrid;
    page$.gridProperties.subGrid = true;
    $('#server_list').jqGrid(page$.gridProperties);
    $('#server_list').jqGrid('navGrid', '#server_list_toppager', {
      edit:     false,
      add:      true,
      del:      true,
      search:   false,
      view:     false,
      addtitle: 'Add A New Server',
      deltitle: 'Remove A Server'
    }, { }, {
      // 'add' properties
      url:               'servers.php',
      addCaption:        'Add A New Server',
      width:             '400',
      top:               $(window).scrollTop() + 50,
      left:              150,
      modal:             false,
      jqModal:           true,
      closeAfterAdd:     true,
      closeOnEscape:     true,
      reloadAfterSubmit: true,
      recreateForm:      true,
      afterComplete:     callbackAfterSubmitForm,
      beforeShowForm: function(formId) {
      }
    }, {
      // 'del' properties
      url:               'servers.php',
      caption:           'Remove A Server',
      msg:               'Do you want to remove this server from list ?',
      width:             '400',
      top:               $(window).scrollTop() + 50,
      left:              150,
      modal:             false,
      jqModal:           true,
      closeOnEscape:     true,
      reloadAfterSubmit: true,
      afterComplete:     callbackAfterSubmitForm,
    });
  }
};

$(page$.init);
