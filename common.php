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
	
	/**
	 * SQLite Functions
	 */
	
	function sqlite_query_only($sQuery) {
		sqlite_query_and_fetch_all($sQuery, FALSE);
	}
	
	function sqlite_query_and_fetch_array($sQuery) {
		$arrDataRows = sqlite_query_and_fetch_all($sQuery);
		if (count($arrDataRows) > 0)
			return $arrDataRows[0];
		else
			return array();
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
	
	/**
	 * MSSql Functions
	 */
	
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
		$objResult = @mssql_query($sQuery, $objMssql);
		if ($objResult == FALSE)
			exit("Fail to query MSSql ($sQuery):\n" . mssql_get_last_message());
		return $objResult;
	}
	
	function mssql_query_and_fetch_array($objMssql, $sQuery) {
		
		$objResult = mssql_query_or_die($objMssql, $sQuery);
		if (mssql_num_rows($objResult) > 0)
			return mssql_fetch_array($objResult, MSSQL_BOTH);
		else
			return array();
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
	
	function mssql_escape($data) {
		if(is_numeric($data))
			return $data;
		// Qoo: escape
		return $data;
	}
	
	/**
	 * Audit Functions
	 */
	
	function audit_trace_getinfo($objMssql) {
		return mssql_query_and_fetch_all($objMssql, "SELECT traceid, CONVERT(nvarchar(1000),value) as filename FROM ::fn_trace_getinfo(0) WHERE property=2 AND traceid!=1");
	}
	
	function audit_turn_off($objMssql, $iAuditId) {
		mssql_query_or_die($objMssql, "EXEC sp_trace_setstatus $iAuditId, 0");
		mssql_query_or_die($objMssql, "EXEC sp_trace_setstatus $iAuditId, 2");
	}
	
	function audit_new_filename($objMssql, $sPath) {
		
		$sQuery = "SELECT '" . mssql_escape($sPath) . "'+REPLACE(REPLACE(REPLACE(CONVERT(VARCHAR(19), getdate(), 120),':',''),' ',''),'-','') ";
		$arr = mssql_query_and_fetch_array($objMssql, $sQuery);
		return $arr[0];
	}
	
	function audit_new_enable($objMssql, $sNewFilename) {
		$sQuery = "DECLARE @rc int, @traceid int; EXEC @rc = sp_trace_create @traceid OUTPUT, 0, N'$sNewFilename'; SELECT @traceid, @rc";
		$arr = mssql_query_and_fetch_array($objMssql, $sQuery);
		return $arr[0];
	}
	
	function audit_set_event_type($objMssql, $iAuditId, $arrSettings) {
		$sQuery = "";
		foreach ($arrSettings as $arrRow) {
			$iEventId = $arrRow['eventid'];
			$iColumnId = $arrRow['columnid'];
			$iEnabled = $arrRow['enabled'];
			$sQuery .= "EXEC sp_trace_setevent $iAuditId, $iEventId, $iColumnId, $iEnabled; ";
		}
		mssql_query_or_die($objMssql, $sQuery);
	}
	
	function audit_turn_on($objMssql, $iAuditId) {
		$sQuery = "DECLARE @rc int; EXEC @rc = sp_trace_setstatus $iAuditId, 1; SELECT @rc";
		mssql_query_or_die($objMssql, $sQuery);
	}
	
	function audit_get_trace_table($objMssql, $sFilename) {
		$sQuery = "SELECT CAST(textdata as text) as textdata, applicationname, loginname, duration, starttime, endtime, cpu, ntusername, hostname FROM ::fn_trace_gettable('" . mssql_escape($sFilename) . "', default)";
		return mssql_query_and_fetch_all($objMssql, $sQuery);
	}
	
