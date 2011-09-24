/**
 * main.js
 */

var columnMapping = {
  '1':  "[1] gTextData",
  '2':  "[2] gBinaryData",
  '3':  "[3] gDatabaseID",
  '4':  "[4] gTransactionID",
  '5':  "[5] gLineNumber",
  '6':  "[6] gNTUserName",
  '7':  "[7] gNTDomainName",
  '8':  "[8] gHostName",
  '9':  "[9] gClientProcessID",
  '10': "[10] gApplicationName",
  '11': "[11] gLoginName",
  '12': "[12] gSPID",
  '13': "[13] gDuration",
  '14': "[14] gStartTime",
  '15': "[15] gEndTime",
  '16': "[16] gReads",
  '17': "[17] gWrites",
  '18': "[18] gCPU",
  '19': "[19] gPermissions",
  '20': "[20] gSeverity",
  '21': "[21] gEventSubClass",
  '22': "[22] gObjectID",
  '23': "[23] gSuccess",
  '24': "[24] gServerName",
  '25': "[25] gIntegerData",
  '26': "[26] gServerName",
  '27': "[27] gEventClass",
  '28': "[28] gObjectType",
  '29': "[29] gNestLevel",
  '30': "[30] gState",
  '31': "[31] gError",
  '32': "[32] gMode",
  '33': "[33] gHandle",
  '34': "[34] gObjectName",
  '35': "[35] gDatabaseName",
  '36': "[36] gFileName",
  '37': "[37] gOwnerName",
  '38': "[38] gRoleName",
  '39': "[39] gTargetUserName",
  '40': "[40] gDBUserName",
  '41': "[41] gLoginSid",
  '42': "[42] gTargetLoginName",
  '43': "[43] gTargetLoginSid",
  '44': "[44] gColumnPermissions",
  '45': "[45] gLinkedServerName",
  '46': "[46] gProviderName",
  '47': "[47] gMethodName",
  '48': "[48] gRowCounts",
  '49': "[49] gRequestID",
  '50': "[50] gXactSequence",
  '51': "[51] gEventSequence",
  '52': "[52] gBigintData1",
  '53': "[53] gBigintData2",
  '54': "[54] gGUID",
  '55': "[55] gIntegerData2",
  '56': "[56] gObjectID2",
  '57': "[57] gType",
  '58': "[58] gOwnerID",
  '59': "[59] gParentName",
  '60': "[60] gIsSystem",
  '61': "[61] gOffset",
  '62': "[62] gSourceDatabaseID",
  '63': "[63] gSqlHandle",
  '64': "[64] gSessionLoginName"
};

