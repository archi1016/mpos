<?php

require('config.php');
require('mpos_define.php');
require('define.php');
require('version.php');

date_default_timezone_set(TIME_ZONE);

$HTML = '';
$ACCESS_KEY = '';
$THIS_PHP_FILE = basename($_SERVER['SCRIPT_NAME']);
$THIS_WEB_URL = $THIS_PHP_FILE;
$CURRENT_TAB_INDEX = -1;
$TAB_TITLE = '';
$SECTION_ID = '';
$SECTION_TITLE = '';

if (!LOAD_TEXT_TABLE(RETURN_ABOUT_OBJECT_TSV_FILE(ABOUT_STORES), $STORES_INFORMATION)) {
	ERROR_STOP(ERROR_LOAD_STORES_INFORMATION);
}

function ERROR_STOP($error_code) {
	require('error.php');

	PAGE_ADD('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
	PAGE_ADD('<html xmlns="http://www.w3.org/1999/xhtml"><head>');
	PAGE_ADD('<meta http-equiv="Content-Type" content="text/html; charset='.TEXT_CHARSET.'" />');
	PAGE_ADD('<title>錯誤</title>');
	PAGE_ADD('<link rel="stylesheet" type="text/css" href="theme/'.THEME.'/theme.css" />');
	PAGE_ADD('</head><body>');
	PAGE_ADD('<div class="header"><img src="logo/logo_32.png" title="'.MOPO_WEB_REPORT_NAME.'" /><h1>錯誤</h1></div>');
	PAGE_ADD('<div class="error">'.$ERROR_MESSAGE[$error_code].'<br><br><br><button onclick="history.back();">回上一頁</button></div>');
	PAGE_OUTPUT();

	exit();
}

function PAGE_ADD($l) {
	global $HTML;

	$HTML .= $l."\n";
}

function PAGE_INIT($title) {
	global $STORES_INFORMATION;
	global $TAB_TITLE;
	global $SECTION_TITLE;

	if ('' == $title) {
		$title = $SECTION_TITLE.' - '.$TAB_TITLE;
	}
	PAGE_ADD('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
	PAGE_ADD('<html xmlns="http://www.w3.org/1999/xhtml"><head>');
	PAGE_ADD('<meta http-equiv="Content-Type" content="text/html; charset='.TEXT_CHARSET.'" />');
	PAGE_ADD('<title>'.$title.' - '.$STORES_INFORMATION[ROW_STORES_NAME][TSV_COMMON_NAME].' ('.$STORES_INFORMATION[ROW_STORES_BRANCH][TSV_COMMON_NAME].')</title>');
	PAGE_ADD('<link rel="stylesheet" type="text/css" href="theme/'.THEME.'/theme.css" />');
	PAGE_ADD('<link rel="shortcut icon" type="image/x-icon" href="logo/logo.ico" />');
	PAGE_ADD('<link rel="icon" type="image/png" href="logo/logo_16.png" />');
	PAGE_ADD('<link rel="apple-touch-icon-precomposed" href="logo/logo_128.png" />');
	PAGE_ADD('<script type="text/javascript" src="theme/'.THEME.'/theme.js"></script>');
	PAGE_ADD('</head><body>');
}

function PAGE_FOOTER() {
	global $STORES_INFORMATION;

	PAGE_ADD('<div class="footer">');
	PAGE_ADD($STORES_INFORMATION[ROW_STORES_NAME][TSV_COMMON_NAME].' ('.$STORES_INFORMATION[ROW_STORES_BRANCH][TSV_COMMON_NAME].')<br />');
	PAGE_ADD($STORES_INFORMATION[ROW_STORES_TELEPHONE][TSV_COMMON_NAME].'<br />');
	PAGE_ADD($STORES_INFORMATION[ROW_STORES_ADDRESS][TSV_COMMON_NAME].'<br />');
	PAGE_ADD(MOPO_WEB_REPORT_NAME.' / '.MOPO_WEB_REPORT_MODE.' v'.MOPO_WEB_REPORT_VERSION.'<br>');
	PAGE_ADD(MOPO_WEB_REPORT_COMPANY.' / '.MOPO_WEB_REPORT_PROGRAMMER);
	PAGE_ADD('</div>');
}

function PAGE_OUTPUT() {
	global $HTML;

	PAGE_ADD('</body></html>');	
	header('Content-Length: '.strlen($HTML));
	echo $HTML;
}

function HEADER_TAB_INIT(&$group_panel_information) {
	global $STORES_INFORMATION;
	global $TAB_INFORMATION;
	global $CURRENT_TAB_INDEX;
	global $ACCESS_KEY;

	$current_row = &$TAB_INFORMATION[$CURRENT_TAB_INDEX];
	PAGE_ADD('<div id="'.$current_row[TSV_TAB_ID].'" class="tab"><img src="logo/logo_32.png" title="'.$STORES_INFORMATION[ROW_STORES_NAME][TSV_COMMON_NAME].' - '.MOPO_WEB_REPORT_MODE.'" /><ul>');
	$c = count($TAB_INFORMATION);
	$i = 1;
	while ($i < $c) {
		$row = &$TAB_INFORMATION[$i];
		if ($CURRENT_TAB_INDEX != $i) {
			PAGE_ADD('<li><a href="'.$row[TSV_TAB_ID].'.php?'.ACCESS_KEY_NAME.'='.$ACCESS_KEY.'" class="'.$row[TSV_TAB_ID].'">'.$row[TSV_TAB_NAME].'</a></li>');
		} else {
			PAGE_ADD('<li class="current"><div class="'.$row[TSV_TAB_ID].'">'.$row[TSV_TAB_NAME].'</div></li>');
		}
		++$i;
	}
	PAGE_ADD('<li><a href="logoff.php?'.ACCESS_KEY_NAME.'='.$ACCESS_KEY.'" class="logoff">登出</a></li>');
	PAGE_ADD('</ul></div>');
		
	$group_panel_information[0][GROUP_PANEL_NAME] = '頁面';
	$group_panel_information[0][GROUP_PANEL_BUTTONS] = '<button onclick="location.reload();">刷新</button>';
	
	PAGE_ADD('<div id="'.$current_row[TSV_TAB_ID].'" class="group">');
}

function HEADER_TAB_CLOSE(&$group_panel_information) {
	PAGE_ADD('<table cellspacing="0" class="group">');
	$tr = '<tr valign="top">';
	$th = '<tr>';
	foreach ($group_panel_information as $gpi) {
		$tr .= '<td>'.$gpi[GROUP_PANEL_BUTTONS].'</td>';
		$th .= '<th>'.$gpi[GROUP_PANEL_NAME].'</th>';
	}
	PAGE_ADD($tr.'<td class="last">&nbsp;</td></tr>');
	PAGE_ADD($th.'<th class="last">&nbsp;</th></tr>');
	PAGE_ADD('</table>');
	PAGE_ADD('</div><div class="step">&nbsp;</div>');
}

function SIDE_NAV_INIT($more_section_args) {
	global $SECTION_INFORMATION;
	global $SECTION_ID;
	global $THIS_PHP_FILE;
	global $ACCESS_KEY;
	
	$c = count($SECTION_INFORMATION);
	if ($c > 1) {
		PAGE_ADD('<div class="content"><table cellspacing="0" class="split"><tr valign="top"><td class="nav"><dl>');
		$i = 1;
		while ($i < $c) {
			$row = &$SECTION_INFORMATION[$i];
			$url = $THIS_PHP_FILE.'?'.ACCESS_KEY_NAME.'='.$ACCESS_KEY.'&amp;'.SECTION_ID_NAME.'='.$row[TSV_SECTION_ID].$more_section_args;
			if ($SECTION_ID != $row[TSV_SECTION_ID]) {
				if ('-' != $row[TSV_SECTION_ID]) {
					PAGE_ADD('<dd><a href="'.$url.'">'.$row[TSV_SECTION_NAME].'</a></dd>');
				} else {
					PAGE_ADD('<dt>'.$row[TSV_SECTION_NAME].'</dt>');
				}
			} else {
				PAGE_ADD('<dd><a href="'.$url.'" class="current">'.$row[TSV_SECTION_NAME].'</a></dd>');
			}
			++$i;
		}
		PAGE_ADD('</dl></td><td class="split">&nbsp;</td><td class="content">');
		return true;
	} else {
		return false;
	}
}

function SIDE_NAV_CLOSE() {
	PAGE_ADD('</td></tr></table>');
}

function RETURN_ABOUT_OBJECT_TSV_FILE($about) {
	$s = (string) $about;
	return RETURN_FULL_TSV_FILE_PATH(substr('000'.$s, -4).'.tsv');
}

function RETURN_FULL_TSV_FILE_PATH($tsvfile) {
	return MOPO_SERVER_FOLDER.FOLDER_DB_TSV.'/'.$tsvfile;
}

function GOTO($url) {
	header('Location: '.$url);
	exit();
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

function UDP_SEND_AND_RECV(&$args, &$rs) {
	$sk = UDP_SOCKET_CREATE();
	if ($sk) {
		$api = implode("\t", $args);
		socket_sendto($sk, $api, strlen($api), 0, '127.0.0.1', MOPO_SERVER_PORT);
		if (@socket_recvfrom($sk, $recvbuf, 4096, 0, $ret_ip, $ret_port) > 0) {
			$rs = explode("\t", $recvbuf);
			if (WEB_API_SUCCESS != $rs[0]) {
				switch ($rs[1]) {
					case WEB_ERROR_ARGUMENTS;
						ERROR_STOP(ERROR_API_ARGUMENTS);

					case WEB_ERROR_FULL;
						ERROR_STOP(ERROR_SERVICE_IS_FULL);

					case WEB_ERROR_NO_RING;
						ERROR_STOP(ERROR_NO_RING);

					case WEB_ERROR_UNKNOW;
						ERROR_STOP(ERROR_UNKNOW);

					case WEB_ERROR_KEY;
						ERROR_STOP(ERROR_ACCESS_KEY);
				}
			}
		} else {
			UDP_SOCKET_FREE($sk);
			ERROR_STOP(ERROR_SERVICE_NO_RESPOND);
		}
		UDP_SOCKET_FREE($sk);
	}
}

function CHECK_ACCESS_KEY() {
	global $THIS_PHP_FILE;
	global $THIS_WEB_URL;
	global $ACCESS_KEY;
	global $TAB_INFORMATION;
	global $CURRENT_TAB_INDEX;
	global $TAB_TITLE;
	global $SECTION_INFORMATION;
	global $SECTION_ID;
	global $SECTION_TITLE;
	global $THIS_WEB_URL;

	$ACCESS_KEY = RETURN_STR_GET(ACCESS_KEY_NAME);
	if (empty($ACCESS_KEY)) {
		GOTO('logon.php');
	}
	$a[0] = WEB_API_CHECK_KEY;
	$a[1] = $ACCESS_KEY;
	UDP_SEND_AND_RECV($a, $ret);
	if (LOAD_TEXT_TABLE(MOPO_SERVER_FOLDER.FOLDER_DB_RING.'/'.$ret[1], $TAB_INFORMATION)) {
		$c = count($TAB_INFORMATION);
		$i = 1;
		while ($i < $c) {
			if ($TAB_INFORMATION[$i][TSV_TAB_ID].'.php' == $THIS_PHP_FILE) {
				$CURRENT_TAB_INDEX = $i;
				break;
			}
			++$i;
		}
		if (-1 != $CURRENT_TAB_INDEX) {
			$TAB_TITLE = $TAB_INFORMATION[$CURRENT_TAB_INDEX][TSV_TAB_NAME];
			if (LOAD_TEXT_TABLE(MOPO_SERVER_FOLDER.FOLDER_DB_RING.'/'.$TAB_INFORMATION[$CURRENT_TAB_INDEX][TSV_TAB_FILE], $SECTION_INFORMATION)) {
				$SECTION_TITLE = '(沒有任何權限)';
				$c = count($SECTION_INFORMATION);
				if ($c > 2) {
					$section_index = 2;
					if (isset($_GET[SECTION_ID_NAME])) {
						$i = 1;
						while ($i < $c) {
							if ('-' != $SECTION_INFORMATION[$i][TSV_SECTION_ID]) {
								if ($_GET[SECTION_ID_NAME] == $SECTION_INFORMATION[$i][TSV_SECTION_ID]) {
									$section_index = $i;
									break;
								}
							}
							++$i;
						}
					}
					while ($section_index < $c) {
						if ('-' != $SECTION_INFORMATION[$section_index][TSV_SECTION_ID]) {
							$SECTION_ID = $SECTION_INFORMATION[$section_index][TSV_SECTION_ID];
							$SECTION_TITLE = $SECTION_INFORMATION[$section_index][TSV_SECTION_NAME];
							break;
						}
						++$section_index;
					}
				}
				$THIS_WEB_URL .= '?'.ACCESS_KEY_NAME.'='.$ACCESS_KEY.'&amp;'.SECTION_ID_NAME.'='.$SECTION_ID;
			} else {
				ERROR_STOP(ERROR_LOAD_SECTION_INFORMATION);
			}
		} else {
			ERROR_STOP(ERROR_LOAD_INDEX_INFORMATION);
		}
	} else {
		$a[0] = WEB_API_LOGOFF;
		UDP_SEND_AND_RECV($a, $ret);
		ERROR_STOP(ERROR_LOAD_INDEX_INFORMATION);
	}
}



function LOAD_TEXT_FILE($fp, &$t) {
	if (file_exists($fp)) {
		$t = file_get_contents($fp);
	} else {
		$t = '';
	}
	return ($t != '');
}

function LOAD_TEXT_TABLE($fp, &$t) {
	$t = NULL;
	$c = '';
	if (LOAD_TEXT_FILE($fp, $c)) {
		$c = str_replace('&', '&amp;', $c);
		return LOAD_TEXT_TABLE_CORE($c, $t);
	} else {
		return FALSE;
	}
}

function LOAD_TEXT_TABLE_CORE(&$c, &$t) {
	$b = 0;
	$c = str_replace("\r", '', $c);
	$l = split("\n", $c);
	$ls = count($l);
	$i = 0;
	while ($i < $ls) {
		if ($l[$i] != '') {
			$r = split("\t", $l[$i]);
			$rs = count($r);
			$j = 0;
			while ($j < $rs) {
				$t[$b][$j] = $r[$j];
				++$j;
			}
			++$b;
		}
		++$i;
	}
	return is_array($t);
}

function LIST_TEXT_DATA($t, $fp) {
	LOAD_TEXT_FILE($fp, $m);
	if ('' != $t) {
		PAGE_ADD('<h2>'.$t.'</h2>');
	}
	PAGE_ADD('<textarea class="report" readonly="readonly">'.$m.'</textarea>');
}

function LIST_LOG_DATA($t, $yrv, $mnv, $dyv, $kwv, $ftv) {
	global $SECTION_ID;
	
	PAGE_ADD('<h2>'.$t.'</h2>');
	if (LOAD_TEXT_FILE(MOPO_SERVER_FOLDER.FOLDER_LOG_BASE.'/index_'.$SECTION_ID.'.tsv', $hdr)) {
		$hdr = str_replace("\r", '', $hdr);
		$l = split("\n", $hdr);
		$hdr = $l[0];
		if (-1 != $dyv) {
			if (LOAD_TEXT_FILE(MOPO_SERVER_FOLDER.FOLDER_LOG_BASE.'/'.$SECTION_ID.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).RETURN_CONV_INT_TO_NUM_2X($dyv).'.log', $t)) {
				$hdr .= "\n".$t;
			}
		} else {
			$i = 1;
			while ($i <= 31) {
				if (LOAD_TEXT_FILE(MOPO_SERVER_FOLDER.FOLDER_LOG_BASE.'/'.$SECTION_ID.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).RETURN_CONV_INT_TO_NUM_2X($i).'.log', $t)) {
					$hdr .= "\n".$t;
				}
				++$i;
			}
		}
		$hdr = str_replace('&', '&amp;', $hdr);
		if (LOAD_TEXT_TABLE_CORE($hdr, $rows)) {
			LIST_REPORT_DATA_CORE($rows, $kwv, $ftv);
		}
	}
}

function LIST_REPORT_DATA($t, $fp, $kwv, $ftv) {
	if ('' != $t) {
		PAGE_ADD('<h2>'.$t.'</h2>');
	}
	if (LOAD_TEXT_TABLE($fp, $rows)) {
		LIST_REPORT_DATA_CORE($rows, $kwv, $ftv);
	}
}

function LIST_REPORT_DATA_CORE(&$rows, &$kwv, &$ftv) {
	$c = count($rows);
	$f = count($rows[0]);

	if ($c > 0) {
		PAGE_ADD('<table cellspacing="0" class="report">');
		if ($c > 1) {
			if ('-' == $rows[1][0]) {
				$i = 2;
				LIST_REPORT_HEADER($rows[1][1], $f, $rows[0]);
			} else {
				$i = 1;
				LIST_REPORT_HEADER('點選', $f, $rows[0]);
			}
			$r = 1;
			while ($i < $c) {
				if ('-' == $rows[$i][0]) {
					LIST_REPORT_HEADER($rows[$i][1], $f, $rows[0]);
					$r = 1;
				} else {
					if ('' == $kwv) {
						LIST_REPORT_ROW($f, $rows[$i], $r, false);
					} else {
						$l = implode("\t", $rows[$i]);
						$p = strpos($l, $kwv);
						switch ($ftv) {
							case FILTER_TYPE_MARK:
								if ($p === false) {
									LIST_REPORT_ROW($f, $rows[$i], $r, false);
								} else {
									$row2 = str_replace($kwv, '<mark>'.$kwv.'</mark>', $rows[$i]);
									LIST_REPORT_ROW($f, $row2, $r, false);
								}
								break;
							
							case FILTER_TYPE_HIGHLIGHT;
								if ($p !== false) {
									LIST_REPORT_ROW($f, $rows[$i], $r, true);
								} else {
									LIST_REPORT_ROW($f, $rows[$i], $r, false);
								}
								break;
							
								case FILTER_TYPE_HIDE:
								if ($p === false) {
									LIST_REPORT_ROW($f, $rows[$i], $r, false);
								}
								break;
							
							default:
								if ($p !== false) {
									LIST_REPORT_ROW($f, $rows[$i], $r, false);
								}
								break;
						}
					}
				}
				++$i;
			}
		} else {
			LIST_REPORT_HEADER('空白', $f, $rows[0]);
		}
		PAGE_ADD('</table>');
	}
}

function LIST_REPORT_ROW($f, &$row, &$r, $is_highlight) {
	if ($is_highlight) {
		$h = '<tr valign="top" class="r'.($r & 1).'sed">';
	} else {
		$h = '<tr valign="top" class="r'.($r & 1).'">';
	}
	$h .= '<td onclick="SWITCH_ROW_HIGHLIGHT(this.parentNode);">&nbsp;</td>';
	++$r;
	$j = 0;
	while ($j < $f) {
		if (isset($row[$j])) {
			if ($row[$j] != '') {
				$h .= '<td>'.RETURN_SAFE_HTML($row[$j]).'</td>';
			} else {
				$h .= '<td>&nbsp;</td>';
			}
		} else {
			$h .= '<td>&nbsp;</td>';
		}
		++$j;
	}
	PAGE_ADD($h.'</tr>');
}

function LIST_REPORT_HEADER($t, $f, &$row) {
	PAGE_ADD('<tr><th class="c0">@'.$t.'</th><th>'.implode('</th><th>', $row).'</th>');
}

function RETURN_STR_GET($key) {
	if (isset($_GET[$key])) {
		return $_GET[$key];
	} else {
		return '';
	}
}

function RETURN_INT_GET($key) {
	if (isset($_GET[$key])) {
		return (int) $_GET[$key];
	} else {
		return 0;
	}
}

function RETURN_SAFE_HTML($h) {
	$h = str_replace('&', '&amp;', $h);
	$h = str_replace('<', '&lt;', $h);
	$h = str_replace('>', '&gt;', $h);
	$h = str_replace('\n', '<br>', $h);
	$h = str_replace('', '', $h);
	$h = str_replace('', '', $h);
	$h = str_replace('', '', $h);
	$h = str_replace('', '', $h);
	return $h;
}

function RETURN_QUERY_FORM_HEADER($submit_text) {
	global $THIS_PHP_FILE;
	global $ACCESS_KEY;
	global $SECTION_ID;
	
	$ret = '<form action="'.$THIS_PHP_FILE.'"><div align="right"><input type="submit" value="'.$submit_text.'" /></div>';
	$ret .= RETURN_HIDDEN_INPUT_ELEMENT(ACCESS_KEY_NAME, $ACCESS_KEY);
	$ret .= RETURN_HIDDEN_INPUT_ELEMENT(SECTION_ID_NAME, $SECTION_ID);
	return $ret;
}

function RETURN_QUERY_FORM_FOOTER() {
	return '</form>';
}

function RETURN_HIDDEN_INPUT_ELEMENT($name, $value) {
	return '<input type="hidden" name="'.$name.'" value="'.str_replace('"', '&quot;',$value).'" />';
}

function RETURN_YEAR_OPTIONS($current_year) {
	return RETURN_YEAR_OPTIONS_WITH_SIZE($current_year, 1);
}

function RETURN_REPORT_YEAR_OPTIONS($current_year) {
	return RETURN_YEAR_OPTIONS_WITH_SIZE($current_year, 12);
}

function RETURN_YEAR_OPTIONS_WITH_SIZE($current_year, $lines) {
	$y = (int) date('Y');
	if (empty($current_year)) {
		$current_year = $y;
	}
	$ret = '<select name="'.YEAR_NAME.'" size="'.$lines.'" class="year">';
	$i = 2011;
	while ($i <= $y) {
		$ret .= '<option value="'.$i.'"';
		if ($current_year == $i) {
			$ret .= ' selected="selected"';
		}
		$ret .= '>'.$i.'</option>';
		++$i;
	}
	return $ret.'</select>';
}

function RETURN_MONTH_OPTIONS($current_month) {
	return RETURN_MONTH_OPTIONS_WITH_SIZE($current_month, 1);
}

function RETURN_REPORT_MONTH_OPTIONS($current_month) {
	return RETURN_MONTH_OPTIONS_WITH_SIZE($current_month, 12);
}

function RETURN_MONTH_OPTIONS_WITH_SIZE($current_month, $lines) {
	$m = (int) date('n');
	if (empty($current_month)) {
		$current_month = $m;
	}
	$ret = '<select name="'.MONTH_NAME.'" size="'.$lines.'" class="month">';
	$i = 1;
	while ($i <= 12) {
		$ret .= '<option value="'.$i.'"';
		if ($current_month == $i) {
			$ret .= ' selected="selected"';
		}
		$ret .= '>'.RETURN_CONV_INT_TO_NUM_2X($i).'</option>';
		++$i;
	}
	return $ret.'</select>';
}

function RETURN_DAY_OPTIONS($current_day) {
	return RETURN_DAY_OPTIONS_WITH_SIZE($current_day, 1);
}

function RETURN_REPORT_DAY_OPTIONS($current_day) {
	return RETURN_DAY_OPTIONS_WITH_SIZE($current_day, 12);
}

function RETURN_DAY_OPTIONS_WITH_SIZE($current_day, $lines) {
	$d = (int) date('j');
	if (empty($current_day)) {
		$current_day = $d;
	}
	$ret = '<select name="'.DAY_NAME.'" size="'.$lines.'" class="day">';
	$i = 1;
	while ($i <= 31) {
		$ret .= '<option value="'.$i.'"';
		if ($current_day == $i) {
			$ret .= ' selected="selected"';
		}
		$ret .= '>'.RETURN_CONV_INT_TO_NUM_2X($i).'</option>';
		++$i;
	}
	return $ret.'<option value="-1">(全部)</option></select>';
}

function RETURN_CONV_INT_TO_NUM_2X($v) {
	$ret = (string) $v;
	if (1 == strlen($ret)) {
		$ret = '0'.$ret;
	}
	return $ret;
}

function RETURN_FILTER_GROUP_MODULE($kwv, $ftv, $more_args) {
	$options = array(
		array(FILTER_TYPE_KEEP, '保留')
		,array(FILTER_TYPE_HIGHLIGHT, '高亮度')
		,array(FILTER_TYPE_MARK, '標計')
		,array(FILTER_TYPE_HIDE, '不顯示')
	);
	$h = RETURN_QUERY_FORM_HEADER('過濾');
	$h .= $more_args;
	$h .= '<select name="'.FILTER_TYPE_NAME.'">';
	foreach ($options as $opt) {
		$h .= '<option value="'.$opt[TSV_COMMON_ID].'"';
		if ($ftv == $opt[TSV_COMMON_ID]) {
			$h .= ' selected="selected"';
		}
		$h .= '>'.$opt[TSV_COMMON_NAME].'</option>';
	}
	$h .= '</select>';
	$h .= '<input type="text" name="'.KEYWORD_NAME.'" value="'.str_replace('"', '&quot;', $kwv).'" />';
	$h .= RETURN_QUERY_FORM_FOOTER();	
	return $h;
}

function REPORT_QUERY_INIT($more_args) {
	global $THIS_PHP_FILE;
	global $ACCESS_KEY;
	global $SECTION_ID;
	
	PAGE_ADD('<form action="'.$THIS_PHP_FILE.'">');
	PAGE_ADD(RETURN_HIDDEN_INPUT_ELEMENT(ACCESS_KEY_NAME, $ACCESS_KEY));
	PAGE_ADD(RETURN_HIDDEN_INPUT_ELEMENT(SECTION_ID_NAME, $SECTION_ID));
	PAGE_ADD($more_args);
	PAGE_ADD('<table cellspacing="0" class="query">');
}

function REPORT_QUERY_CLOSE(&$query_panel_information) {
	$th = '<tr>';
	$td = '<tr valign="top">';
	foreach ($query_panel_information as $qpi) {
		$th .= '<th>'.$qpi[QUERY_PANEL_NAME].'</th>';
		$td .= '<td>'.$qpi[QUERY_PANEL_BUTTONS].'</td>';
	}
	$th .= '<th class="cl">動作</th></tr>';
	$td .= '<td><input type="submit" value="查詢" /></td></tr>';
	PAGE_ADD($th);
	PAGE_ADD($td);
	PAGE_ADD('</table>');
	PAGE_ADD('</form>');
}

function RETURN_FIND_ROW_INDEX($fp, $id, &$rows, $fi, &$rc) {
	$index = -1;
	if (LOAD_TEXT_TABLE($fp, $rows)) {
		$rc = count($rows);
		if ('' != $id) {
			if ($rc > 1) {
				$i = 1;
				while ($i < $rc) {
					if ($id == $rows[$i][$fi]) {
						$index = $i;
						break;
					}
					++$i;
				}
			}
		}
	}
	return $index;
}

function RETURN_ITEM_OPTIONS($fp, $qiv) {
	return RETURN_ITEM_OPTIONS_WITH_SIZE($fp, 1, $qiv);
}

function RETURN_REPORT_ITEM_OPTIONS($fp) {
	return RETURN_ITEM_OPTIONS_WITH_SIZE($fp, 12, '');
}

function RETURN_ITEM_OPTIONS_WITH_SIZE($fp, $sz, $qiv) {
	$ret = '<select name="'.QUERY_ID_NAME.'" size="'.$sz.'" class="item">';
	if (LOAD_TEXT_TABLE($fp, $rows)) {
		$c = count($rows);
		if ($c > 1) {
			$ret .= '<optgroup label="'.$rows[1][TSV_COMMON_NAME].'">';
			if ($c > 2) {
				$i = 2;
				while ($i < $c) {
					$row = &$rows[$i];
					if ('-' != $row[TSV_COMMON_ID]) {
						$ret .= '<option value="'.$row[TSV_COMMON_ID].'"';
						if ($qiv == $row[TSV_COMMON_ID]) {
							$ret .= ' selected="selected"';
						}
						$ret .= '>'.$row[TSV_COMMON_ID].': '.$row[TSV_COMMON_NAME].'</option>';
					} else {
						$ret .= '</optgroup><optgroup label="'.$row[TSV_COMMON_NAME].'">';
					}
					++$i;
				}
			}
			$ret .= '</optgroup>';
		}
	}
	$ret .= '</select>';
	return $ret;
}

function RETURN_ITEM_GROUP_NAME($ci, &$rows) {
	$i = $ci - 1;
	while ($i > 0) {
		if ('-' == $rows[$i][TSV_COMMON_ID]) {
			return $rows[$i][TSV_COMMON_NAME];
		}
		--$i;
	}
}

?>