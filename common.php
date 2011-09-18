<?php
	
	/**
	 * Constants
	 */
	
	$cfgDBFile     = 'servers.db';
	$cfgDBFolder   = 'db';
	$cfgDBPath     = "$cfgDBFolder/$cfgDBFile";
	$cfgSchemaFile = 'schema.sql';
	
	/**
	 * Uitilities Functions
	 */
	
	function sqlite_query_and_fetch_array($sQuery) {
		$arrDataRows = sqlite_query_and_fetch_all($sQuery);
		if (count($arrDataRows) > 0)
			return $arrDataRows[0];
		else
			return NULL;
	}
	
	function sqlite_query_and_fetch_all($sQuery) {
		
		global $cfgDBPath;
		
		static $objSqlite = NULL;
		if ($objSqlite == NULL) {
			$objSqlite = sqlite_open($cfgDBPath);
			if ($objSqlite == FALSE)
				exit("Can not open data file.");
		}
		
		$objResult = sqlite_query($objSqlite, $sQuery, SQLITE_BOTH, $sErrMsg);
		if (!empty($sErrMsg))
			exit($sErrMsg);
		else if ($objResult == FALSE)
			exit("Sqlite Error!");
		return sqlite_fetch_all($objResult);
	}
	
