<?php
	
	/**
	 * Constants
	 */
	
	$sTemplateFile = 'template.html';
	$sDBFile       = 'servers.db';
	$sDBDir        = 'db';
	$sSchemaFile   = 'schema.sql';
	
	/**
	 * Utility Functions
	 */
	
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
	
	if (!file_exists($sDBDir) || !is_dir($sDBDir)) {
		exit("Data folder '$sDBDir' is not exists.");
	}
	$sDBPath = "$sDBDir/$sDBFile";
	if ((!file_exists($sDBPath) && is_writable($sDBDir)) || (file_exists($sDBPath) && filesize($sDBPath))) {
		$objSqlite = sqlite_open($sDBPath);
		if ($objSqlite == FALSE)
			exit("Can not open data file. ($sDBPath)");
		if (filesize($sDBPath) == 0) {
			$sQuery = file_get_contents($sSchemaFile);
			sqlite_query($objSqlite, $sQuery, $sErrMsg);
		}
		sqlite_close($objSqlite);
	}
	else {
		exit("Data folder '$sDBDir' is not writable.");
	}
	
?>

<html>
<head>
<link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/themes/smoothness/jquery-ui.css"/>
<link type="text/css" rel="stylesheet" href="jqgrid/ui.jqgrid.css"/>
<script type="text/javascript" src="https://getfirebug.com/firebug-lite.js"></script>
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

