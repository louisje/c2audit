<?php
	
	
	/**
	 * Utility Functions
	 */
	
	
	/**
	 * Check The Enviroment
	 */
	
	$arrExtensions = array (
		'sqlite',
		'sybase',
		'qoo',
	);
	
	foreach ($arrExtensions as $sExtension) {
		if (!extension_loaded($sExtension)) {
			exit("PHP module '$sExtension' is not loaded.");
		}
	}
	
	/**
	 * Setup The Enviroment If Needed
	 */
	
	if (empty($_GET['_search'])) {
		$sTemplateFile = 'template.html';
		header('Content-Type: text/html');
		readfile($sTemplateFile);
		exit();
	}
	
	
	
	
	
