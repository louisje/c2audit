<?php
	
	require_once "common.php";
	
	$objSqlite = sqlite_open($cfgDBPath);
	if ($objSqlite == FALSE)
		exit("Can not open data file.");
	
	switch(@$_REQUEST['oper']) {
	case 'add':
		$sHost = sqlite_escape_string($_REQUEST['host']);
		$iPort = sqlite_escape_string($_REQUEST['port']);
		$sUser = sqlite_escape_string($_REQUEST['user']);
		$sPass = sqlite_escape_string($_REQUEST['pass']);
		$sPath = sqlite_escape_string($_REQUEST['path']);
		$bEnabled = sqlite_escape_string($_REQUEST['enabled']);
		
		$sQuery = "SELECT count(rowid) FROM servers WHERE host='$sHost' AND port='$iPort' AND user='$sUser'";
		$arrResult = sqlite_query_and_fetch_array($sQuery);
		if ($arrResult[0] > 0)
			exit("Aready Exists");
		
		$sQuery = "INSERT INTO servers (host, port, user, pass, path, updated, enabled) " .
		          "VALUES ('$sHost', '$iPort', '$sUser', '$sPass', '$sPath', datetime('now'), '$bEnabled')";
		sqlite_query($objSqlite, $sQuery);
		exit('OK');
	case 'edit':
		$iRowId = sqlite_escape_string($_REQUEST['id']);
		$sHost  = sqlite_escape_string($_REQUEST['host']);
		$iPort  = sqlite_escape_string($_REQUEST['port']);
		$sUser  = sqlite_escape_string($_REQUEST['user']);
		$sPass  = sqlite_escape_string($_REQUEST['pass']);
		$sPath  = sqlite_escape_string($_REQUEST['path']);
		$bEnabled = sqlite_escape_string($_REQUEST['enabled']);
		$sQuery = "UPDATE servers SET host='$sHost', port='$iPort', " .
		          "user='$sUser', pass='$sPass', path='$sPath', enabled='$bEnabled' " .
		          "updated=datetime('now')" .
		          "WHERE rowid='$iRowId'";
		sqlite_query($objSqlite, $sQuery);
		exit('OK');
	case 'del':
		exit('OK');
	default:
		$iPage = $_REQUEST['page'];
		if (empty($iPage))
			exit("Parameter 'page'");
		$iRowsPerPage = $_REQUEST['rows'];
		if (empty($iRowsPerPage))
			exit("Parameter 'rows'");
		$sSorting = trim($_REQUEST['sidx'] . " " . $_REQUEST['sord']);
		
		$sQuery = "SELECT count(rowid) FROM servers";
		$objResult = sqlite_query($objSqlite, $sQuery, SQLITE_NUM, $sErrMsg);
		if (!empty($sErrMsg))
			exit($sErrMsg);
		$arrColumns = sqlite_fetch_array($objResult);
		$iTotal = $arrColumns[0];
		$iTotalPages = ((int)($iTotal / $iRowsPerPage)) + 1;
		if ($iTotal <= (($iPage - 1) * $iRowsPerPage))
			$iPage = $iTotalPages;
		$iStart = (($iPage - 1) * $iRowsPerPage);
		
		$sQuery = "SELECT rowid, host, port, user, pass, path, updated, enabled FROM servers ";
		if (!empty($sSorting))
			$sQuery .= "ORDER BY $sSorting ";
		$sQuery .= "LIMIT $iStart, $iRowsPerPage ";
		$objResult = sqlite_query($objSqlite, $sQuery);
		$arrResults = sqlite_fetch_all($objResult, SQLITE_ASSOC);
		$arrGrid = array (
			'page'    => $iPage,
			'total'   => $iTotalPages,
			'records' => $iTotal,
			'rows'    => array (),
		);
		foreach ($arrResults as $arrColumns) {
			$arrCell = array (
				$arrColumns['host'],
				$arrColumns['port'],
				$arrColumns['user'],
				$arrColumns['pass'],
				$arrColumns['path'],
				$arrColumns['updated'],
				$arrColumns['enabled'],
			);
			$arrRows = array (
				'id'   => $arrColumns['rowid'],
				'cell' => $arrCell,
			);
			array_push($arrGrid['rows'], $arrRows);
		}
		$sJsonGrid = json_encode($arrGrid);
		header("Content-Type: application/json");
		exit($sJsonGrid);
	}
	
