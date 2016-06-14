<?php

if (!isset($STORES_INFORMATION)) exit();

$DB_FOLDER = MOPO_SERVER_FOLDER.FOLDER_DB_AGE;
$DB_FILE_INDEX_AGE = $DB_FOLDER.'/index_'.QUERY_TYPE_AGE.FILE_TSV_EXT_NAME;
$DB_FILE_INDEX_AGE_GROUP = $DB_FOLDER.'/index_'.QUERY_TYPE_AGE_GROUP.FILE_TSV_EXT_NAME;

$yrv = RETURN_INT_GET(YEAR_NAME);
$mnv = RETURN_INT_GET(MONTH_NAME);
$qtv = RETURN_STR_GET(QUERY_TYPE_NAME);
$qiv = RETURN_STR_GET(QUERY_ID_NAME);

switch ($qtv) {
	case QUERY_TYPE_AGE:
		$CURRENT_AGE_INDEX = RETURN_FIND_ROW_INDEX($DB_FILE_INDEX_AGE, $qiv, $AGE_INFORMATION, TSV_COMMON_ID, $AGE_INFORMATION_ROWS);
		if (-1 != $CURRENT_AGE_INDEX) {
			$current_row = $AGE_INFORMATION[$CURRENT_AGE_INDEX];
			$page_title = $current_row[TSV_COMMON_ID].': '.$current_row[TSV_COMMON_NAME].' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			$a[0] = WEB_API_DUMP_REPORT_ITEM;
			$a[1] = $ACCESS_KEY;
			$a[2] = $SECTION_ID;
			$a[3] = $yrv;
			$a[4] = $mnv;
			$a[5] = $qtv;
			$a[6] = $qiv;
			UDP_SEND_AND_RECV($a, $ret);
		}
		break;
		
	case QUERY_TYPE_AGE_GROUP:
		$CURRENT_AGE_GROUP_INDEX = RETURN_FIND_ROW_INDEX($DB_FILE_INDEX_AGE_GROUP, $qiv, $AGE_GROUP_INFORMATION, TSV_COMMON_ID, $AGE_GROUP_INFORMATION_ROWS);
		if (-1 != $CURRENT_AGE_GROUP_INDEX) {
			$current_row = $AGE_GROUP_INFORMATION[$CURRENT_AGE_GROUP_INDEX];
			$page_title = RETURN_ITEM_GROUP_NAME($CURRENT_AGE_GROUP_INDEX, $AGE_GROUP_INFORMATION).' / '.$current_row[TSV_COMMON_NAME].' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			$a[0] = WEB_API_DUMP_REPORT_GROUP;
			$a[1] = $ACCESS_KEY;
			$a[2] = $SECTION_ID;
			$a[3] = $yrv;
			$a[4] = $mnv;
			$a[5] = $qtv;
			$a[6] = str_replace('.', "\t", $qiv);
			UDP_SEND_AND_RECV($a, $ret);
		}
		break;
}


PAGE_INIT($page_title);

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);

if ('' != $page_title) {
	$h = RETURN_QUERY_FORM_HEADER('查詢');
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_ID_NAME, $qiv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(KEYWORD_NAME, $kwv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(FILTER_TYPE_NAME, $ftv);
	$h .= RETURN_YEAR_OPTIONS($yrv);
	$h .= RETURN_MONTH_OPTIONS($mnv);
	$h .= RETURN_QUERY_FORM_FOOTER();
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '月份';
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
	++$gpi_count;

	switch ($qtv) {
		case QUERY_TYPE_AGE:
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '依品項';
			$h = RETURN_QUERY_FORM_HEADER('查詢');
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
			$h .= RETURN_ITEM_OPTIONS($DB_FILE_INDEX_AGE, $qiv);
			$h .= RETURN_QUERY_FORM_FOOTER();
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
			++$gpi_count;
			break;
			
		case QUERY_TYPE_AGE_GROUP:
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '依欄位';
			$h = RETURN_QUERY_FORM_HEADER('查詢');
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(KEYWORD_NAME, $kwv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(FILTER_TYPE_NAME, $ftv);
			$h .= RETURN_ITEM_OPTIONS($DB_FILE_INDEX_AGE_GROUP, $qiv);
			$h .= RETURN_QUERY_FORM_FOOTER();
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
			++$gpi_count;
					
			$more_args = RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
			$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_ID_NAME, $qiv);
			$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
			$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '過濾';
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = RETURN_FILTER_GROUP_MODULE($kwv, $ftv, $more_args);
			++$gpi_count;
			break;
	}
}

HEADER_TAB_CLOSE($gpi);
if (SIDE_NAV_INIT('')) {
	if ('' != $page_title) {
		$TF = $DB_FOLDER.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).'/'.$qtv.'.'.LIST_TYPE_KEY_NAME.'.'.$qiv.FILE_TSV_EXT_NAME;
		$TF_DAY = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_DAY, $TF);
		$TF_WEEK = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_WEEK, $TF);
		$TF_HOUR = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_HOUR, $TF);
		PAGE_ADD('<h1>'.$page_title.'</h1>');
		LIST_REPORT_DATA('依日期', $TF_DAY, $kwv, $ftv);
		LIST_REPORT_DATA('依星期', $TF_WEEK, $kwv, $ftv);
		LIST_REPORT_DATA('依小時', $TF_HOUR, $kwv, $ftv);
	} else {
		$a[0] = WEB_API_DUMP_REPORT_INDEX;
		$a[1] = $ACCESS_KEY;
		$a[2] = $SECTION_ID;
		UDP_SEND_AND_RECV($a, $ret);
		
		PAGE_ADD('<h1>'.$SECTION_TITLE.'</h1>');
			
		PAGE_ADD('<h2>依品項</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_AGE));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '項目';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_ITEM_OPTIONS($DB_FILE_INDEX_AGE);
			++$qpi_count;
			REPORT_QUERY_CLOSE($qpi);
		
		PAGE_ADD('<h2>依欄位</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_AGE_GROUP));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '項目';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_ITEM_OPTIONS($DB_FILE_INDEX_AGE_GROUP);
			++$qpi_count;
			REPORT_QUERY_CLOSE($qpi);

	}
	SIDE_NAV_CLOSE();
}

?>