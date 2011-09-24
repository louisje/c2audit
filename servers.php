<?php
	
	require_once "common.php";
	
	switch(getreq('oper')) {
	case 'add':
		$sHost = getreq('host', true, true, true);
		$iPort = getreq('port', true, true, true);
		$sUser = getreq('user', true, true, true);
		$sPass = getreq('pass', true, true, true);
		$sPath = getreq('path', true, true, true);
		$bEnabled = getreq('enabled') ? 1 : 0;
		
		$sQuery = "SELECT count(rowid) FROM servers WHERE host='$sHost' AND port='$iPort' AND user='$sUser'";
		$arrResult = sqlite_query_and_fetch_array($sQuery);
		if ($arrResult[0] > 0)
			exit("Aready Exists");
		
		$sQuery = "INSERT INTO servers (host, port, user, pass, path, updated, enabled) " .
		          "VALUES ('$sHost', '$iPort', '$sUser', '$sPass', '$sPath', datetime('now'), '$bEnabled')";
		sqlite_query_only($sQuery);
		$sVersion = mssql_query_version("$sHost:$iPort", $sUser, $sPass);
		exit($sVersion);
	case 'edit':
		$iRowId = getreq('id', true, true, true);
		$sHost  = getreq('host', true, true, true);
		$iPort  = getreq('port', true, true, true);
		$sUser  = getreq('user', true, true, true);
		$sPass  = getreq('pass', true, true, true);
		$sPath  = getreq('path', true, true, true);
		$bEnabled = getreq('enabled') ? 1 : 0;
		
		$sQuery = "SELECT count(rowid) FROM servers WHERE host='$sHost' AND port='$iPort' AND user='$sUser' AND rowid!='$iRowId'";
		$arrResult = sqlite_query_and_fetch_array($sQuery);
		if ($arrResult[0] > 0)
			exit("Duplicated");
		
		$sQuery = "UPDATE servers SET host='$sHost', port='$iPort', " .
		          "user='$sUser', pass='$sPass', path='$sPath', enabled='$bEnabled', " .
		          "updated=datetime('now')" .
		          "WHERE rowid='$iRowId'";
		sqlite_query_only($sQuery);
		$sVersion = mssql_query_version("$sHost:$iPort", $sUser, $sPass);
		exit($sVersion);
	case 'del':
		$iRowId = getreq('id', true, true, true);
		$sQuery = "DELETE FROM servers WHERE rowid='$iRowId'";
		sqlite_query_only($sQuery);
		exit('OK');
	default:
		$iPage = getreq('page', true);
		$iRowsPerPage = getreq('rows', true);
		$sSorting = trim(getreq('sidx') . " " . getreq('sord'));
		
		$sQuery = "SELECT count(rowid) FROM servers";
		$arrResults = sqlite_query_and_fetch_array($sQuery);
		$iTotal = $arrResults[0];
		$iTotalPages = ((int)($iTotal / $iRowsPerPage)) + 1;
		if ($iTotal <= (($iPage - 1) * $iRowsPerPage))
			$iPage = $iTotalPages;
		$iStart = (($iPage - 1) * $iRowsPerPage);
		
		$sQuery = "SELECT rowid, host, port, user, pass, path, updated, enabled FROM servers ";
		if (!empty($sSorting))
			$sQuery .= "ORDER BY $sSorting ";
		$sQuery .= "LIMIT $iStart, $iRowsPerPage ";
		$arrResults = sqlite_query_and_fetch_all($sQuery);
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
	
