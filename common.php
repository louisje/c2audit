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
	
	function getreq($sName, $bForced = FALSE, $bEscape = FALSE, $bNoneEmpty = FALSE) {
		if (isset($_REQUEST[$sName])) {
			$sValue = trim($_REQUEST[$sName]);
			if (strlen($sValue) == 0 && $bNoneEmpty)
				exit("'$sName' can not be empty.");
			if ($bEscape)
				return sqlite_escape_string($sValue);
			else
				return $sValue;
		} else {
			if ($bForced)
				exit("Missing parameter '$sName'.");
			else
				return NULL;
		}
	}
	
	function sqlite_query_only($sQuery) {
		sqlite_query_and_fetch_all($sQuery, FALSE);
	}
	
	function sqlite_query_and_fetch_array($sQuery) {
		$arrDataRows = sqlite_query_and_fetch_all($sQuery);
		if (count($arrDataRows) > 0)
			return $arrDataRows[0];
		else
			return NULL;
	}
	
	function sqlite_query_and_fetch_all($sQuery, $bFetch = TRUE) {
		
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
		if ($bFetch)
			return sqlite_fetch_all($objResult);
	}
	
