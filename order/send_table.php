<?php

if (!isset($ipindex)) exit();

QUERY_TABLE($qtable, $id, $timing, $timeout);

if ('' == $qtable) E_TO(ERROR_UNKNOW_TABLE);
if ($table != $qtable) E_TO(ERROR_UNKNOW_TABLE);
if ('0' == $timing) E_TO(ERROR_TABLE_IS_CLOSED);
if ('1' == $timeout) E_TO(ERROR_ORDER_TIMEOUT);

$a[0] = WEB_FRONT_OPEN_ORDERING;
$a[1] = $ipindex;
FRONT_UDP_SEND_AND_RECV($a, $rs);

$a[0] = WEB_FRONT_WRITE_ORDERING;
$a[1] = $rs[1];
$a[2] = $ipindex;

WRITE_ORDERIG_INI_DATA($a, ORDERING_INI_MODE, ORDER_MODE_TABLE);

WRITE_ORDERIG_INI_DATA($a, ORDERING_INI_ID, $id);
WRITE_ORDERIG_INI_DATA($a, ORDERING_INI_TABLE, $table);
WRITE_ORDERIG_INI_DATA($a, ORDERING_INI_ROWS, $rows);
WRITE_ORDERIG_INI_DATA($a, ORDERING_INI_PURCHASER, $purchaser);
WRITE_ORDERIG_INI_DATA($a, ORDERING_INI_MEMO, $memo);


?>