<?php

require('func.php');

CHECK_ACCESS_KEY();

$a[0] = WEB_API_QUERY_TOOL;
$a[1] = $ACCESS_KEY;
$a[2] = $SECTION_ID;	
UDP_SEND_AND_RECV($a, $ret);

$page_title = '';


PAGE_INIT($page_title);

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);
	
HEADER_TAB_CLOSE($gpi);
	
if ('' != $page_title) {

} else {
	if (SIDE_NAV_INIT('')) {
		PAGE_ADD('<h1>'.$SECTION_TITLE.'</h1>');
		SIDE_NAV_CLOSE();
	}
}

PAGE_FOOTER();
PAGE_OUTPUT();

?>