<?php

if (!isset($STORES_INFORMATION)) exit();

$DB_FOLDER = MOPO_SERVER_FOLDER.FOLDER_DB_CLASS;

$yrv = RETURN_INT_GET(YEAR_NAME);
$mnv = RETURN_INT_GET(MONTH_NAME);
$civ = RETURN_STR_GET(CLASS_ID_NAME);
	
$CURRENT_CLASS_INDEX = RETURN_FIND_ROW_INDEX($DB_FOLDER.'/index.tsv', $civ, $CLASS_INFORMATION, TSV_CLASS_ID, $CLASS_INFORMATION_ROWS);

if (-1 != $CURRENT_CLASS_INDEX) {
	if (1 == $CURRENT_CLASS_INDEX) {
		GOTO('now.php?'.ACCESS_KEY_NAME.'='.$ACCESS_KEY);
	}
	$current_row = &$CLASS_INFORMATION[$CURRENT_CLASS_INDEX];
	$page_title = $current_row[TSV_CLASS_ID].': '.$current_row[TSV_CLASS_NAME].' / '.$current_row[TSV_CLASS_STAFF].' / '.$current_row[TSV_CLASS_TIME];
}

PAGE_INIT($page_title);

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);

$gpi[$gpi_count][GROUP_PANEL_NAME] = '月份';
$h = RETURN_QUERY_FORM_HEADER('重列');
$h .= RETURN_HIDDEN_INPUT_ELEMENT(KEYWORD_NAME, $kwv);
$h .= RETURN_HIDDEN_INPUT_ELEMENT(FILTER_TYPE_NAME, $ftv);
$h .= RETURN_YEAR_OPTIONS($yrv);
$h .= RETURN_MONTH_OPTIONS($mnv);
$h .= RETURN_QUERY_FORM_FOOTER();
$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
++$gpi_count;
	
if (-1 != $CURRENT_CLASS_INDEX) {
	$more_args = RETURN_HIDDEN_INPUT_ELEMENT(CLASS_ID_NAME, $current_row[TSV_CLASS_ID]);
	$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
	$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '過濾';
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = RETURN_FILTER_GROUP_MODULE($kwv, $ftv, $more_args);
	++$gpi_count;
	
	
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '導覽';
	$h1 = '';
	$h2 = '';
	$more_args = '&amp;'.YEAR_NAME.'='.$yrv.'&amp;'.MONTH_NAME.'='.$mnv.'&amp;'.KEYWORD_NAME.'='.$kwv.'&amp;'.FILTER_TYPE_NAME.'='.$ftv;
	$url_prev = '';
	$url_next = '';
	if ($CURRENT_CLASS_INDEX < ($CLASS_INFORMATION_ROWS - 1)) {
		$url_prev = $THIS_WEB_URL.'&amp;'.CLASS_ID_NAME.'='.$CLASS_INFORMATION[$CURRENT_CLASS_INDEX+1][TSV_CLASS_ID].$more_args;
		$h1 .= '<button onclick="location.href=\''.$url_prev.'\';">前一班</button>';
		$h2 .= '<a href="'.$url_prev.'">前一班</a>';
	}
	if ($CURRENT_CLASS_INDEX > 2) {
		$url_next = $THIS_WEB_URL.'&amp;'.CLASS_ID_NAME.'='.$CLASS_INFORMATION[$CURRENT_CLASS_INDEX-1][TSV_CLASS_ID].$more_args;
		$h1 .= '<button onclick="location.href=\''.$url_next.'\';">下一班</button>';
		if ('' == $h2) {
			$h2 = '<a href="'.$url_next.'">下一班</a>';
		} else {
			$h2 .= ' | <a href="'.$url_next.'">下一班</a>';
		}
	}
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h1.'<br />'.$h2;
	++$gpi_count;
}

