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
	
	function mssql_query_version($sServer, $sUser, $sPass) {
		$objMssql = mssql_connect_or_die($sServer, $sUser, $sPass);
		$arrRow = mssql_query_and_fetch_array($objMssql, "SELECT @@VERSION");
		return isset($arrRow[0]) ? $arrRow[0] : NULL;
	}
	
	function mssql_connect_or_die($sServer, $sUser, $sPassword) {
		$objMssql = @mssql_connect($sServer, $sUser, $sPassword);
		if (!$objMssql)
			exit("Fail to connect MSSql server ($sUser:$sPassword@$sServer)");
		return $objMssql;
	}
	
	function mssql_query_or_die($objMssql, $sQuery) {
		$objResult = mssql_query($sQuery, $objMssql);
		if ($objResult == FALSE)
			exit("Fail to query MSSql ($sQuery)");
		return $objResult;
	}
	
	function mssql_query_and_fetch_array($objMssql, $sQuery) {
		
		$objResult = mssql_query_or_die($objMssql, $sQuery);
		if (mssql_num_rows($objResult) > 0)
			return mssql_fetch_array($objResult, MSSQL_BOTH);
		else
			return NULL;
	}
	
	function mssql_query_and_fetch_all($objMssql, $sQuery, $bFetch = TRUE) {
		
		$objResult = mssql_query_or_die($objMssql, $sQuery);
		if ($bFetch) {
			$arrDataRows = array();
			while ($arrRow = mssql_fetch_array($objResult, MSSQL_BOTH)) {
				array_push($arrDataRows, $arrRow);
			}
			return $arrDataRows;
		}
	}
	
