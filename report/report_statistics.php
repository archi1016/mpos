<?php

if (!isset($STORES_INFORMATION)) exit();

$DB_FOLDER = MOPO_SERVER_FOLDER.FOLDER_DB_STATISTICS;
$DB_FILE_INDEX_GOODS = $DB_FOLDER.'/index_'.QUERY_TYPE_GOODS.FILE_TSV_EXT_NAME;
$DB_FILE_INDEX_GOODS_CATEGORY = $DB_FOLDER.'/index_'.QUERY_TYPE_GOODS_CATEGORY.FILE_TSV_EXT_NAME;
$DB_FILE_INDEX_INGREDIENT = $DB_FOLDER.'/index_'.QUERY_TYPE_INGREDIENT.FILE_TSV_EXT_NAME;
$DB_FILE_INDEX_INGREDIENT_TYPE = $DB_FOLDER.'/index_'.QUERY_TYPE_INGREDIENT_TYPE.FILE_TSV_EXT_NAME;

$yrv = RETURN_INT_GET(YEAR_NAME);
$mnv = RETURN_INT_GET(MONTH_NAME);
$qtv = RETURN_STR_GET(QUERY_TYPE_NAME);
$qiv = RETURN_STR_GET(QUERY_ID_NAME);

switch ($qtv) {
	case QUERY_TYPE_GOODS:
		$CURRENT_GOODS_INDEX = RETURN_FIND_ROW_INDEX($DB_FILE_INDEX_GOODS, $qiv, $GOODS_INFORMATION, TSV_COMMON_ID, $GOODS_INFORMATION_ROWS);
		if (-1 != $CURRENT_GOODS_INDEX) {
			$current_row = $GOODS_INFORMATION[$CURRENT_GOODS_INDEX];
			$page_title = RETURN_ITEM_GROUP_NAME($CURRENT_GOODS_INDEX, $GOODS_INFORMATION).' / '.$current_row[TSV_COMMON_ID].': '.$current_row[TSV_COMMON_NAME].' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			$a[0] = WEB_API_DUMP_REPORT_ITEM;
			$a[1] = $ACCESS_KEY;
			$a[2] = $SECTION_ID;
			$a[3] = $yrv;
			$a[4] = $mnv;
			$a[5] = $qtv;
			$a[6] = $qiv;
			UDP_SEND_AND_RECV($a, $ret);
		}
		break;
		
	case QUERY_TYPE_GOODS_CATEGORY:
		$CURRENT_GOODS_CATEGORY_INDEX = RETURN_FIND_ROW_INDEX($DB_FILE_INDEX_GOODS_CATEGORY, $qiv, $GOODS_CATEGORY_INFORMATION, TSV_COMMON_ID, $GOODS_CATEGORY_INFORMATION_ROWS);
		if (-1 != $CURRENT_GOODS_CATEGORY_INDEX) {
			$current_row = $GOODS_CATEGORY_INFORMATION[$CURRENT_GOODS_CATEGORY_INDEX];
			$page_title = RETURN_ITEM_GROUP_NAME($CURRENT_GOODS_CATEGORY_INDEX, $GOODS_CATEGORY_INFORMATION).' / '.$current_row[TSV_COMMON_NAME].' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			$a[0] = WEB_API_DUMP_REPORT_GROUP;
			$a[1] = $ACCESS_KEY;
			$a[2] = $SECTION_ID;
			$a[3] = $yrv;
			$a[4] = $mnv;
			$a[5] = $qtv;
			$a[6] = str_replace('.', "\t", $qiv);
			UDP_SEND_AND_RECV($a, $ret);
		}
		break;
		
	case QUERY_TYPE_INGREDIENT:
		$CURRENT_INGREDIENT_INDEX = RETURN_FIND_ROW_INDEX($DB_FILE_INDEX_INGREDIENT, $qiv, $INGREDIENT_INFORMATION, TSV_COMMON_ID, $INGREDIENT_INFORMATION_ROWS);
		if (-1 != $CURRENT_INGREDIENT_INDEX) {
			$current_row = $INGREDIENT_INFORMATION[$CURRENT_INGREDIENT_INDEX];
			$page_title = RETURN_ITEM_GROUP_NAME($CURRENT_INGREDIENT_INDEX, $INGREDIENT_INFORMATION).' / '.$current_row[TSV_COMMON_ID].': '.$current_row[TSV_COMMON_NAME].' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			$a[0] = WEB_API_DUMP_REPORT_ITEM;
			$a[1] = $ACCESS_KEY;
			$a[2] = $SECTION_ID;
			$a[3] = $yrv;
			$a[4] = $mnv;
			$a[5] = $qtv;
			$a[6] = $qiv;
			UDP_SEND_AND_RECV($a, $ret);
		}
		break;
		
	case QUERY_TYPE_INGREDIENT_TYPE:
		$CURRENT_INGREDIENT_TYPE_INDEX = RETURN_FIND_ROW_INDEX($DB_FILE_INDEX_INGREDIENT_TYPE, $qiv, $INGREDIENT_TYPE_INFORMATION, TSV_COMMON_ID, $INGREDIENT_TYPE_INFORMATION_ROWS);
		if (-1 != $CURRENT_INGREDIENT_TYPE_INDEX) {
			$current_row = $INGREDIENT_TYPE_INFORMATION[$CURRENT_INGREDIENT_TYPE_INDEX];
			$page_title = RETURN_ITEM_GROUP_NAME($CURRENT_INGREDIENT_TYPE_INDEX, $INGREDIENT_TYPE_INFORMATION).' / '.$current_row[TSV_COMMON_NAME].' ('.$yrv.'-'.RETURN_CONV_INT_TO_NUM_2X($mnv).')';
			$a[0] = WEB_API_DUMP_REPORT_GROUP;
			$a[1] = $ACCESS_KEY;
			$a[2] = $SECTION_ID;
			$a[3] = $yrv;
			$a[4] = $mnv;
			$a[5] = $qtv;
			$a[6] = str_replace('.', "\t", $qiv);
			UDP_SEND_AND_RECV($a, $ret);
		}
		break;	
}