HEADER_TAB_CLOSE($gpi);
if (SIDE_NAV_INIT('')) {
	if (-1 != $CURRENT_CLASS_INDEX) {
		$cf = MOPO_SERVER_FOLDER.FOLDER_DB_CLASS.'/'.str_replace('\\', '/', $current_row[TSV_CLASS_FOLDER]);
		PAGE_ADD('<h1>'.$page_title.'</h1>');
		if (LOAD_TEXT_TABLE($cf.'/index.tsv', $FILE_INFORMATION)) {
			$tt = $FILE_INFORMATION[1][TSV_CLASS_INDEX_NAME];
			$c = count($FILE_INFORMATION);
			$i = 2;
			while ($i < $c) {
				$row = &$FILE_INFORMATION[$i];
				if ('-' != $row[TSV_CLASS_INDEX_FILE]) {
					LIST_REPORT_DATA($tt.' / '.$row[TSV_CLASS_INDEX_NAME], $cf.'/'.$row[TSV_CLASS_INDEX_FILE], $kwv, $ftv);
				} else {
					$tt = $FILE_INFORMATION[$i][TSV_CLASS_INDEX_NAME];
				}
				++$i;
			}
		}
	} else {
		if (isset($CLASS_INFORMATION)) {
			$h = $SECTION_TITLE;
			if (!empty($yrv) && !empty($mnv)) {
				$h .= ' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			}
			PAGE_ADD('<h1>'.$h.'</h1><table cellspacing="0" class="list">');
			$row = &$CLASS_INFORMATION[0];
			$h = '<th>'.$row[TSV_CLASS_ID].'</th>';
			$h .= '<th>'.$row[TSV_CLASS_TIME].'</th>';
			$h .= '<th>'.$row[TSV_CLASS_NAME].'</th>';
			$h .= '<th>'.$row[TSV_CLASS_STAFF].'</th>';
			PAGE_ADD('<tr>'.$h.'<th class="cl">動作</th></tr>');
			
			$c = count($CLASS_INFORMATION);
			if ($c > 1) {
				$i = 1;
				$r = 1;
				if (empty($yrv) || empty($mnv)) {
					while ($i < $c) {
						$row = &$CLASS_INFORMATION[$i];
						$h = '<td>'.$row[TSV_CLASS_ID].'</td>';
						$h .= '<td>'.$row[TSV_CLASS_TIME].'</td>';
						$h .= '<td>'.$row[TSV_CLASS_NAME].'</td>';
						$h .= '<td>'.$row[TSV_CLASS_STAFF].'</td>';
						PAGE_ADD('<tr class="r'.($r & 1).'">'.$h.'<td><a href="'.$THIS_WEB_URL.'&amp;'.CLASS_ID_NAME.'='.$row[TSV_CLASS_ID].'">檢視</a></td></tr>');
						++$r;
						++$i;
						if ($i >= 100) break;
					}
				} else {
					$ym = $yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).'-';
					$is_find = false;
					while ($i < $c) {
						$row = &$CLASS_INFORMATION[$i];
						$p = strpos($row[TSV_CLASS_TIME], $ym);
						if ($p !== false) {
							$is_find = true;
							$h = '<td>'.$row[TSV_CLASS_ID].'</td>';
							$h .= '<td>'.$row[TSV_CLASS_TIME].'</td>';
							$h .= '<td>'.$row[TSV_CLASS_NAME].'</td>';
							$h .= '<td>'.$row[TSV_CLASS_STAFF].'</td>';
							PAGE_ADD('<tr class="r'.($r & 1).'">'.$h.'<td><a href="'.$THIS_WEB_URL.'&amp;'.CLASS_ID_NAME.'='.$row[TSV_CLASS_ID].'&amp;'.YEAR_NAME.'='.$yrv.'&amp;'.MONTH_NAME.'='.$mnv.'">檢視</a></td></tr>');
							++$r;
						} else {
							if ($is_find) break;
						}
						++$i;
					} 
				}
			}
			PAGE_ADD('</table>');
		}
	}
	SIDE_NAV_CLOSE();
}

?>