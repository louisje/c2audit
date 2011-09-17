<?php
	
	/**
	 * Constants
	 */
	
	$sDBFile = 'servers.db';
	
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
	
	if (!file_exists($sDBFile)) {
		exit("Data file '$sDBFile' is not existing.<br/>You need to create one (# sqlite $sDBFile) and make it writable.");
	}
	if (!is_writable($sDBFile)) {
		exit("Data file is not writable. (# chmod a+w $sDBFile)");
	}
	if (($objSqlite = sqlite_open()) == FALSE) {
		exit("Failed to open data file. ($sDBFile)");
	}
	
	/**
	 * Setup The Enviroment If Needed
	 */
	
	/**
	 * Serve Page
	 */
	
	$sTemplateFile = 'template.html';
	header('Content-Type: text/html');
	readfile($sTemplateFile);
	exit();
	
	
	
	
	
