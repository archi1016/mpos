<?php

require('func.php');

CHECK_ACCESS_KEY();
	
$a[0] = WEB_API_QUERY_REPORT;
$a[1] = $ACCESS_KEY;
$a[2] = $SECTION_ID;	
UDP_SEND_AND_RECV($a, $ret);
	
$kwv = RETURN_STR_GET(KEYWORD_NAME);
$ftv = RETURN_STR_GET(FILTER_TYPE_NAME);
$kwv = str_replace('&', '&amp;', $kwv);

$page_title = '';

require($phpfile = 'report_'.$SECTION_ID.'.php');

PAGE_FOOTER();
PAGE_OUTPUT();

?>