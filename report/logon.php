<?php

require('func.php');

if (isset($_POST['acc'])) {
if (!empty($_POST['acc'])) {
if (isset($_POST['pwd'])) {
if (!empty($_POST['pwd'])) {
	$a[0] = WEB_API_LOGON;
	$a[1] = str_replace("\t", '', $_POST['acc']);
	$a[2] = str_replace("\t", '', $_POST['pwd']);
	$a[3] = LOGON_TYPE_REPORT;
	$a[4] = $_SERVER['REMOTE_ADDR'].':'.$_SERVER['REMOTE_PORT'];
	UDP_SEND_AND_RECV($a, $ret);
	GOTO('index.php?'.ACCESS_KEY_NAME.'='.$ret[1]);
}
}
}
}


PAGE_INIT('µn¤J');

PAGE_ADD('<div class="header"><img src="logo/logo_32.png" title="'.MOPO_WEB_REPORT_NAME.'"><h1>'.MOPO_WEB_REPORT_NAME.'.'.MOPO_WEB_REPORT_MODE.'</h1></div>');
PAGE_ADD('<div class="logon"><h2>'.$STORES_INFORMATION[ROW_STORES_NAME][TSV_COMMON_NAME].'</h2><form action="logon.php" method="post">');
PAGE_ADD('±b¸¹: <input type="text" name="acc" size="24" value="" autofocus><br><br>');
PAGE_ADD('±K½X: <input type="password" name="pwd" size="24" value=""><br><br>');
PAGE_ADD('<br><br><input type="submit" value="µn¤J">');
PAGE_ADD('</form></div>');

PAGE_OUTPUT();

?>