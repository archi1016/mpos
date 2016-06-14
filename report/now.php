<?php

require('func.php');

CHECK_ACCESS_KEY();

$a[0] = WEB_API_QUERY_NOW;
$a[1] = $ACCESS_KEY;
$a[2] = $SECTION_ID;
UDP_SEND_AND_RECV($a, $ret);
	
$kwv = RETURN_STR_GET(KEYWORD_NAME);
$ftv = RETURN_STR_GET(FILTER_TYPE_NAME);
$kwv = str_replace('&', '&amp;', $kwv);

PAGE_INIT('');

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);
			
$gpi[$gpi_count][GROUP_PANEL_NAME] = '¹LÂo';
$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = RETURN_FILTER_GROUP_MODULE($kwv, $ftv, '');
++$gpi_count;
	
HEADER_TAB_CLOSE($gpi);
if (SIDE_NAV_INIT('')) {
	LIST_REPORT_DATA($SECTION_TITLE, RETURN_FULL_TSV_FILE_PATH($ret[1]), $kwv, $ftv);
	SIDE_NAV_CLOSE();
}

PAGE_FOOTER();
PAGE_OUTPUT();

?>