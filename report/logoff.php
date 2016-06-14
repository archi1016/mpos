<?php

require('func.php');

if (isset($_GET[ACCESS_KEY_NAME])) {
	$a[0] = WEB_API_LOGOFF;
	$a[1] = $_GET[ACCESS_KEY_NAME];
	UDP_SEND_AND_RECV($a, $ret);
}
GOTO('logon.php');

?>