<?php

require('config.php');
require('mpos_define.php');
require('define.php');

date_default_timezone_set(TIME_ZONE);

$HTML = '';
$THIS_PHP_FILE = basename($_SERVER['SCRIPT_NAME']);
$THIS_WEB_URL = $THIS_PHP_FILE;

function E_TO($c) {
	header('Location: error.php?'.ARGUMENT_ERROR_CODE.'='.$c);
	exit();
}

function P_TO($u) {
	P_ADD('<html><head><meta http-equiv="refresh" content="0; url='.$u.'"></head><body>');
	P_PRINT();
}

function P_ADD($l) {
	global $HTML;

	$HTML .= $l."\n";
}

function P_INIT() {
	global $STORES;

	$ver = '?nocache='.date('YmdHis');
	
	P_ADD('<!DOCTYPE html>');
	P_ADD('<html lang="'.LOCAL_LANGUAGE.'"><head>');
	P_ADD('<meta charset="'.TEXT_CHARSET.'">');
	P_ADD('<meta http-equiv="Cache-Control" content="no-cache">');
	P_ADD('<meta http-equiv="Pragma" content="no-cache">');
	P_ADD('<meta http-equiv="Expires" content="0">');
	P_ADD('<meta name="viewport" content="width=device-width">');
	P_ADD('<meta name="apple-mobile-web-app-capable" content="yes">');
	P_ADD('<meta name="format-detection" content="telephone=no">');
	P_ADD('<meta name="format-detection" content="email=no">');
	P_ADD('<title>'.PAGE_TITLE.'</title>');
	P_ADD('<link rel="stylesheet" type="text/css" href="tpl.css'.$ver.'">');
	P_ADD('<link rel="icon" type="image/png" href="logo/logo_16x16.png">');
	P_ADD('<link rel="apple-touch-icon-precomposed" href="logo/logo_128x128.png">');
	P_ADD('<script src="mpos_define.js'.$ver.'"></script>');
	P_ADD('<script src="mpos_stores.js'.$ver.'"></script>');
	P_ADD('<script src="mpos_config.js'.$ver.'"></script>');
	P_ADD('<script src="mpos_order_notice.js'.$ver.'"></script>');
	P_ADD('<script src="mpos_sold_out.js'.$ver.'"></script>');
	P_ADD('<script src="mpos_db.js'.$ver.'"></script>');
	P_ADD('<script src="tpl.js'.$ver.'"></script>');
	P_ADD('<script src="main.js'.$ver.'"></script>');
	
	P_ADD('</head><body>');
}

function P_PRINT() {
	global $HTML;

	P_ADD('</body></html>');	
	header('Content-Length: '.strlen($HTML));
	echo $HTML;
	exit();
}

function QUERY_TABLE(&$table, &$table_id, &$timing, &$timeout) {
	$table = '';
	$table_id = 0;
	$timing = '0';
	$timeout = '1';
	switch (ORDER_MODE) {
		case ORDER_MODE_TAKEAWAY:
			break;
		case ORDER_MODE_DELIVERY:
			break;
		default:
			$a[0] = WEB_API_QUERY_TABLE_FROM_IP;
			$a[1] = $_SERVER['REMOTE_ADDR'];
			SERVER_UDP_SEND_AND_RECV($a, $rs);
			if ('' == $rs[1]) {
				E_TO(ERROR_UNKNOW_TABLE);
			}
			$table = $rs[1];
			$table_id = $rs[2];
			$timing = $rs[3];
			$timeout = $rs[4];
			break;
	}
}

function CHECK_LAN_IP() {
	if ('127.0.0.1' != $_SERVER['REMOTE_ADDR']) {
		$ips = explode('.', $_SERVER['REMOTE_ADDR']);
		$ip_segment = $ips[0].'.'.$ips[1].'.'.$ips[2];
		$ip_index = (int) $ips[3];
		if (LAN_IP_SEGMENT == $ip_segment) {
			if ($ip_index >= LAN_IP_START) {
				if ($ip_index <= LAN_IP_END) {
				} else {
					E_TO(ERROR_LAN_IP);
				}
			} else {
				E_TO(ERROR_LAN_IP);
			}
		} else {
			E_TO(ERROR_LAN_IP);
		}
	}
}

