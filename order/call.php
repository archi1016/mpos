<?php

require('func.php');

CHECK_LAN_IP();

if (!isset($_POST[ARGUMENT_POST_TABLE])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_TABLE]) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_CALLER])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_CALLER]) E_TO(ERROR_POST_ARGUMENT);
if (!isset($_POST[ARGUMENT_POST_MSG])) E_TO(ERROR_POST_ARGUMENT);
if ('' == $_POST[ARGUMENT_POST_MSG]) E_TO(ERROR_POST_ARGUMENT);

$table = $_POST[ARGUMENT_POST_TABLE];
$caller = $_POST[ARGUMENT_POST_CALLER];
$msg = $_POST[ARGUMENT_POST_MSG];

if (get_magic_quotes_gpc()) {
	$table = stripslashes($table);
	$caller = stripslashes($caller);
	$msg = stripslashes($msg);
}

$msg = str_replace("\r", '', $msg);
$msg = str_replace("\n", '\n', $msg);
if ('' == $msg) E_TO(ERROR_POST_ARGUMENT);

QUERY_TABLE($qtable, $table_id, $timing, $timeout);

if ('' == $qtable) E_TO(ERROR_UNKNOW_TABLE);
if ($table != $qtable) E_TO(ERROR_UNKNOW_TABLE);


$a[0] = WEB_FRONT_CALL;
$a[1] = $table;
$a[2] = $caller;
$a[3] = $msg;
FRONT_UDP_SEND_AND_RECV($a, $rs);

P_TO('done_call.php');

?>