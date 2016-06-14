<?php

require('func.php');

CHECK_LAN_IP();

function WRITE_ORDERIG_INI_DATA(&$a, $t, $v) {
	$a[3] = $t;
	$a[4] = $v;
	FRONT_UDP_SEND_AND_RECV($a, $rs);
}

$ips = explode('.', $_SERVER['REMOTE_ADDR']);
$ipindex = $ips[3];

if (!isset($_POST[ARGUMENT_POST_MODE])) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_TABLE])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_TABLE]) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_ROWS])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_ROWS]) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_PURCHASER])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_PURCHASER]) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_MEMO])) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_TSV])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_TSV]) E_TO(ERROR_POST_ARGUMENT);

$mode = $_POST[ARGUMENT_POST_MODE];
$table = $_POST[ARGUMENT_POST_TABLE];
$rows = (int) $_POST[ARGUMENT_POST_ROWS];
$purchaser = $_POST[ARGUMENT_POST_PURCHASER];
$memo = $_POST[ARGUMENT_POST_MEMO];
$tsv = $_POST[ARGUMENT_POST_TSV];

if (get_magic_quotes_gpc()) {
	$mode = stripslashes($mode);
	$table = stripslashes($table);
	$purchaser = stripslashes($purchaser);
	$memo = stripslashes($memo);
	$tsv = stripslashes($tsv);
}

$tsv = str_replace("\r", '', $tsv);
$tsvs = explode("\n", $tsv);
if ($rows != count($tsvs)) {
	E_TO(ERROR_POST_ARGUMENT);
}



switch (ORDER_MODE) {
	case ORDER_MODE_TAKEAWAY:
		require('send_takeaway.php');
		break;
	case ORDER_MODE_DELIVERY:
		break;
	case ORDER_MODE_TABLE:
		require('send_table.php');
		break;
	default:
		require('send_here.php');
		break;
}



$i = 0;
while ($i < $rows) {
	WRITE_ORDERIG_INI_DATA($a, ORDERING_INI_TSV_ROW.'_'.RET_ROW_STR($i), $tsvs[$i]);
	++$i;
}

$a[0] = WEB_FRONT_CLOSE_ORDERING;
FRONT_UDP_SEND_AND_RECV($a, $rs);

P_TO('done_send.php');

?>