function RET_TEXT_FROM_FILE($fp) {
	if (is_file($fp)) {
		return file_get_contents($fp);
	} else {
		return '';
	}
}

function RET_STR_GET($key) {
	if (isset($_GET[$key])) {
		return $_GET[$key];
	} else {
		return '';
	}
}

function RET_INT_GET($key) {
	if (isset($_GET[$key])) {
		return (int) $_GET[$key];
	} else {
		return 0;
	}
}

function RET_ROW_STR($row) {
	$row = '000'.$row;
	return substr($row, -4);
}

function RET_RAND_NUMBER_STR($d) {
	$s = '';
	$i = 0;
	while ($i < $d) {
		$v = rand(0, 9);
		$s .= $v;
		++$i;
	}
	return $s;
}

function UDP_SOCKET_CREATE() {
	$sk = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
	if ($sk != FALSE) {
		socket_set_option($sk, SOL_SOCKET, SO_RCVTIMEO, array('sec' => 2, 'usec' => 0));
	}
	return $sk;
}

function UDP_SOCKET_FREE(&$sk) {
	if ($sk != FALSE) {
		socket_close($sk);
	}
}

function SERVER_UDP_SEND_AND_RECV(&$args, &$rs) {
	$ret = UDP_SEND_AND_RECV($args, $rs, '127.0.0.1', MOPO_SERVER_PORT);
	if (ERROR_SUCCESS != $ret) {
		E_TO($ret);
	}
}

function FRONT_UDP_SEND_AND_RECV(&$args, &$rs) {
	$ret = UDP_SEND_AND_RECV($args, $rs, MOPO_FRONT_IP, MOPO_FRONT_PORT);
	if (ERROR_SUCCESS != $ret) {
		E_TO($ret);
	}
}

function UDP_SEND_AND_RECV(&$args, &$rs, $ip, $port) {
	$ret = ERROR_SUCCESS;
	$sk = UDP_SOCKET_CREATE();
	if ($sk) {
		$api = implode("\t", $args);
		socket_sendto($sk, $api, strlen($api), 0, $ip, $port);
		if (@socket_recvfrom($sk, $recvbuf, 4096, 0, $ret_ip, $ret_port) > 0) {
			$rs = explode("\t", $recvbuf);
			if (WEB_API_SUCCESS != $rs[0]) {
				switch ($rs[1]) {
					case WEB_ERROR_ARGUMENTS;
						$ret = ERROR_API_ARGUMENTS;
						break;

					case WEB_ERROR_FULL;
						$ret = ERROR_SERVICE_IS_FULL;
						break;

					case WEB_ERROR_NO_RING;
						$ret = ERROR_NO_RING;
						break;

					case WEB_ERROR_UNKNOW;
						$ret = ERROR_UNKNOW;
						break;

					case WEB_ERROR_KEY;
						$ret = ERROR_ACCESS_KEY;
						break;
						
					case WEB_ERROR_TABLE:
						$ret = ERROR_TABLE;
						break;
					
					case WEB_ERROR_ORDER_TYPE:
						$ret = ERROR_ORDER_TYPE;
						break;
					
					case WEB_ERROR_ORDER_ROWS:
						$ret = ERROR_ORDER_ROWS;
						break;
						
					case WEB_ERROR_ORDER_TABLE:
						$ret = ERROR_ORDER_TABLE;
						break;
						
					case WEB_ERROR_ORDER_PAY:
						$ret = ERROR_ORDER_PAY;
						break;
							
					default:
						$ret = ERROR_UNKNOW;
						break;
				}
			}
		} else {
			UDP_SOCKET_FREE($sk);
			$ret = ERROR_SERVICE_NO_RESPOND;
		}
		UDP_SOCKET_FREE($sk);
	}
	return $ret;
}

?>