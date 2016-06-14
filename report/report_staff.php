<?php

if (!isset($STORES_INFORMATION)) exit();

$DB_FOLDER = MOPO_SERVER_FOLDER.FOLDER_DB_STAFF;
$DB_FILE_INDEX_STAFF = $DB_FOLDER.'/index.tsv';

$yrv = RETURN_INT_GET(YEAR_NAME);
$mnv = RETURN_INT_GET(MONTH_NAME);
$qiv = RETURN_STR_GET(QUERY_ID_NAME);

$CURRENT_STAFF_INDEX = RETURN_FIND_ROW_INDEX($DB_FILE_INDEX_STAFF, $qiv, $STAFF_INFORMATION, TSV_COMMON_ID, $STAFF_INFORMATION_ROWS);

if (-1 != $CURRENT_STAFF_INDEX) {
	if (!empty($yrv)) {
		if (!empty($mnv)) {
			$current_row = &$STAFF_INFORMATION[$CURRENT_STAFF_INDEX];
			$page_title = RETURN_ITEM_GROUP_NAME($CURRENT_STAFF_INDEX, $STAFF_INFORMATION).' / '.$current_row[TSV_COMMON_ID].': '.$current_row[TSV_COMMON_NAME].' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			$a[0] = WEB_API_DUMP_REPORT_ITEM;
			$a[1] = $ACCESS_KEY;
			$a[2] = $SECTION_ID;
			$a[3] = $yrv;
			$a[4] = $mnv;
			$a[5] = QUERY_TYPE_STAFF;
			$a[6] = $qiv;
			UDP_SEND_AND_RECV($a, $ret);
		}
	}
}

PAGE_INIT($page_title);

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);

if ('' != $page_title) {
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '月份';
	$h = RETURN_QUERY_FORM_HEADER('查詢');
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_ID_NAME, $qiv);
	$h .= RETURN_YEAR_OPTIONS($yrv);
	$h .= RETURN_MONTH_OPTIONS($mnv);
	$h .= RETURN_QUERY_FORM_FOOTER();
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
	++$gpi_count;
	
	
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '員工';
	$h = RETURN_QUERY_FORM_HEADER('查詢');
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
	$h .= RETURN_ITEM_OPTIONS($DB_FILE_INDEX_STAFF, $qiv);
	$h .= RETURN_QUERY_FORM_FOOTER();
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
	++$gpi_count;	
}

HEADER_TAB_CLOSE($gpi);
if (SIDE_NAV_INIT('')) {
	if ('' != $page_title) {
		PAGE_ADD('<h1>'.$page_title.'</h1>');
		LIST_REPORT_DATA($current_row[TSV_COMMON_NAME], $DB_FOLDER.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).'/'.$current_row[TSV_COMMON_ID].FILE_TSV_EXT_NAME, '', 0);
	} else {
		$a[0] = WEB_API_DUMP_REPORT_INDEX;
		$a[1] = $ACCESS_KEY;
		$a[2] = $SECTION_ID;
		UDP_SEND_AND_RECV($a, $ret);
		
		PAGE_ADD('<h1>'.$SECTION_TITLE.'</h1>');
		
		REPORT_QUERY_INIT('');
		$qpi_count = 0;
		$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
		$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
		++$qpi_count;
		
		
		$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
		$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
		++$qpi_count;
		
		
		$qpi[$qpi_count][QUERY_PANEL_NAME] = '員工';
		$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_ITEM_OPTIONS($DB_FILE_INDEX_STAFF);
		++$qpi_count;
		
		
		REPORT_QUERY_CLOSE($qpi);
	}
	SIDE_NAV_CLOSE();
}

?>