PAGE_INIT($page_title);

HEADER_TAB_INIT($gpi);
$gpi_count = count($gpi);

if ('' != $page_title) {
	$h = RETURN_QUERY_FORM_HEADER('查詢');
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_ID_NAME, $qiv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(KEYWORD_NAME, $kwv);
	$h .= RETURN_HIDDEN_INPUT_ELEMENT(FILTER_TYPE_NAME, $ftv);
	$h .= RETURN_YEAR_OPTIONS($yrv);
	$h .= RETURN_MONTH_OPTIONS($mnv);
	$h .= RETURN_QUERY_FORM_FOOTER();
	$gpi[$gpi_count][GROUP_PANEL_NAME] = '月份';
	$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
	++$gpi_count;

	$more_args = RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
	$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_ID_NAME, $qiv);
	$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
	$more_args .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
	
	switch ($qtv) {
		case QUERY_TYPE_GOODS:
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '商品依品項';
			$h = RETURN_QUERY_FORM_HEADER('查詢');
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
			$h .= RETURN_ITEM_OPTIONS($DB_FILE_INDEX_GOODS, $qiv);
			$h .= RETURN_QUERY_FORM_FOOTER();
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
			++$gpi_count;
			break;
			
		case QUERY_TYPE_GOODS_CATEGORY:
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '商品依欄位';
			$h = RETURN_QUERY_FORM_HEADER('查詢');
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(KEYWORD_NAME, $kwv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(FILTER_TYPE_NAME, $ftv);
			$h .= RETURN_ITEM_OPTIONS($DB_FILE_INDEX_GOODS_CATEGORY, $qiv);
			$h .= RETURN_QUERY_FORM_FOOTER();
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
			++$gpi_count;
			
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '過濾';
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = RETURN_FILTER_GROUP_MODULE($kwv, $ftv, $more_args);
			++$gpi_count;
			break;
				
		case QUERY_TYPE_INGREDIENT:
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '原物料依品項';
			$h = RETURN_QUERY_FORM_HEADER('查詢');
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
			$h .= RETURN_ITEM_OPTIONS($DB_FILE_INDEX_INGREDIENT, $qiv);
			$h .= RETURN_QUERY_FORM_FOOTER();
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
			++$gpi_count;
			break;
			
		case QUERY_TYPE_INGREDIENT_TYPE:
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '原物料依欄位';
			$h = RETURN_QUERY_FORM_HEADER('查詢');
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, $qtv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(YEAR_NAME, $yrv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(MONTH_NAME, $mnv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(KEYWORD_NAME, $kwv);
			$h .= RETURN_HIDDEN_INPUT_ELEMENT(FILTER_TYPE_NAME, $ftv);
			$h .= RETURN_ITEM_OPTIONS($DB_FILE_INDEX_INGREDIENT_TYPE, $qiv);
			$h .= RETURN_QUERY_FORM_FOOTER();
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = $h;
			++$gpi_count;
			
			$gpi[$gpi_count][GROUP_PANEL_NAME] = '過濾';
			$gpi[$gpi_count][GROUP_PANEL_BUTTONS] = RETURN_FILTER_GROUP_MODULE($kwv, $ftv, $more_args);
			++$gpi_count;
			break;
	}
}

HEADER_TAB_CLOSE($gpi);
if (SIDE_NAV_INIT('')) {
	if ('' != $page_title) {	
		$TF = $DB_FOLDER.'/'.$yrv.'/'.RETURN_CONV_INT_TO_NUM_2X($mnv).'/'.$qtv.'.'.LIST_TYPE_KEY_NAME.'.'.$qiv.FILE_TSV_EXT_NAME;
		$TF_DAY = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_DAY, $TF);
		$TF_WEEK = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_WEEK, $TF);
		$TF_HOUR = str_replace(LIST_TYPE_KEY_NAME, LIST_TYPE_HOUR, $TF);
		PAGE_ADD('<h1>'.$page_title.'</h1>');
		LIST_REPORT_DATA('依日期', $TF_DAY, $kwv, $ftv);
		LIST_REPORT_DATA('依星期', $TF_WEEK, $kwv, $ftv);
		LIST_REPORT_DATA('依小時', $TF_HOUR, $kwv, $ftv);
	} else {
		$a[0] = WEB_API_DUMP_REPORT_INDEX;
		$a[1] = $ACCESS_KEY;
		$a[2] = $SECTION_ID;
		UDP_SEND_AND_RECV($a, $ret);
		
		PAGE_ADD('<h1>'.$SECTION_TITLE.'</h1>');
			
		PAGE_ADD('<h2>商品依品項</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_GOODS));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '項目';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_ITEM_OPTIONS($DB_FILE_INDEX_GOODS);
			++$qpi_count;		
			REPORT_QUERY_CLOSE($qpi);
		
		PAGE_ADD('<h2>商品依欄位</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_GOODS_CATEGORY));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '項目';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_ITEM_OPTIONS($DB_FILE_INDEX_GOODS_CATEGORY);
			++$qpi_count;
			REPORT_QUERY_CLOSE($qpi);
			
		PAGE_ADD('<h2>原物料依品項</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_INGREDIENT));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '項目';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_ITEM_OPTIONS($DB_FILE_INDEX_INGREDIENT);
			++$qpi_count;		
			REPORT_QUERY_CLOSE($qpi);
		
		PAGE_ADD('<h2>原物料依欄位</h2>');
			REPORT_QUERY_INIT(RETURN_HIDDEN_INPUT_ELEMENT(QUERY_TYPE_NAME, QUERY_TYPE_INGREDIENT_TYPE));
			$qpi_count = 0;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '年';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_YEAR_OPTIONS($yrv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '月';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_MONTH_OPTIONS($mnv);
			++$qpi_count;
			$qpi[$qpi_count][QUERY_PANEL_NAME] = '項目';
			$qpi[$qpi_count][QUERY_PANEL_BUTTONS] = RETURN_REPORT_ITEM_OPTIONS($DB_FILE_INDEX_INGREDIENT_TYPE);
			++$qpi_count;
			REPORT_QUERY_CLOSE($qpi);
	}
	SIDE_NAV_CLOSE();
}

?>