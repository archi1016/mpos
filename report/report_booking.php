<?php

if (!isset($STORES_INFORMATION)) exit();

$DB_FOLDER = MOPO_SERVER_FOLDER.FOLDER_DB_BOOKING;

$yrv = RETURN_INT_GET(YEAR_NAME);
$mnv = RETURN_INT_GET(MONTH_NAME);
$dyv = RETURN_INT_GET(DAY_NAME);

if (!empty($yrv)) {
	if (!empty($mnv)) {
		if (!empty($dyv)) {
			$page_title = $SECTION_TITLE.' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).'-'.RETURN_CONV_INT_TO_NUM_2X($dyv).')';
		}
	}
}

PAGE_INIT($page_title);

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);

if ('' != $page_title) {
	$h = RETURN_QUERY_FORM_HEADER('查詢');
	$h .= RETURN_YEAR_OPTIONS($yrv);
	$h .= RETURN_MONTH_OPTIONS($mnv);
	$h .= RETURN_DAY_OPTIONS($dyv);
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '日期';
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
	++$gpi_count;
}

HEADER_TAB_CLOSE($gpi);
if (SIDE_NAV_INIT('')) {
	if ('' != $page_title) {
		$a[0] = WEB_API_DUMP_REPORT_ITEM;
		$a[1] = $ACCESS_KEY;
		$a[2] = $SECTION_ID;
		$a[3] = $yrv;
		$a[4] = $mnv;
		$a[5] = '';
		$a[6] = $dyv;
		UDP_SEND_AND_RECV($a, $ret);
		
		$TF = $DB_FOLDER.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).RETURN_CONV_INT_TO_NUM_2X($dyv).FILE_TSV_EXT_NAME;
		PAGE_ADD('<h1>'.$page_title.'</h1>');
		LIST_REPORT_DATA('', $TF, '', '');
	} else {
		PAGE_ADD('<h1>'.$SECTION_TITLE.'</h1>');
			
		REPORT_QUERY_INIT('');
		$qpi_count = 0;
		$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
		$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
		++$qpi_count;
		$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
		$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
		++$qpi_count;
		$qpi[$qpi_count][QUERY_PANEL_NAME] = '日';
		$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_DAY_OPTIONS($dyv);
		++$qpi_count;
		REPORT_QUERY_CLOSE($qpi);

	}
	SIDE_NAV_CLOSE();
}

?>