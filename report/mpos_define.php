<?php

define('ERROR_LOAD_STORES_INFORMATION'		,0);
define('ERROR_SERVICE_NO_RESPOND'		,1);
define('ERROR_API_ARGUMENTS'			,2);
define('ERROR_SERVICE_IS_FULL'			,3);
define('ERROR_NO_RING'				,4);
define('ERROR_UNKNOW'				,5);
define('ERROR_LOAD_INDEX_INFORMATION'		,6);
define('ERROR_LOAD_SECTION_INFORMATION'		,7);
define('ERROR_ACCESS_KEY'			,8);

define('FOLDER_DB_RING'				,'/db/ring');
define('FOLDER_DB_TSV'				,'/db/tsv');
define('FOLDER_DB_CLASS'			,'/db/class');
define('FOLDER_DB_STAFF'			,'/db/staff');
define('FOLDER_DB_APPLY'			,'/db/apply');
define('FOLDER_DB_SALES'			,'/db/sales');
define('FOLDER_DB_STATISTICS'			,'/db/statistics');
define('FOLDER_DB_SUPPLIER'			,'/db/supplier');
define('FOLDER_DB_AGE'				,'/db/age');
define('FOLDER_DB_REVENUE'			,'/db/revenue');
define('FOLDER_DB_MEAL'				,'/db/meal');
define('FOLDER_DB_TIMER'			,'/db/timer');
define('FOLDER_DB_BOOKING'			,'/db/booking');
define('FOLDER_DB_GUESTBOOK'			,'/db/guestbook');
define('FOLDER_LOG_BASE'			,'/log');

define('FILE_TSV_EXT_NAME'			,'.tsv');

define('QUERY_TYPE_STAFF'			,'staff');
define('QUERY_TYPE_INGREDIENT'			,'ingredient');
define('QUERY_TYPE_INGREDIENT_TYPE'		,'ingredient_type');
define('QUERY_TYPE_INGREDIENT_SUPPLIER'		,'ingredient_supplier');
define('QUERY_TYPE_GOODS'			,'goods');
define('QUERY_TYPE_GOODS_CATEGORY'		,'goods_category');
define('QUERY_TYPE_GOODS_SUPPLIER'		,'goods_supplier');
define('QUERY_TYPE_FLAVOR'			,'flavor');
define('QUERY_TYPE_FLAVOR_GROUP'		,'flavor_group');
define('QUERY_TYPE_AGE'				,'age');
define('QUERY_TYPE_AGE_GROUP'			,'age_group');
define('QUERY_TYPE_MEAL'			,'meal');
define('QUERY_TYPE_MEAL_CLASS'			,'class');
define('QUERY_TYPE_REVENUE'			,'revenue');
define('QUERY_TYPE_REVENUE_CLASS'		,'class');
define('QUERY_TYPE_TIMER_CLASS'			,'class');
define('QUERY_TYPE_GUESTBOOK'			,'guestbook');

define('LOGON_TYPE_REPORT'			,0x00007776);

define('WEB_API_ERROR'				,'ERROR');
define('WEB_API_SUCCESS'			,'SUCCESS');
define('WEB_API_LOGON'				,'LOGON');
define('WEB_API_LOGOFF'				,'LOGOFF');
define('WEB_API_CHECK_KEY'			,'CHECK_KEY');
define('WEB_API_QUERY_BASE'			,'QUERY_BASE');
define('WEB_API_QUERY_NOW'			,'QUERY_NOW');
define('WEB_API_QUERY_LOG'			,'QUERY_LOG');
define('WEB_API_QUERY_REPORT'			,'QUERY_REPORT');
define('WEB_API_QUERY_TOOL'			,'QUERY_TOOL');
define('WEB_API_DUMP_REPORT_INDEX'		,'DUMP_REPORT_INDEX');
define('WEB_API_DUMP_REPORT_ITEM'		,'DUMP_REPORT_ITEM');
define('WEB_API_DUMP_REPORT_GROUP'		,'DUMP_REPORT_GROUP');

define('WEB_ERROR_SUCCESS'			,'0');
define('WEB_ERROR_ARGUMENTS'			,'1');
define('WEB_ERROR_FULL'				,'2');
define('WEB_ERROR_NO_RING'			,'3');
define('WEB_ERROR_UNKNOW'			,'4');
define('WEB_ERROR_KEY'				,'5');

define('ROW_STORES_COLUMNS'			,0);
define('ROW_STORES_BRANCH'			,1);
define('ROW_STORES_NAME'			,2);
define('ROW_STORES_ID'				,3);
define('ROW_STORES_LEADER'			,4);
define('ROW_STORES_TELEPHONE'			,5);
define('ROW_STORES_FAX'				,6);
define('ROW_STORES_EMAIL'			,7);
define('ROW_STORES_ADDRESS'			,8);

define('TSV_COMMON_ID'				,0);
define('TSV_COMMON_NAME'			,1);

define('TSV_TAB_ID'				,0);
define('TSV_TAB_NAME'				,1);
define('TSV_TAB_FILE'				,2);

define('TSV_SECTION_ID'				,0);
define('TSV_SECTION_NAME'			,1);

define('TSV_CLASS_ID'				,0);
define('TSV_CLASS_FOLDER'			,1);
define('TSV_CLASS_TIME'				,2);
define('TSV_CLASS_NAME'				,3);
define('TSV_CLASS_STAFF'			,4);

define('TSV_CLASS_INDEX_FILE'			,0);
define('TSV_CLASS_INDEX_NAME'			,1);

define('TSV_GUESTBOOK_DATE'			,0);
define('TSV_GUESTBOOK_TIME'			,1);
define('TSV_GUESTBOOK_WEEKDAY'			,2);
define('TSV_GUESTBOOK_CLASS'			,3);
define('TSV_GUESTBOOK_TABLE'			,4);
define('TSV_GUESTBOOK_POSTER'			,5);
define('TSV_GUESTBOOK_EMAIL'			,6);
define('TSV_GUESTBOOK_MESSAGE'			,7);

define('ABOUT_STORES'				,'1');
define('ABOUT_ORDER_NOTICE'			,'103');
define('ABOUT_CLASS_MEMO'			,'109');

?>