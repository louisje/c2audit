<?php
	
	require_once "common.php";
	
	/**
	 * Check The Enviroment
	 */
	
	$arrExtensions = array (
		'sqlite',
		'mssql',
	);
	foreach ($arrExtensions as $sExtension) {
		if (!extension_loaded($sExtension)) {
			exit("PHP module '$sExtension' is not installed.");
		}
	}
	
	/**
	 * Setup Data File If Needed
	 */
	
	if (!file_exists($cfgDBFolder) || !is_dir($cfgDBFolder)) {
		exit("Data folder '$cfgDBFolder' is not exists.");
	}
	if ((!file_exists($cfgDBPath) && is_writable($cfgDBFolder)) || (file_exists($cfgDBPath) && filesize($cfgDBPath))) {
		$objSqlite = sqlite_open($cfgDBPath);
		if ($objSqlite == FALSE)
			exit("Can not open data file. ($cfgDBPath)");
		if (filesize($cfgDBPath) == 0) {
			$sQuery = file_get_contents($cfgSchemaFile);
			sqlite_query($objSqlite, $sQuery, SQLITE_ASSOC, $sErrMsg);
			if (!empty($sErrMsg))
				exit($sErrMsg);
		}
		sqlite_close($objSqlite);
	}
	else {
		exit("Data folder '$cfgDBFolder' is not writable.");
	}
	
?>

<html>
<head>
<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/themes/smoothness/jquery-ui.css"/>
<link type="text/css" rel="stylesheet" href="jqgrid/ui.jqgrid.css"/>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"></script>
<script type="text/javascript" src="jqgrid/grid.locale-en.js"></script>
<script type="text/javascript" src="jqgrid/jquery.jqGrid.src.js"></script>
<script type="text/javascript" src="main.js"></script>
</head>
<body>
<table id="server_list"></table>
</body>
</html>

