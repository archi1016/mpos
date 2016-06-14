<?php

require('func.php');

CHECK_ACCESS_KEY();

$a[0] = WEB_API_QUERY_LOG;
$a[1] = $ACCESS_KEY;
$a[2] = $SECTION_ID;	
UDP_SEND_AND_RECV($a, $ret);
		
$kwv = RETURN_STR_GET(KEYWORD_NAME);
$ftv = RETURN_STR_GET(FILTER_TYPE_NAME);
$yrv = RETURN_INT_GET(YEAR_NAME);
$mnv = RETURN_INT_GET(MONTH_NAME);
$dyv = RETURN_INT_GET(DAY_NAME);
$kwv = str_replace('&', '&amp;', $kwv);

$page_title = '';
if (!empty($yrv)) {
	if (!empty($mnv)) {
		if (!empty($dyv)) {
			if ($dyv != -1) {
				$page_title = $yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).'-'.RETURN_CONV_INT_TO_NUM_2X($dyv).' - '.$SECTION_TITLE;
			} else {
				$page_title = $yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).' (整月) - '.$SECTION_TITLE;
			}
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
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(KEYWORD_NAME, $kwv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(FILTER_TYPE_NAME, $ftv);
	$h .= RETURN_QUERY_FORM_FOOTER();
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '日期';
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
	++$gpi_count;

	$more_args = RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
	$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
	$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(DAY_NAME, $dyv);
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '過濾';
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = RETURN_FILTER_GROUP_MODULE($kwv, $ftv, $more_args);
	++$gpi_count;
}
		
HEADER_TAB_CLOSE($gpi);
	
if ('' != $page_title) {
	if (SIDE_NAV_INIT('&amp;'.YEAR_NAME.'='.$yrv.'&amp;'.MONTH_NAME.'='.$mnv.'&amp;'.DAY_NAME.'='.$dyv.'&amp;'.KEYWORD_NAME.'='.$kwv.'&amp;'.FILTER_TYPE_NAME.'='.$ftv)) {
		LIST_LOG_DATA($page_title, $yrv, $mnv, $dyv, $kwv, $ftv);
		SIDE_NAV_CLOSE();
	}
} else {
	if (SIDE_NAV_INIT('')) {
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
		
		SIDE_NAV_CLOSE();
	}
}

PAGE_FOOTER();
PAGE_OUTPUT();

?>