var eventMapping = {
  '0':   "[0] Reserved",
  '1':   "[1] Reserved",
  '2':   "[2] Reserved",
  '3':   "[3] Reserved",
  '4':   "[4] Reserved",
  '5':   "[5] Reserved",
  '6':   "[6] Reserved",
  '7':   "[7] Reserved",
  '8':   "[8] Reserved",
  '9':   "[9] Reserved",
  '10':  "[10] RPC:Completed",
  '11':  "[11] RPC:Starting",
  '12':  "[12] SQL:BatchCompleted",
  '13':  "[13] SQL:BatchStarting",
  '14':  "[14] Audit Login",
  '15':  "[15] Audit Logout",
  '16':  "[16] Attention",
  '17':  "[17] ExistingConnection",
  '18':  "[18] Audit Server Starts and Stops",
  '19':  "[19] DTCTransaction",
  '20':  "[20] Audit Login Failed",
  '21':  "[21] EventLog",
  '22':  "[22] ErrorLog",
  '23':  "[23] Lock:Released",
  '24':  "[24] Lock:Acquired",
  '25':  "[25] Lock:Deadlock",
  '26':  "[26] Lock:Cancel",
  '27':  "[27] Lock:Timeout",
  '28':  "[28] Degree of Parallelism Event (7.0 Insert)",
  '29':  "[29] Reserved",
  '30':  "[30] Reserved",
  '31':  "[31] Reserved",
  '32':  "[32] Reserved",
  '33':  "[33] Exception",
  '34':  "[34] SP:CacheMiss",
  '35':  "[35] SP:CacheInsert",
  '36':  "[36] SP:CacheRemove",
  '37':  "[37] SP:Recompile",
  '38':  "[38] SP:CacheHit",
  '39':  "[39] Deprecated",
  '40':  "[40] SQL:StmtStarting",
  '41':  "[41] SQL:StmtCompleted",
  '42':  "[42] SP:Starting",
  '43':  "[43] SP:Completed",
  '44':  "[44] SP:StmtStarting",
  '45':  "[45] SP:StmtCompleted",
  '46':  "[46] Object:Created",
  '47':  "[47] Object:Deleted",
  '48':  "[48] Reserved",
  '49':  "[49] Reserved",
  '50':  "[50] SQL Transaction",
  '51':  "[51] Scan:Started",
  '52':  "[52] Scan:Stopped",
  '53':  "[53] CursorOpen",
  '54':  "[54] TransactionLog",
  '55':  "[55] Hash Warning",
  '56':  "[57] Reserved",
  '56':  "[57] Reserved",
  '58':  "[58] Auto Stats",
  '59':  "[59] Lock:Deadlock Chain",
  '60':  "[60] Lock:Escalation",
  '61':  "[61] OLE DB Errors",
  '62':  "[62] Reserved",
  '63':  "[63] Reserved",
  '64':  "[64] Reserved",
  '65':  "[65] Reserved",
  '66':  "[66] Reserved",
  '67':  "[67] Execution Warnings",
  '68':  "[68] Showplan Text (Unencoded)",
  '69':  "[69] Sort Warnings",
  '70':  "[70] CursorPrepare",
  '71':  "[71] Prepare SQL",
  '72':  "[72] Exec Prepared SQL",
  '73':  "[73] Unprepare SQL",
  '74':  "[74] CursorExecute",
  '75':  "[75] CursorRecompile",
  '76':  "[76] CursorImplicitConversion",
  '77':  "[77] CursorUnprepare",
  '78':  "[78] CursorClose",
  '79':  "[79] Missing Column Statistics",
  '80':  "[80] Missing Join Predicate",
  '81':  "[81] Server Memory Change",
  '82':  "[82] User Configurable (0)",
  '83':  "[83] User Configurable (1)",
  '84':  "[84] User Configurable (2)",
  '85':  "[85] User Configurable (3)",
  '86':  "[86] User Configurable (4)",
  '87':  "[87] User Configurable (5)",
  '88':  "[88] User Configurable (6)",
  '89':  "[89] User Configurable (7)",
  '90':  "[90] User Configurable (8)",
  '91':  "[91] User Configurable (9)",
  '92':  "[92] Data File Auto Grow",
  '93':  "[93] Log File Auto Grow",
  '94':  "[94] Data File Auto Shrink",
  '95':  "[95] Log File Auto Shrink",
  '96':  "[96] Showplan Text",
  '97':  "[97] Showplan All",
  '98':  "[98] Showplan Statistics Profile",
  '99':  "[99] Reserved",
  '100': "[100] RPC Output Parameter",
  '101': "[101] Reserved",
  '102': "[102] Audit Statement GDR Event",
  '103': "[103] Audit Object GDR Event",
  '104': "[104] Audit AddLogin Event",
  '105': "[105] Audit Login GDR Event",
  '106': "[106] Audit Login Change Property Event",
  '107': "[107] Audit Login Change Password Event",
  '108': "[108] Audit Add Login to Server Role Event",
  '109': "[109] Audit Add DB User Event",
  '110': "[110] Audit Add Member to DB Role Event",
  '111': "[111] Audit Add Role Event",
  '112': "[112] Audit App Role Change Password Event",
  '113': "[113] Audit Statement Permission Event",
  '114': "[114] Audit Schema Object Access Event",
  '115': "[115] Audit Backup/Restore Event",
  '116': "[116] Audit DBCC Event",
  '117': "[117] Audit Change Audit Event",
  '118': "[118] Audit Object Derived Permission Event",
  '119': "[119] OLEDB Call Event",
  '120': "[120] OLEDB QueryInterface Event",
  '121': "[121] OLEDB DataRead Event",
  '122': "[122] Showplan XML",
  '123': "[123] SQL:FullTextQuery",
  '124': "[124] Broker:Conversation",
  '125': "[125] Deprecation Announcement",
  '126': "[126] Deprecation Final Support",
  '127': "[127] Exchange Spill Event",
  '128': "[128] Audit Database Management Event",
  '129': "[129] Audit Database Object Management Event",
  '130': "[130] Audit Database Principal Management Event",
  '131': "[131] Audit Schema Object Management Event",
  '132': "[132] Audit Server Principal Impersonation Event",
  '133': "[133] Audit Database Principal Impersonation Event",
  '134': "[134] Audit Server Object Take Ownership Event",
  '135': "[135] Audit Database Object Take Ownership Event",
  '136': "[136] Broker:Conversation Group",
  '137': "[137] Blocked Process Report",
  '138': "[138] Broker:Connection",
  '139': "[139] Broker:Forwarded Message Sent",
  '140': "[140] Broker:Forwarded Message Dropped",
  '141': "[141] Broker:Message Classify",
  '142': "[142] Broker:Transmission",
  '143': "[143] Broker:Queue Disabled",
  '144': "[144] Reserved",
  '145': "[145] Reserved",
  '146': "[146] Showplan XML Statistics Profile",
  '148': "[148] Deadlock Graph",
  '149': "[149] Broker:Remote Message Acknowledgement",
  '150': "[150] Trace File Close",
  '151': "[151] Reserved",
  '152': "[152] Audit Change Database Owner",
  '153': "[153] Audit Schema Object Take Ownership Event",
  '154': "[154] Reserved",
  '155': "[155] FT:Crawl Started",
  '156': "[156] FT:Crawl Stopped",
  '157': "[157] FT:Crawl Aborted",
  '158': "[158] Audit Broker Conversation",
  '159': "[159] Audit Broker Login",
  '160': "[160] Broker:Message Undeliverable",
  '161': "[161] Broker:Corrupted Message",
  '162': "[162] User Error Message",
  '163': "[163] Broker:Activation",
  '164': "[164] Object:Altered",
  '165': "[165] Performance statistics",
  '166': "[166] SQL:StmtRecompile",
  '167': "[167] Database Mirroring State Change",
  '168': "[168] Showplan XML For Query Compile",
  '169': "[169] Showplan All For Query Compile",
  '170': "[170] Audit Server Scope GDR Event",
  '171': "[171] Audit Server Object GDR Event",
  '172': "[172] Audit Database Object GDR Event",
  '173': "[173] Audit Server Operation Event",
  '175': "[175] Audit Server Alter Trace Event",
  '176': "[176] Audit Server Object Management Event",
  '177': "[177] Audit Server Principal Management Event",
  '178': "[178] Audit Database Operation Event",
  '180': "[180] Audit Database Object Access Event",
  '181': "[181] TM: Begin Tran starting",
  '182': "[182] TM: Begin Tran completed",
  '183': "[183] TM: Promote Tran starting",
  '184': "[184] TM: Promote Tran completed",
  '185': "[185] TM: Commit Tran starting",
  '186': "[186] TM: Commit Tran completed",
  '187': "[187] TM: Rollback Tran starting",
  '188': "[188] TM: Rollback Tran completed",
  '189': "[189] Lock:Timeout (timeout > 0)",
  '190': "[190] Progress Report: Online Index Operation",
  '191': "[191] TM: Save Tran starting",
  '192': "[192] TM: Save Tran completed",
  '193': "[193] Background Job Error",
  '194': "[194] OLEDB Provider Information",
  '195': "[195] Mount Tape",
  '196': "[196] Assembly Load",
  '197': "[197] Reserved",
  '198': "[198] XQuery Static Type",
  '199': "[199] QN: subscription",
  '200': "[200] QN: parameter table",
  '201': "[201] QN: template",
  '202': "[202] QN: dynamics"
};

var callbackAfterSubmitForm = function(response, postData, formId) {
  if (response.responseText != 'OK') {
    if (response.responseText.length > 1000 || response.responseText.length == 0)
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
        width:     250,
        hidden:    false,
        sortable:  true,
        editable:  true,
        edittype:  'select',
        formatter: 'select',
        editoptions: {
          value:     eventMapping,
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
        width:     250,
        hidden:    false,
        sortable:  true,
        editable:  true,
        edittype:  'select',
        formatter: 'select',
        editoptions: {
          value:     columnMapping,
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
        width:             600,
        top:               $(window).scrollTop() + 50,
        left:              100,
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
      width:             600,
      top:               $(window).scrollTop() + 50,
      left:              100,
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
      width:             400,
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
      width:             400,
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
      width:             400,
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
