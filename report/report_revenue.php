<?php

if (!isset($STORES_INFORMATION)) exit();

$DB_FOLDER = MOPO_SERVER_FOLDER.FOLDER_DB_REVENUE;

$yrv = RETURN_INT_GET(YEAR_NAME);
$mnv = RETURN_INT_GET(MONTH_NAME);
$qtv = RETURN_STR_GET(QUERY_TYPE_NAME);

switch ($qtv) {
	case QUERY_TYPE_REVENUE_CLASS:
		$page_title = $SECTION_TITLE.' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
		$a[0] = WEB_API_DUMP_REPORT_ITEM;
		$a[1] = $ACCESS_KEY;
		$a[2] = $SECTION_ID;
		$a[3] = $yrv;
		$a[4] = $mnv;
		$a[5] = $qtv;
		$a[6] = '1';
		UDP_SEND_AND_RECV($a, $ret);
		break;
		
	case QUERY_TYPE_REVENUE:
		$page_title = $SECTION_TITLE.' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
		$a[0] = WEB_API_DUMP_REPORT_ITEM;
		$a[1] = $ACCESS_KEY;
		$a[2] = $SECTION_ID;
		$a[3] = $yrv;
		$a[4] = $mnv;
		$a[5] = $qtv;
		$a[6] = '1';
		UDP_SEND_AND_RECV($a, $ret);
		break;
}


PAGE_INIT($page_title);

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);

if ('' != $page_title) {
	$h = RETURN_QUERY_FORM_HEADER('查詢');
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
	$h .= RETURN_YEAR_OPTIONS($yrv);
	$h .= RETURN_MONTH_OPTIONS($mnv);
	$h .= RETURN_QUERY_FORM_FOOTER();
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '月份';
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
	++$gpi_count;
}

HEADER_TAB_CLOSE($gpi);
if (SIDE_NAV_INIT('')) {
	if ('' != $page_title) {
		switch ($qtv) {
			case QUERY_TYPE_REVENUE_CLASS:
				$TF = $DB_FOLDER.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).'/'.$qtv.FILE_TSV_EXT_NAME;
				PAGE_ADD('<h1>'.$page_title.'</h1>');
				LIST_REPORT_DATA('依班別', $TF, '', '');
				break;
				
			case QUERY_TYPE_REVENUE:
				$TF = $DB_FOLDER.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).'/'.$qtv.'.'.LIST_TYPE_KEY_NAME.FILE_TSV_EXT_NAME;
				$TF_DAY = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_DAY, $TF);
				$TF_WEEK = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_WEEK, $TF);
				$TF_HOUR = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_HOUR, $TF);
				PAGE_ADD('<h1>'.$page_title.'</h1>');
				LIST_REPORT_DATA('依日期', $TF_DAY, '', '');
				LIST_REPORT_DATA('依星期', $TF_WEEK, '', '');
				LIST_REPORT_DATA('依小時', $TF_HOUR, '', '');
				break;
		}
	} else {
		PAGE_ADD('<h1>'.$SECTION_TITLE.'</h1>');
			
		PAGE_ADD('<h2>依班別</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_REVENUE_CLASS));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			REPORT_QUERY_CLOSE($qpi);
		
		PAGE_ADD('<h2>依統計</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_REVENUE));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			REPORT_QUERY_CLOSE($qpi);

	}
	SIDE_NAV_CLOSE();
}

?>