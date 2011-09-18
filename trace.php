<?php
	
	require_once "common.php";
	
	switch(getreq('oper')) {
	case 'add':
		$iServerId = getreq('serverid', true, true, true);
		$iEventId  = getreq('eventid',  true, true, true);
		$iColumnId = getreq('columnid', true, true, true);
		$bEnabled  = getreq('enabled') ? 1 : 0;
		
		$sQuery = "SELECT count(rowid) FROM trace " .
		          "WHERE serverid='$iServerId' AND eventid='$iEventId' AND columnid='$iColumnId' ";
		$arrResult = sqlite_query_and_fetch_array($sQuery);
		if ($arrResult[0] > 0)
			exit("Already Exists");
		
		$sQuery = "INSERT INTO trace (serverid, eventid, columnid, enabled) " .
		          "VALUES ('$iServerId', '$iEventId', '$iColumnId', '$bEnabled')";
		sqlite_query_only($sQuery);
		exit('OK');
	case 'edit':
		$iRowId    = getreq('id',       true, true, true);
		$iServerId = getreq('serverid', true, true, true);
		$iEventId  = getreq('eventid',  true, true, true);
		$iColumnId = getreq('columnid', true, true, true);
		$bEnabled  = getreq('enabled') ? 1 : 0;
		
		$sQuery = "SELECT count(rowid) FROM trace " .
		          "WHERE serverid='$iServerId' AND eventid='$iEventId' AND columnid='$iColumnId' " .
		          "AND rowid!='$iRowId'";
		$arrResult = sqlite_query_and_fetch_array($sQuery);
		if ($arrResult[0] > 0)
			exit("Duplicated");
		
		$sQuery = "UPDATE trace SET eventid='$iEventId', columnid='$iColumnId', " .
		          "enabled='$bEnabled' WHERE rowid='$iRowId'";
		sqlite_query_only($sQuery);
		exit('OK');
	case 'del':
		$iRowId = getreq('id', true, true, true);
		$sQuery = "DELETE FROM trace WHERE rowid='$iRowId'";
		sqlite_query_only($sQuery);
		exit('OK');
	default:
		$iPage = getreq('page', true);
		$iRowsPerPage = getreq('rows', true);
		$sSorting = trim(getreq('sidx') . " " . getreq('sord'));
		
		$iServerId = getreq('serverid', true, true, true);
		$sQuery = "SELECT count(rowid) FROM trace WHERE serverid='$iServerId'";
		$arrResults = sqlite_query_and_fetch_array($sQuery);
		$iTotal = $arrResults[0];
		$iTotalPages = ((int)($iTotal / $iRowsPerPage)) + 1;
		if ($iTotal <= (($iPage - 1) * $iRowsPerPage))
			$iPage = $iTotalPages;
		$iStart = (($iPage - 1) * $iRowsPerPage);
		
		$sQuery = "SELECT rowid, serverid, eventid, columnid, enabled FROM trace WHERE serverid='$iServerId' ";
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
				$arrColumns['serverid'],
				$arrColumns['eventid'],
				$arrColumns['columnid'],
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
	
