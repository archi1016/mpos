<?php

require('func.php');

CHECK_LAN_IP();

if (!isset($_POST[ARGUMENT_POST_TABLE])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_TABLE]) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_POSTER])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_POSTER]) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_EMAIL])) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_MSG])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_MSG]) E_TO(ERROR_POST_ARGUMENT);

$table = $_POST[ARGUMENT_POST_TABLE];
$poster = $_POST[ARGUMENT_POST_POSTER];
$email = $_POST[ARGUMENT_POST_EMAIL];
$msg = $_POST[ARGUMENT_POST_MSG];

if (get_magic_quotes_gpc()) {
	$table = stripslashes($table);
	$poster = stripslashes($poster);
	$email = stripslashes($email);
	$msg = stripslashes($msg);
}

$msg = str_replace("\r", '', $msg);
$msg = str_replace("\n", '\n', $msg);
if ('' == $msg) E_TO(ERROR_POST_ARGUMENT);

QUERY_TABLE($qtable, $table_id, $timing, $timeout);

if ('' == $qtable) E_TO(ERROR_UNKNOW_TABLE);
if ($table != $qtable) E_TO(ERROR_UNKNOW_TABLE);


$ini = dirname(__FILE__).'/'.RET_RAND_NUMBER_STR(16).'.ini';

$t = "[CONFIG]\r\n";
$t .= ORDERING_INI_TABLE.'='.$table."\r\n";
$t .= ORDERING_INI_POSTER.'='.$poster."\r\n";
$t .= ORDERING_INI_EMAIL.'='.$email."\r\n";
$t .= ORDERING_INI_MESSAGE.'='.$msg."\r\n";

file_put_contents($ini, $t);

$a[0] = WEB_API_SEND_GUESTBOOK;
$a[1] = $ini;
$ret = UDP_SEND_AND_RECV($a, $rs, '127.0.0.1', MOPO_SERVER_PORT);

if (ERROR_SUCCESS != $ret) {
	@unlink($ini);
	E_TO($ret);
}

P_TO('done_guestbook.php');

?>